from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Opportunity
from app.schemas import OpportunityCreate, OpportunityOut

router = APIRouter(prefix="/opportunities", tags=["opportunities"])


@router.get("", response_model=list[OpportunityOut])
def list_opportunities(db: Session = Depends(get_db)):
    return db.query(Opportunity).order_by(Opportunity.sort_order).all()


@router.post("", response_model=OpportunityOut, status_code=201)
def create_opportunity(
    payload: OpportunityCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    item = Opportunity(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=OpportunityOut)
def update_opportunity(
    item_id: int,
    payload: OpportunityCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    item = db.get(Opportunity, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    for field, value in payload.model_dump().items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=204)
def delete_opportunity(
    item_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    item = db.get(Opportunity, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    db.delete(item)
    db.commit()
    return None
