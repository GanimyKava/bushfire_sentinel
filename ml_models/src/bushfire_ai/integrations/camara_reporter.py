"""Incident reporting workflow for CAMARA integration."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, Optional

from loguru import logger

from bushfire_ai.config.settings import Settings
from bushfire_ai.integrations.camara_client import CamaraClient, CamaraClientSyncAdapter


@dataclass
class IncidentPayload:
    metadata: Dict[str, Any]
    frame_path: Path
    clip_path: Optional[Path]


class IncidentReporter:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.client = CamaraClient(settings.camara)
        self.adapter = CamaraClientSyncAdapter(self.client)

    def build_metadata(
        self,
        confidence: float,
        detection_labels: list[str],
        location_payload: Optional[Dict[str, Any]],
        qod_payload: Optional[Dict[str, Any]],
    ) -> Dict[str, Any]:
        metadata: Dict[str, Any] = {
            "eventType": "fire_detection",
            "confidence": confidence,
            "classes": detection_labels,
        }
        if location_payload:
            metadata["location"] = location_payload
        if qod_payload:
            metadata["quality"] = qod_payload
        return metadata

    def report_incident(
        self,
        confidence: float,
        detection_labels: list[str],
        frame_path: Path,
        clip_path: Optional[Path],
    ) -> Optional[Dict[str, Any]]:
        device_id = self.settings.device_id
        location_payload: Optional[Dict[str, Any]] = None
        qod_payload: Optional[Dict[str, Any]] = None

        if device_id:
            try:
                location_payload = self.adapter.get_location(device_id)
                logger.info("Retrieved location from CAMARA for device {}", device_id)
            except Exception:
                logger.exception("Failed to retrieve location data from CAMARA")

            try:
                qod_payload = self.adapter.request_quality_on_demand(device_id)
                if qod_payload:
                    logger.info("Requested Quality-on-Demand for critical event")
            except Exception:
                logger.exception("Failed to request QoD from CAMARA")

        metadata = self.build_metadata(confidence, detection_labels, location_payload, qod_payload)

        try:
            logger.debug(f"Reporting incident to CAMARA with metadata: {metadata}, frame_path: {frame_path}, clip_path: {clip_path}")
            response = self.adapter.upload_incident(metadata, frame_path, clip_path)
            logger.info("Incident reported to CAMARA: {}", response)
            return response
        except Exception:
            logger.exception("Failed to upload incident to CAMARA")
            return None

