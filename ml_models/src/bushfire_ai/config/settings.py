"""Application settings and configuration management."""

from __future__ import annotations

from pathlib import Path
from typing import List, Optional, Literal

from dotenv import load_dotenv
from pydantic import BaseModel, ConfigDict, Field, HttpUrl, PositiveFloat, PositiveInt


DEFAULT_ENV_PATHS = (
    Path.cwd() / ".env",
    Path.cwd() / "env.local",
    Path.cwd() / "env.example",
)


def load_environment(env_path: Optional[Path] = None) -> None:
    """Load environment variables from the provided path or fallbacks."""

    if env_path:
        load_dotenv(env_path, override=False)
        return

    for candidate in DEFAULT_ENV_PATHS:
        if candidate.exists():
            load_dotenv(candidate, override=False)


class VideoSourceConfig(BaseModel):
    source: str = Field(
        "0",
        description="Video capture source. Accepts integer camera index, path, or RTSP URL.",
    )
    width: Optional[PositiveInt] = Field(None, description="Target frame width for resizing.")
    height: Optional[PositiveInt] = Field(None, description="Target frame height for resizing.")
    fps: Optional[PositiveFloat] = Field(None, description="Override capture fps if known.")


class DetectionConfig(BaseModel):
    weights_path: Path = Field(
        Path("models/fire_yolov8n.pt"),
        description="Path to YOLO weights trained for fire/smoke detection.",
    )
    confidence_threshold: float = Field(0.6, ge=0.0, le=1.0)
    iou_threshold: float = Field(0.5, ge=0.0, le=1.0)
    max_detections: PositiveInt = Field(20, description="Limit for detections per frame.")
    target_classes: List[str] = Field(default_factory=lambda: ["fire"], description="Detection class names to keep")


class EventConfig(BaseModel):
    pre_event_buffer_sec: PositiveFloat = Field(2.0, description="Seconds before trigger to retain frames.")
    post_event_buffer_sec: PositiveFloat = Field(2.0, description="Seconds after trigger to retain frames.")
    clip_frame_rate: PositiveFloat = Field(15.0, description="FPS for generated event clips.")
    artifact_dir: Path = Field(Path("artifacts"))
    skip_frames_after_detection: PositiveInt = Field(
        30,
        description="Number of frames to skip processing after a detection event is recorded.",
    )
    detection_mode: Literal["store", "view"] = Field(
        "store",
        description="Detection handling mode: 'store' persists artifacts, 'view' displays them only.",
    )


class CamaraConfig(BaseModel):
    base_url: HttpUrl
    location_endpoint: str = Field("/device-location/v1/location", description="Relative path for location retrieval")
    qod_url: Optional[HttpUrl] = None
    upload_url: HttpUrl
    client_id: str
    client_secret: str
    scope: str = Field(
        "location.read quality.request",
        description="OAuth scopes for CAMARA APIs.",
    )
    token_url: HttpUrl = Field("https://api.camara.org/oauth/token")
    timeout_seconds: PositiveFloat = Field(10.0)


class Settings(BaseModel):
    video: VideoSourceConfig = VideoSourceConfig()
    detection: DetectionConfig = DetectionConfig()
    events: EventConfig = EventConfig()
    camara: CamaraConfig
    device_id: Optional[str] = Field(
        None,
        description="Identifier used by CAMARA to resolve the drone's location (e.g., IMSI, MSISDN).",
    )

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @classmethod
    def from_env(cls, env_path: Optional[Path] = None) -> "Settings":
        load_environment(env_path)

        camara_config = CamaraConfig(
            base_url=_env_required("CAMARA_BASE_URL"),
            upload_url=_env_required("CAMARA_UPLOAD_URL"),
            client_id=_env_required("CAMARA_CLIENT_ID"),
            client_secret=_env_required("CAMARA_CLIENT_SECRET"),
            scope=_env_optional("CAMARA_SCOPE", "location.read quality.request"),
            qod_url=_env_optional("CAMARA_QOD_URL"),
        )

        detection = DetectionConfig(
            confidence_threshold=float(_env_optional("FIRE_CONFIDENCE_THRESHOLD", 0.6)),
            weights_path=Path(_env_optional("FIRE_WEIGHTS_PATH", "models/fire_yolov8n.pt")),
            target_classes=_parse_list(_env_optional("FIRE_TARGET_CLASSES")) or ["fire"],
        )

        events = EventConfig(
            artifact_dir=Path(_env_optional("OUTPUT_DIR", "artifacts")),
            skip_frames_after_detection=int(_env_optional("SKIP_FRAMES_AFTER_DETECTION", "30")),
            detection_mode=_env_optional("DETECTION_MODE", "store").lower(),
        )

        video = VideoSourceConfig(
            source=_env_optional("VIDEO_SOURCE", "0"),
        )

        device_id = _env_optional("DEVICE_ID")

        return cls(
            video=video,
            detection=detection,
            events=events,
            camara=camara_config,
            device_id=device_id,
        )


def _env_required(key: str) -> str:
    value = _env_optional(key)
    if not value:
        raise ValueError(f"Environment variable '{key}' is required")
    return value


def _env_optional(key: str, default: Optional[str] = None) -> Optional[str]:
    from os import getenv

    return getenv(key, default)


def _parse_list(value: Optional[str]) -> Optional[List[str]]:
    if value is None:
        return None
    items = [item.strip() for item in str(value).split(",") if item.strip()]
    return items or None

