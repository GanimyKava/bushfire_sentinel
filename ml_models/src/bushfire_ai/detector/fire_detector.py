"""Fire/bushfire detection model abstraction."""

from __future__ import annotations

from pathlib import Path
from typing import Iterable, List, Optional, Sequence

import numpy as np
from loguru import logger

try:
    from ultralytics import YOLO  # type: ignore
except ImportError as exc:  # pragma: no cover - handled at runtime
    raise RuntimeError(
        "Ultralytics is required for FireDetectionModel. Install with `pip install ultralytics`."
    ) from exc


class DetectionResult:
    """Container representing a detection event."""

    def __init__(
        self,
        boxes: np.ndarray,
        confidences: np.ndarray,
        class_ids: np.ndarray,
        labels: List[str],
    ) -> None:
        self.boxes = boxes
        self.confidences = confidences
        self.class_ids = class_ids
        self.labels = labels

    def has_fire(self, threshold: float) -> bool:
        return bool((self.confidences >= threshold).any())

    def highest_confidence(self) -> float:
        if self.confidences.size == 0:
            return 0.0
        return float(self.confidences.max())


class FireDetectionModel:
    """Ultralytics YOLO wrapper for fire detection."""

    def __init__(
        self,
        weights_path: Path,
        confidence_threshold: float,
        iou_threshold: float,
        max_detections: int,
        device: Optional[str] = None,
        target_classes: Optional[Sequence[str]] = None,
    ) -> None:
        self.weights_path = weights_path
        self.confidence_threshold = confidence_threshold
        self.iou_threshold = iou_threshold
        self.max_detections = max_detections
        self.device = device
        self.target_classes = {cls.lower() for cls in target_classes} if target_classes else None

        if not self.weights_path.exists():
            raise FileNotFoundError(f"Model weights not found at {self.weights_path}")

        logger.info("Loading detection model from {}", self.weights_path)
        self.model = YOLO(str(self.weights_path))

    def predict(self, frame: np.ndarray) -> DetectionResult:
        """Run inference on a single frame."""

        results = self.model.predict(
            source=frame,
            conf=self.confidence_threshold,
            iou=self.iou_threshold,
            max_det=self.max_detections,
            device=self.device,
            verbose=False,
        )

        boxes: List[List[float]] = []
        confidences: List[float] = []
        class_ids: List[int] = []
        labels: List[str] = []

        for result in results:
            if not hasattr(result, "boxes") or result.boxes is None:
                continue
            for box in result.boxes:
                boxes.append(box.xyxy[0].tolist())
                confidences.append(float(box.conf))
                class_id = int(box.cls)
                class_ids.append(class_id)
                label = self.model.names.get(class_id, f"class_{class_id}")
                if self.target_classes and label.lower() not in self.target_classes:
                    # discard detection not in target list
                    boxes.pop()
                    confidences.pop()
                    class_ids.pop()
                    continue
                labels.append(label)

        return DetectionResult(
            boxes=np.array(boxes, dtype=np.float32) if boxes else np.empty((0, 4), dtype=np.float32),
            confidences=np.array(confidences, dtype=np.float32) if confidences else np.empty(0),
            class_ids=np.array(class_ids, dtype=np.int32) if class_ids else np.empty(0, dtype=np.int32),
            labels=labels,
        )

    @staticmethod
    def draw_detections(frame: np.ndarray, detections: DetectionResult) -> np.ndarray:
        """Annotate frame with detection bounding boxes and labels."""

        import cv2  # lazy import to avoid global dependency in headless tests

        annotated = frame.copy()
        for box, conf, label in zip(detections.boxes, detections.confidences, detections.labels):
            x1, y1, x2, y2 = map(int, box)
            cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 0, 255), 2)
            cv2.putText(
                annotated,
                f"{label}: {conf:.2f}",
                (x1, max(y1 - 5, 0)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 0, 255),
                1,
                cv2.LINE_AA,
            )
        return annotated

