"""CAMARA API client for location retrieval and incident reporting."""

from __future__ import annotations

import asyncio
import json
from pathlib import Path
from typing import Any, Dict, Optional

import httpx
from loguru import logger

from bushfire_ai.config.settings import CamaraConfig


MOCK_LOCATION = {
    "latitude": -33.708,
    "longitude": 150.311,
    "uncertainty": 25.0,
    "timestamp": "2025-01-01T00:00:00Z",
    "region": "Blue Mountains, NSW",
    "note": "Mocked high-risk bushfire area",
}

MOCK_QOD = {
    "requestId": "mock-qod-001",
    "status": "accepted",
    "priority": "high",
    "validUntil": "2025-01-01T00:30:00Z",
    "bandwidthMbps": 25,
    "latencyMs": 40,
    "note": "Mock QoD response simulating CAMARA API",
}

MOCK_UPLOAD = {
    "incidentId": "mock-incident-001",
    "status": "received",
    "receivedAt": "2025-01-01T00:05:00Z",
    "message": "Incident accepted for processing",
    "links": {
        "self": "https://mock.camara.api/incidents/mock-incident-001",
        "evidence": "https://mock.camara.api/incidents/mock-incident-001/artifacts",
    },
}


class CamaraClient:
    def __init__(self, config: CamaraConfig) -> None:
        self.config = config
        self._token: Optional[str] = None
        self._client = httpx.AsyncClient(timeout=self.config.timeout_seconds)

    async def close(self) -> None:
        await self._client.aclose()

    async def _get_token(self) -> str:
        if self._token:
            return self._token

        data = {
            "grant_type": "client_credentials",
            "client_id": self.config.client_id,
            "client_secret": self.config.client_secret,
            "scope": self.config.scope,
        }

        response = await self._client.post(str(self.config.token_url), data=data)
        response.raise_for_status()
        payload = response.json()
        self._token = payload["access_token"]
        return self._token

    async def get_location(self, device_id: str) -> Dict[str, Any]:
        token = await self._get_token()
        endpoint = f"{self.config.base_url}{self.config.location_endpoint}"
        headers = {"Authorization": f"Bearer {token}"}
        response = await self._client.get(endpoint, params={"deviceId": device_id}, headers=headers)
        response.raise_for_status()
        return response.json()

    async def request_quality_on_demand(self, device_id: str) -> Optional[Dict[str, Any]]:
        if not self.config.qod_url:
            return None
        token = await self._get_token()
        payload = {"deviceId": device_id, "priority": "high"}
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        response = await self._client.post(str(self.config.qod_url), json=payload, headers=headers)
        response.raise_for_status()
        return response.json()

    async def upload_incident(
        self,
        metadata: Dict[str, Any],
        image_path: Path,
        clip_path: Optional[Path] = None,
    ) -> Dict[str, Any]:
        token = await self._get_token()
        headers = {"Authorization": f"Bearer {token}"}

        files = {
            "metadata": (None, json.dumps(metadata), "application/json"),
            "frame": (image_path.name, image_path.read_bytes(), "image/jpeg"),
        }
        if clip_path and clip_path.exists():
            files["clip"] = (clip_path.name, clip_path.read_bytes(), "video/mp4")

        response = await self._client.post(str(self.config.upload_url), files=files, headers=headers)
        response.raise_for_status()
        return response.json()


class CamaraClientSyncAdapter:
    """Synchronous adapter for environments without async orchestration."""

    def __init__(self, client: CamaraClient) -> None:
        self.client = client

    def get_location(self, device_id: str) -> Dict[str, Any]:
        # return asyncio.run(self.client.get_location(device_id))
        
        # Offline stub: return mock coordinates for a bushfire-prone area in Australia.
        return dict(MOCK_LOCATION)

    def request_quality_on_demand(self, device_id: str) -> Optional[Dict[str, Any]]:
        # return asyncio.run(self.client.request_quality_on_demand(device_id))

        # Offline stub: return a mock QoD response as if from CAMARA API.
        return dict(MOCK_QOD)

    def upload_incident(
        self,
        metadata: Dict[str, Any],
        image_path: Path,
        clip_path: Optional[Path] = None,
    ) -> Dict[str, Any]:
        # return asyncio.run(self.client.upload_incident(metadata, image_path, clip_path))

        # Offline stub: return a mock upload response as if from CAMARA API.
        return dict(MOCK_UPLOAD)

