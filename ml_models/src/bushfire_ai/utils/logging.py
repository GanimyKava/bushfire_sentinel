"""Logging utilities for the bushfire AI application."""

from __future__ import annotations

import sys
from typing import Optional

from loguru import logger


def configure_logging(level: str = "INFO", json_output: bool = False) -> None:
    """Configure Loguru logging.

    Args:
        level: Log level string.
        json_output: Whether to emit logs in JSON format.
    """

    logger.remove()
    if json_output:
        logger.add(sys.stdout, level=level.upper(), serialize=True)
    else:
        logger.add(
            sys.stdout,
            level=level.upper(),
            colorize=True,
            format="<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level}</level> | "
            "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
        )


def get_logger(name: Optional[str] = None):
    """Return a contextualized logger instance."""

    if name:
        return logger.bind(module=name)
    return logger

