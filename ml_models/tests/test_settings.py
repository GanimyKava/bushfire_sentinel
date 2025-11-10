from pathlib import Path

import pytest

from bushfire_ai.config.settings import Settings


def test_settings_requires_camara_vars(monkeypatch, tmp_path: Path):
    env_path = tmp_path / "env"
    env_path.write_text(
        "CAMARA_BASE_URL=https://example.com\n"
        "CAMARA_UPLOAD_URL=https://example.com/upload\n"
        "CAMARA_CLIENT_ID=abc\n"
        "CAMARA_CLIENT_SECRET=def\n"
    )

    for key in [
        "CAMARA_BASE_URL",
        "CAMARA_UPLOAD_URL",
        "CAMARA_CLIENT_ID",
        "CAMARA_CLIENT_SECRET",
    ]:
        monkeypatch.delenv(key, raising=False)

    settings = Settings.from_env(env_path)
    assert str(settings.camara.base_url) == "https://example.com/"
    assert settings.camara.client_id == "abc"
    assert settings.detection.target_classes == ["fire"]
    assert settings.events.skip_frames_after_detection == 30
    assert settings.events.detection_mode == "store"


def test_settings_missing_env(monkeypatch, tmp_path: Path):
    env_path = tmp_path / "env"
    env_path.write_text("")
    for key in [
        "CAMARA_BASE_URL",
        "CAMARA_UPLOAD_URL",
        "CAMARA_CLIENT_ID",
        "CAMARA_CLIENT_SECRET",
    ]:
        monkeypatch.delenv(key, raising=False)
    with pytest.raises(ValueError):
        Settings.from_env(env_path)


def test_settings_event_flags(monkeypatch, tmp_path: Path):
    env_path = tmp_path / "env"
    env_path.write_text(
        "CAMARA_BASE_URL=https://example.com\n"
        "CAMARA_UPLOAD_URL=https://example.com/upload\n"
        "CAMARA_CLIENT_ID=abc\n"
        "CAMARA_CLIENT_SECRET=def\n"
        "DETECTION_MODE=view\n"
        "SKIP_FRAMES_AFTER_DETECTION=45\n"
    )

    for key in [
        "CAMARA_BASE_URL",
        "CAMARA_UPLOAD_URL",
        "CAMARA_CLIENT_ID",
        "CAMARA_CLIENT_SECRET",
        "DETECTION_MODE",
        "SKIP_FRAMES_AFTER_DETECTION",
    ]:
        monkeypatch.delenv(key, raising=False)

    settings = Settings.from_env(env_path)
    assert settings.events.detection_mode == "view"
    assert settings.events.skip_frames_after_detection == 45

