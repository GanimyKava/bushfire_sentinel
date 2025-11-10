"""Local storage backend for artifacts."""

from __future__ import annotations

from pathlib import Path
from typing import Iterable

from loguru import logger


class LocalStorage:
    def __init__(self, base_dir: Path) -> None:
        self.base_dir = base_dir
        self.base_dir.mkdir(parents=True, exist_ok=True)

    def save_paths(self, *paths: Path) -> None:
        for path in paths:
            logger.info("Stored artifact: {} ({} bytes)", path, path.stat().st_size)

    def cleanup_old(self, max_items: int = 1000) -> None:
        files = sorted(self.base_dir.glob("*"), key=lambda p: p.stat().st_mtime, reverse=True)
        for stale in files[max_items:]:
            logger.info("Removing stale artifact {}", stale)
            stale.unlink(missing_ok=True)

