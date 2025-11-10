## CAMARA Integration Notes

### Required APIs
1. **Device Location Retrieval** (`/device-location/v1/location`)
   - Inputs: `deviceId` (IMSI/MSISDN of the drone modem).
   - Output: JSON payload with latitude, longitude, uncertainty, timestamp.

2. **Quality-on-Demand (QoD)**
   - Optional escalation when fire is detected.
   - Request body includes `deviceId`, `priority`, and duration/throughput targets.

3. **Incident Upload Endpoint**
   - Custom endpoint to receive incident metadata and media.
   - Expects multipart form data with JSON metadata + JPEG/MP4 attachments.

### Authentication Flow
```
Client Credentials ──▶ Token Endpoint ──▶ Bearer token ──▶ API calls
```

- Store `client_id`, `client_secret`, and desired `scope` in environment variables.
- Tokens are cached in-memory by `CamaraClient` until expiry (enhance with TTL later).

### Payload Schema (example)
```json
{
  "eventType": "fire_detection",
  "confidence": 0.87,
  "classes": ["fire", "smoke"],
  "location": {
    "latitude": -33.865143,
    "longitude": 151.2099,
    "uncertainty": 12.5,
    "timestamp": "2024-02-09T10:05:41Z"
  },
  "quality": {
    "requestId": "abc-123",
    "status": "accepted"
  }
}
```

### Operational Considerations
- Cache location results to avoid rate limits; refresh when drone cell changes.
- Implement retries with exponential backoff on QoD requests.
- Encrypt artifacts in transit; consider signing payloads before upload.
- Extend incident reporting to integrate with emergency services workflows.

