from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import PageContentBlock
from app.schemas import PageContentBlockOut, PageContentBlockUpsert, image_url

router = APIRouter(prefix="/page-content", tags=["page-content"])


def _to_out(block: PageContentBlock) -> PageContentBlockOut:
    return PageContentBlockOut(
        id=block.id,
        page_slug=block.page_slug,
        block_key=block.block_key,
        value=block.value,
        image_id=block.image_id,
        image_url=image_url(block.image_id),
    )


@router.get("/{page_slug}", response_model=list[PageContentBlockOut])
def get_page_content(page_slug: str, db: Session = Depends(get_db)):
    blocks = (
        db.query(PageContentBlock)
        .filter(PageContentBlock.page_slug == page_slug)
        .all()
    )
    return [_to_out(b) for b in blocks]


@router.get("", response_model=list[PageContentBlockOut])
def list_all_page_content(db: Session = Depends(get_db)):
    """Used by the admin panel's Page Content screen to list every page at once."""
    blocks = db.query(PageContentBlock).order_by(PageContentBlock.page_slug).all()
    return [_to_out(b) for b in blocks]


@router.put("", response_model=PageContentBlockOut)
def upsert_page_content(
    payload: PageContentBlockUpsert,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    block = (
        db.query(PageContentBlock)
        .filter(
            PageContentBlock.page_slug == payload.page_slug,
            PageContentBlock.block_key == payload.block_key,
        )
        .first()
    )
    if block:
        block.value = payload.value
        block.image_id = payload.image_id
    else:
        block = PageContentBlock(**payload.model_dump())
        db.add(block)
    db.commit()
    db.refresh(block)
    return _to_out(block)


@router.delete("/{block_id}", status_code=204)
def delete_page_content(
    block_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    block = db.get(PageContentBlock, block_id)
    if not block:
        raise HTTPException(status_code=404, detail="Content block not found")
    db.delete(block)
    db.commit()
    return None
