## Fine-Tuning YOLOv8 for Fire / Bushfire Detection

### Training Architecture

```
┌────────────┐   images/labels    ┌──────────────┐    weights    ┌──────────────┐
│ Dataset    │ ─────────────────▶ │ train_fire_  │ ────────────▶ │ models/      │
│ (fire_smoke│                    │ detector.py  │               │ fire_yolov8n │
│  YOLO)     │                    └──────────────┘               └──────┬───────┘
└─────┬──────┘                           │ Tuning Metrics                │
      │                                   ▼                              │
      │                          ┌────────────────┐                      │
      │                          │ Ultralytics    │                      │
      │                          │ Training Runs  │◀─────────────────────┘
      │                          │ (runs/fire_    │
      │                          │  train/...)    │
      ▼                          └────────────────┘
┌────────────┐                                            ┌─────────────────┐
│ configs/   │                                            │ bushfire_ai/main│
│ fire_smoke │                                            │ detection flow  │
└────────────┘                                            └─────────────────┘
```

### 1. Prepare the Dataset
- Collect imagery or short clips that contain fire, smoke, and non-fire scenes (see `datasets/fire_smoke` for a synthetic starter set).
- Label annotations in YOLO format using tools such as Roboflow, CVAT, or Label Studio.
- Structure the dataset directories:
```
datasets/
  fire_smoke/
    images/
      train/
      val/
      test/        # optional
    labels/
      train/
      val/
      test/
```
- Update `configs/fire_smoke.yaml` so `path` points to the dataset root and `names` match your class labels.

### 2. Configure Environment & Settings
- Set `FIRE_TARGET_CLASSES` in `.env` to the classes you labeled (comma separated), e.g. `FIRE_TARGET_CLASSES=fire,smoke`.
- Adjust `FIRE_CONFIDENCE_THRESHOLD` if you need higher precision or recall.

### 3. Launch Fine-Tuning
```bash
source .venv/bin/activate
python scripts/train_fire_detector.py \
  --data configs/fire_smoke.yaml \
  --model yolov8n.pt \
  --epochs 150 \
  --batch 16 \
  --imgsz 640 \
  --device cuda:0
```
- Swap `--model` for larger YOLOv8 checkpoints (`yolov8s.pt`, `yolov8m.pt`) if you have GPU resources.
- Use `--freeze` to lock backbone layers when the dataset is small.
- Training artifacts are stored under `runs/fire_train/<run-name>/`.

### 4. Deploy the Weights
```bash
cp runs/fire_train/yolov8n-fire/weights/best.pt models/fire_yolov8n.pt
```
- Ensure `Settings.detection.weights_path` (or `FIRE_WEIGHTS_PATH`) points to `models/fire_yolov8n.pt`.

### 5. Evaluate & Iterate
- Validate on held-out clips; tweak thresholds and augmentations as needed.
- Version your dataset/weights via object storage, Git LFS, or DVC.
- Retrain periodically with newly collected bushfire footage.
