"""Video source abstraction for camera streams and files."""

from __future__ import annotations

import contextlib
from dataclasses import dataclass
from typing import Generator, Optional

import cv2
import numpy as np
from loguru import logger


@dataclass
class Frame:
    data: np.ndarray
    timestamp: float


class VideoSourceError(Exception):
    """Raised when the video source encounters an unrecoverable error."""


class VideoSource:
    def __init__(self, source: str, width: Optional[int] = None, height: Optional[int] = None) -> None:
        self.source = source
        self.width = width
        self.height = height
        self._capture: Optional[cv2.VideoCapture] = None

    def open(self) -> None:
        logger.info("Opening video source: {}", self.source)
        if self.source.isdigit():
            capture = cv2.VideoCapture(int(self.source))
        else:
            capture = cv2.VideoCapture(self.source)

        if not capture.isOpened():
            raise VideoSourceError(f"Unable to open video source: {self.source}")

        if self.width:
            capture.set(cv2.CAP_PROP_FRAME_WIDTH, self.width)
        if self.height:
            capture.set(cv2.CAP_PROP_FRAME_HEIGHT, self.height)

        self._capture = capture

    def close(self) -> None:
        if self._capture:
            logger.info("Closing video source")
            self._capture.release()
            self._capture = None

    def _frame_generator(self) -> Generator[Frame, None, None]:
        assert self._capture is not None
        while True:
            success, frame = self._capture.read()
            if not success:
                logger.warning("Failed to read frame; ending stream")
                break

            yield Frame(data=frame, timestamp=float(cv2.getTickCount() / cv2.getTickFrequency()))

    @contextlib.contextmanager
    def stream(self) -> Generator[Generator[Frame, None, None], None, None]:
        self.open()
        try:
            yield self._frame_generator()
        finally:
            self.close()

