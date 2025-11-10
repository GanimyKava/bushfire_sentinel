"""Utility script for fine-tuning a YOLOv8 model on fire/bushfire datasets."""

from __future__ import annotations

import argparse
from pathlib import Path

from loguru import logger

try:
    from ultralytics import YOLO
except ImportError as exc:  # pragma: no cover
    raise SystemExit("Ultralytics is required. Install with `pip install ultralytics`." ) from exc


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fine-tune YOLOv8 for fire/bushfire detection")
    parser.add_argument("--data", default="configs/fire_smoke.yaml", help="Path to YOLO dataset YAML")
    parser.add_argument("--model", default="yolov8n.pt", help="Base model checkpoint to fine-tune")
    parser.add_argument("--epochs", type=int, default=100, help="Number of training epochs")
    parser.add_argument("--imgsz", type=int, default=640, help="Training image size")
    parser.add_argument("--project", default="runs/fire_train", help="Ultralytics project directory")
    parser.add_argument("--name", default="yolov8n-fire", help="Run name")
    parser.add_argument("--device", default="", help="Device spec (e.g., 'cuda:0', 'cpu')")
    parser.add_argument("--batch", type=int, default=16, help="Batch size")
    parser.add_argument("--freeze", type=int, default=0, help="Number of backbone layers to freeze")
    parser.add_argument("--patience", type=int, default=20, help="Early stopping patience")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    data_yaml = Path(args.data)
    if not data_yaml.exists():
        raise SystemExit(f"Dataset config not found: {data_yaml}")

    logger.info("Loading base model {}", args.model)
    model = YOLO(args.model)

    logger.info("Starting training: data={}, epochs={}, imgsz={}, device={}", data_yaml, args.epochs, args.imgsz, args.device or "auto")
    model.train(
        data=str(data_yaml),
        epochs=args.epochs,
        imgsz=args.imgsz,
        project=args.project,
        name=args.name,
        device=args.device or None,
        batch=args.batch,
        freeze=args.freeze,
        patience=args.patience,
    )

    best_path = Path(args.project) / args.name / "weights" / "best.pt"
    if best_path.exists():
        logger.success("Training complete. Copy best weights to `models/fire_yolov8n.pt`:")
        logger.success("cp {} models/fire_yolov8n.pt", best_path)
    else:
        logger.warning("Training run completed but `best.pt` not found. Check Ultralytics logs.")


if __name__ == "__main__":
    main()

