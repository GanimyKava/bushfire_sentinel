"""Event buffering and artifact generation."""

from __future__ import annotations

import time
from collections import deque
from dataclasses import dataclass
from pathlib import Path
from typing import Deque, Optional

import cv2
from loguru import logger

from bushfire_ai.pipeline.video_source import Frame
from bushfire_ai.detector.fire_detector import DetectionResult


@dataclass
class EventArtifact:
    keyframe_path: Path
    clip_path: Optional[Path]
    confidence: float
    timestamp: float


class EventAccumulator:
    """Maintains a rolling frame buffer and materializes artifacts on demand."""

    def __init__(
        self,
        artifact_dir: Path,
        pre_event_seconds: float,
        post_event_seconds: float,
        clip_fps: float,
    ) -> None:
        self.artifact_dir = artifact_dir
        self.pre_event_seconds = pre_event_seconds
        self.post_event_seconds = post_event_seconds
        self.clip_fps = clip_fps
        self.buffer: Deque[Frame] = deque()
        self.max_buffer_seconds = pre_event_seconds + post_event_seconds

        self.artifact_dir.mkdir(parents=True, exist_ok=True)

    def add_frame(self, frame: Frame) -> None:
        self.buffer.append(frame)
        self._trim()

    def _trim(self) -> None:
        if len(self.buffer) < 2:
            return
        start_time = self.buffer[-1].timestamp - self.max_buffer_seconds
        while self.buffer and self.buffer[0].timestamp < start_time:
            self.buffer.popleft()

    def create_artifact(self, confidence: float, detections: DetectionResult) -> EventArtifact:
        timestamp = time.time()
        keyframe_path = self._write_keyframe(timestamp, detections)
        clip_path = self._write_clip(timestamp) if len(self.buffer) > 1 else None

        logger.info("Created artifact at {} with confidence {:.2f}", keyframe_path, confidence)
        return EventArtifact(
            keyframe_path=keyframe_path,
            clip_path=clip_path,
            confidence=confidence,
            timestamp=timestamp,
        )

    def _write_keyframe(self, timestamp: float, detections: DetectionResult) -> Path:
        frame = self.buffer[-1].data
        annotated = frame
        try:
            from bushfire_ai.detector.fire_detector import FireDetectionModel

            annotated = FireDetectionModel.draw_detections(frame, detections)
        except Exception:  # pragma: no cover - fallback if annotation fails
            logger.exception("Failed to annotate frame; storing raw frame")

        filename = self.artifact_dir / f"fire_{int(timestamp)}.jpg"
        cv2.imwrite(str(filename), annotated)
        return filename

    def _write_clip(self, timestamp: float) -> Path:
        frames = list(self.buffer)
        height, width = frames[0].data.shape[:2]
        clip_path = self.artifact_dir / f"fire_{int(timestamp)}.mp4"

        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        writer = cv2.VideoWriter(str(clip_path), fourcc, self.clip_fps, (width, height))

        for frame in frames:
            writer.write(frame.data)

        writer.release()
        return clip_path

