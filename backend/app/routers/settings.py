from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Setting
from app.schemas import SettingItem

router = APIRouter(prefix="/settings", tags=["settings"])


@router.get("", response_model=dict[str, str])
def get_settings(db: Session = Depends(get_db)):
    rows = db.query(Setting).all()
    return {row.key: row.value for row in rows}


@router.put("", response_model=dict[str, str])
def update_settings(
    payload: list[SettingItem],
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    for item in payload:
        row = db.get(Setting, item.key)
        if row:
            row.value = item.value
        else:
            db.add(Setting(key=item.key, value=item.value))
    db.commit()
    rows = db.query(Setting).all()
    return {row.key: row.value for row in rows}
