from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import ContentListItem
from app.schemas import NamedItemCreate, NamedItemOut

router = APIRouter(prefix="/lists", tags=["content-lists"])

# -----------------------------------------------------------------------
# One generic (title, description) list, discriminated by `list_key`.
# Known keys used by the current frontend: focus_areas, core_values,
# partnership_types, career_reasons, privacy_sections (title + body).
# The admin panel can create items under a brand new list_key at any
# time — for example a new "timeline_milestones" section on the About
# page — without any backend or database migration.
# -----------------------------------------------------------------------


@router.get("/{list_key}", response_model=list[NamedItemOut])
def list_items(list_key: str, db: Session = Depends(get_db)):
    return (
        db.query(ContentListItem)
        .filter(ContentListItem.list_key == list_key)
        .order_by(ContentListItem.sort_order)
        .all()
    )


@router.get("", response_model=list[NamedItemOut])
def list_all_keys(db: Session = Depends(get_db)):
    """Used by the admin panel to show every list_key currently in use."""
    return db.query(ContentListItem).order_by(
        ContentListItem.list_key, ContentListItem.sort_order
    ).all()


@router.post("/{list_key}", response_model=NamedItemOut, status_code=201)
def create_item(
    list_key: str,
    payload: NamedItemCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    item = ContentListItem(list_key=list_key, **payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/items/{item_id}", response_model=NamedItemOut)
def update_item(
    item_id: int,
    payload: NamedItemCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    item = db.get(ContentListItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="List item not found")
    for field, value in payload.model_dump().items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/items/{item_id}", status_code=204)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    item = db.get(ContentListItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="List item not found")
    db.delete(item)
    db.commit()
    return None
