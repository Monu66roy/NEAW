from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.config import get_settings
from app.database import get_db
from app.models import Image
from app.schemas import ImageOut, image_url

router = APIRouter(prefix="/images", tags=["images"])
settings = get_settings()

ALLOWED_CONTENT_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"}


def _to_out(image: Image) -> ImageOut:
    return ImageOut(
        id=image.id,
        filename=image.filename,
        content_type=image.content_type,
        alt_text=image.alt_text,
        size_bytes=image.size_bytes,
        url=image_url(image.id) or "",
    )


@router.get("", response_model=list[ImageOut])
def list_images(db: Session = Depends(get_db)):
    images = db.query(Image).order_by(Image.created_at.desc()).all()
    return [_to_out(img) for img in images]


@router.post("", response_model=ImageOut, status_code=201)
async def upload_image(
    file: UploadFile = File(...),
    alt_text: str = Form(""),
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=415, detail=f"Unsupported image type: {file.content_type}")

    data = await file.read()
    max_bytes = settings.max_image_size_mb * 1024 * 1024
    if len(data) > max_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"Image exceeds the {settings.max_image_size_mb}MB limit",
        )

    image = Image(
        filename=file.filename or "upload",
        content_type=file.content_type,
        alt_text=alt_text,
        data=data,
        size_bytes=len(data),
    )
    db.add(image)
    db.commit()
    db.refresh(image)
    return _to_out(image)


@router.get("/{image_id}/file")
def get_image_file(image_id: int, db: Session = Depends(get_db)):
    image = db.get(Image, image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return Response(
        content=image.data,
        media_type=image.content_type,
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )


@router.delete("/{image_id}", status_code=204)
def delete_image(
    image_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    image = db.get(Image, image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    db.delete(image)
    db.commit()
    return None
