## Fire Detection Model Weights

The fire/bushfire detection pipeline expects a YOLOv8 checkpoint at `./models/fire_yolov8n.pt`. Choose the approach that fits your development stage:

### 1. Quick Start (baseline YOLOv8n)
```bash
mkdir -p models
curl -L -o models/fire_yolov8n.pt \
  https://github.com/ultralytics/assets/releases/download/v8.2.0/yolov8n.pt
```

- Provides general-purpose detection; useful for plumbing and smoke tests.
- Not specialized for fire/smoke, so expect higher false positives/negatives.

### 2. Community Fire Models
- Search Ultralytics HUB or public repositories for pretrained fire/smoke detectors (e.g., "YOLOv8 fire detection").
- Download the `.pt` weights and place them at `models/fire_yolov8n.pt`.
- Validate on your footage before deployment.

### 3. Custom Fine-Tuning (recommended for production)
1. Collect and label fire, smoke, and background frames in YOLO format.
2. Train with Ultralytics:
   ```bash
   yolo detect train model=yolov8n.pt data=fire_smoke.yaml epochs=100 imgsz=640
   ```
3. Copy the best checkpoint (e.g., `runs/detect/train/weights/best.pt`) to `models/fire_yolov8n.pt`.
4. Re-run the pipeline to use the new weights.

### Validation Tips
- Evaluate on real drone footage; adjust confidence thresholds (`FIRE_CONFIDENCE_THRESHOLD`) in your env file.
- Track precision/recall per class; retrain if performance drifts.
- Version control your weights (e.g., use a model registry or object storage) for reproducibility.

