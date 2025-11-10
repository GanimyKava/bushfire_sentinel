## Bushfire AI Drone Detection

Prototype prepared for the Telstra & Nokia Networks-as-Code Hackathon. The solution targets drones on 5G networks for rapid bushfire response.

Python application blueprint for real-time fire, bushfire, and smoke detection on 5G-connected drones. The system ingests live camera streams or offline footage, detects hazardous events, captures evidence frames/clips, and notifies CAMARA APIs with geospatial metadata and model confidence.

### Key Features
- Real-time video ingestion from RTSP/USB cameras or local files.
- Modular detection pipeline using Ultralytics YOLO models fine-tunable for fire/smoke classes.
- Event buffering to save key frames and short clips around detections.
- CAMARA Location Retrieval & Quality-on-Demand integrations for situational awareness.
- Configurable thresholds, batching, and asynchronous uploads for constrained networks.

### Project Layout
- `src/bushfire_ai/config`: Configuration models & environment loading.
- `src/bushfire_ai/detector`: ML model wrappers and post-processing utilities.
- `src/bushfire_ai/pipeline`: Video ingestion, event management, and orchestration.
- `src/bushfire_ai/integrations`: CAMARA API clients and reporting logic.
- `src/bushfire_ai/storage`: Local persistence for frames and clips.
- `src/bushfire_ai/utils`: Shared logging, timing, and helper functions.
- `tests`: Unit/integration test scaffolding.
- `docs`: Supplemental documentation (architecture, API notes).

### Getting Started
```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
cp .env.example .env  # populate secrets
# ensure FIRE_TARGET_CLASSES=fire (comma-separated if including smoke)
# adjust SKIP_FRAMES_AFTER_DETECTION to throttle repeat alerts (default 30 frames)
# set DETECTION_MODE=view to preview the live annotated feed (no artifacts saved, skip window disabled)
```

### Running the Pipeline
```bash
python -m bushfire_ai.main --source rtsp://<camera-url> --weights ./models/fire_yolov8n.pt

# optionally throttle repeat alerts per run
python -m bushfire_ai.main --source ./videos/BushFires_DroneFootage_YendarraHowesValley-2019_360p.mp4 --weights ./models/fire_yolov8n_finetune_small.pt

python -m bushfire_ai.main --source ./videos/sample_fire_video.mp4 --weights ./models/fire_yolov8n.pt --skip-frames-after-detection 60 --json-logs --log-level DEBUG
```

### Training Custom Fire Models
- A synthetic starter dataset is included under `datasets/fire_smoke`; replace with real footage for production.
- Prepare a dataset using YOLO format and update `configs/fire_smoke.yaml`.
- Follow the fine-tuning guide in `docs/TRAINING.md` to train and export new weights.

### Next Steps
- Integrate drone telemetry input (GPS, IMU) to enrich detection reports.
- Collect labeled fire/bushfire footage and fine-tune YOLO weights.
- Harden network resiliency (retry policies, offline caching).
- Expand test coverage with synthetic fixtures and end-to-end flows.

