import os
from functools import lru_cache
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Configuration loaded from environment variables (see .env.example)."""

    database_url: str = os.getenv(
        "DATABASE_URL", "postgresql+psycopg2://postgres:monu12345@localhost:5432/neaw"
    )
    jwt_secret: str = os.getenv("JWT_SECRET", "change-this-secret-in-production")
    jwt_algorithm: str = "HS256"
    jwt_expires_minutes: int = int(os.getenv("JWT_EXPIRES_MINUTES", "480"))
    admin_username: str = os.getenv("ADMIN_USERNAME", "admin")
    admin_password: str = os.getenv("ADMIN_PASSWORD", "Monu@1234")
    cors_origins: list[str] = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS", "http://localhost:3000"
        ).split(",")
        if origin.strip()
    ]
    max_image_size_mb: int = int(os.getenv("MAX_IMAGE_SIZE_MB", "8"))


@lru_cache
def get_settings() -> Settings:
    return Settings()
