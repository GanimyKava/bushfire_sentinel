"""CLI entrypoint for the bushfire detection pipeline."""

from __future__ import annotations

import argparse

from pathlib import Path

from bushfire_ai.config.settings import Settings
from bushfire_ai.pipeline.orchestrator import PipelineOrchestrator
from bushfire_ai.utils.logging import configure_logging


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Bushfire detection pipeline")
    parser.add_argument("--source", help="Video source (camera index, file path, or RTSP URL)")
    parser.add_argument("--weights", help="Path to model weights", default=None)
    parser.add_argument("--device", help="Torch device (cpu, cuda:0, etc.)", default=None)
    parser.add_argument("--env", help="Path to environment file", default=None)
    parser.add_argument("--run-seconds", type=float, help="Optional runtime limit in seconds")
    parser.add_argument("--log-level", default="INFO", help="Log level")
    parser.add_argument("--json-logs", action="store_true", help="Emit logs in JSON format")
    parser.add_argument(
        "--skip-frames-after-detection",
        type=int,
        default=None,
        help="Override number of frames to skip after a detection event.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    configure_logging(args.log_level, args.json_logs)

    settings = Settings.from_env(args.env)
    if args.source:
        settings.video.source = args.source
    if args.weights:
        settings.detection.weights_path = Path(args.weights)
    if args.skip_frames_after_detection is not None:
        settings.events.skip_frames_after_detection = args.skip_frames_after_detection

    orchestrator = PipelineOrchestrator(settings, device=args.device)
    orchestrator.run(run_seconds=args.run_seconds)


if __name__ == "__main__":
    main()

