"""Pipeline orchestrator tying together video ingestion, detection, and reporting."""

from __future__ import annotations

import time
from typing import Optional

import numpy as np
from loguru import logger

from bushfire_ai.config.settings import Settings
from bushfire_ai.detector.fire_detector import DetectionResult, FireDetectionModel
from bushfire_ai.integrations.camara_reporter import IncidentReporter
from bushfire_ai.pipeline.event_accumulator import EventAccumulator
from bushfire_ai.pipeline.video_source import Frame, VideoSource
from bushfire_ai.storage.local_store import LocalStorage


class PipelineOrchestrator:
    def __init__(self, settings: Settings, device: Optional[str] = None) -> None:
        self.settings = settings
        self.video_source = VideoSource(
            settings.video.source,
            width=settings.video.width,
            height=settings.video.height,
        )
        self.detector = FireDetectionModel(
            weights_path=settings.detection.weights_path,
            confidence_threshold=settings.detection.confidence_threshold,
            iou_threshold=settings.detection.iou_threshold,
            max_detections=settings.detection.max_detections,
            device=device,
            target_classes=settings.detection.target_classes,
        )
        self.event_accumulator = EventAccumulator(
            artifact_dir=settings.events.artifact_dir,
            pre_event_seconds=settings.events.pre_event_buffer_sec,
            post_event_seconds=settings.events.post_event_buffer_sec,
            clip_fps=settings.events.clip_frame_rate,
        )
        self.storage = LocalStorage(settings.events.artifact_dir)
        self.reporter = IncidentReporter(settings)
        self.skip_frames_remaining = 0
        self.detection_mode = settings.events.detection_mode
        self.store_artifacts = self.detection_mode == "store"
        self.view_detections = self.detection_mode == "view"
        self.skip_frame_budget = (
            settings.events.skip_frames_after_detection if self.store_artifacts else 0
        )

    def run(self, run_seconds: Optional[float] = None) -> None:
        start_time = time.time()
        try:
            with self.video_source.stream() as frame_stream:
                for frame in frame_stream:
                    if self.skip_frames_remaining > 0:
                        self.event_accumulator.add_frame(frame)
                        self.skip_frames_remaining -= 1
                        continue

                    detection, triggered = self._process_frame(frame)
                    if self.view_detections:
                        self._render_frame(frame, detection)

                    if triggered and self.skip_frame_budget > 0:
                        self.skip_frames_remaining = self.skip_frame_budget

                    if run_seconds and (time.time() - start_time) > run_seconds:
                        logger.info("Stopping pipeline after {} seconds", run_seconds)
                        break
        finally:
            if self.view_detections:
                try:
                    import cv2

                    cv2.destroyAllWindows()
                except Exception:  # pragma: no cover - display cleanup best effort
                    logger.exception("Failed to close display windows")

    def _process_frame(self, frame: Frame) -> tuple[DetectionResult, bool]:
        self.event_accumulator.add_frame(frame)
        detection = self._detect(frame.data)
        if detection.has_fire(self.settings.detection.confidence_threshold):
            logger.info("Fire detected with confidence {:.2f}", detection.highest_confidence())
            artifact = None

            if self.store_artifacts:
                artifact = self.event_accumulator.create_artifact(
                    confidence=detection.highest_confidence(),
                    detections=detection,
                )
                paths = [artifact.keyframe_path]
                if artifact.clip_path:
                    paths.append(artifact.clip_path)
                self.storage.save_paths(*paths)
                self.reporter.report_incident(
                    confidence=artifact.confidence,
                    detection_labels=detection.labels,
                    frame_path=artifact.keyframe_path,
                    clip_path=artifact.clip_path,
                )

            return detection, True

        return detection, False

    def _render_frame(self, frame: Frame, detection: DetectionResult) -> None:
        try:
            import cv2
        except ImportError:  # pragma: no cover - UI dependency optional
            logger.warning("OpenCV GUI components not available; cannot display detections")
            return

        annotated = FireDetectionModel.draw_detections(frame.data, detection)
        cv2.imshow("Bushfire Detection", annotated)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            logger.info("Display window closed by user input")
            cv2.destroyAllWindows()
            self.view_detections = False

    def _detect(self, frame: np.ndarray) -> DetectionResult:
        return self.detector.predict(frame)

