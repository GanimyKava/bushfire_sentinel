## System Architecture

### Overview
The application is a modular Python service that runs on-board a 5G-enabled drone or an edge computer connected to the drone. It continuously ingests video frames, detects fire/smoke events with a deep-learning model, persists evidence locally, and synchronizes incident data with CAMARA APIs.

```
┌────────────┐   frames    ┌─────────────────────┐   detections   ┌────────────────┐
│ Video I/O  │────────────▶│ Detection Pipeline  │───────────────▶│ Event Manager  │
│ (camera or │             │ (YOLO Inference)    │                │ (buffer, clips) │
│ file)      │             └─────────────────────┘                └────────┬───────┘
└─────┬──────┘                                                     evidence │
      │                           telemetry + QoD requests                 │
      │                                                                     ▼
      │                                                               ┌───────────┐
      │                                                               │ CAMARA    │
      │                               uploads + metadata             │ API Layer │
      ▼                                                               └───────────┘
┌────────────┐  thresholds, paths ┌─────────────────┐
│ Config/Env │───────────────────▶│ Orchestrator    │
└────────────┘                    │ (`main.py`)     │
                                  └─────────────────┘
```

### Core Components
- **VideoSource** (`pipeline/video_source.py`): Wraps OpenCV capture for cameras, RTSP streams, or video files. Provides async-compatible frame iterators with adaptive buffering for network jitter.
- **FireDetectionModel** (`detector/fire_detector.py`): Loads Ultralytics YOLO weights (default: `yolov8n`) and exposes `predict(frame)` returning bounding boxes, labels, and confidence scores for fire/smoke classes.
- **EventAccumulator** (`pipeline/event_accumulator.py`): Maintains a rolling window of frames. When detections exceed thresholds, it extracts keyframes and short clips around the event.
- **IncidentReporter** (`integrations/camara_reporter.py`): Coordinates CAMARA Location Retrieval and Quality-on-Demand API calls, then uploads packaged evidence (images/clips) and metadata (confidence, timestamp, location).
- **StorageBackend** (`storage/local_store.py`): Persists frames and clips to disk in a structured directory and exposes handles for upload.
- **Settings** (`config/settings.py`): Pydantic-based loader combining environment variables and CLI arguments.

### Data Flow
1. **Initialize** settings from environment and CLI arguments; load YOLO weights.
2. **Acquire** frames via `VideoSource`. Optional GPU decoding (e.g., using GStreamer) can be configured later.
3. **Detect** fire/smoke; apply non-max suppression and class filtering.
4. **Trigger** event: store frames and gather context window, compute aggregated confidence.
5. **Retrieve Location** with CAMARA Location API using network cell data or device identifiers; optionally request Quality-on-Demand (QoD) when the event is critical.
6. **Report** incident to CAMARA Upload endpoint, including:
   - GPS coordinates & QoD metrics.
   - Detection metadata (model version, confidences, bounding boxes).
   - Keyframe(s) and optional MP4 clip.
7. **Log** success/failure and maintain retry queue for unreliable connectivity.

### Tech Choices & Rationale
- **Ultralytics YOLO**: Offers ready-made detectors, on-device optimization, and TensorRT export if needed.
- **OpenCV**: Works across camera transports and lightweight enough for edge devices.
- **Pydantic Settings**: Centralized, type-safe configuration for operations teams.
- **Loguru**: Human-friendly structured logging out-of-the-box; replaceable with `structlog` if needed.
- **Async Integrations**: CAMARA client uses `httpx` (extend later) to allow non-blocking uploads.

### Scalability Considerations
- Support GPU acceleration via CUDA/TensorRT for high-resolution streams.
- Add health monitoring and remote configuration via MQTT or REST control plane.
- Introduce ring-buffered storage with automatic rollover to manage disk usage.
- Integrate with drone telemetry bus (MAVLink) for richer context.

### Testing Strategy
- **Unit Tests**: Mocked detectors, frame pipelines, CAMARA client responses.
- **Integration Tests**: Use prerecorded test videos in `tests/data` and record expected detection events.
- **Hardware-in-loop**: Validate on actual drone or emulator with sample streams.

