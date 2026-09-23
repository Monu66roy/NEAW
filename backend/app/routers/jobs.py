from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import JobOpening
from app.schemas import JobOpeningCreate, JobOpeningOut

router = APIRouter(prefix="/job-openings", tags=["job-openings"])


@router.get("", response_model=list[JobOpeningOut])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(JobOpening).order_by(JobOpening.sort_order).all()


@router.post("", response_model=JobOpeningOut, status_code=201)
def create_job(
    payload: JobOpeningCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    if db.query(JobOpening).filter(JobOpening.slug == payload.slug).first():
        raise HTTPException(status_code=409, detail="A job with this slug already exists")
    job = JobOpening(**payload.model_dump())
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.put("/{job_id}", response_model=JobOpeningOut)
def update_job(
    job_id: int,
    payload: JobOpeningCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    job = db.get(JobOpening, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job opening not found")
    for field, value in payload.model_dump().items():
        setattr(job, field, value)
    db.commit()
    db.refresh(job)
    return job


@router.delete("/{job_id}", status_code=204)
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    job = db.get(JobOpening, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job opening not found")
    db.delete(job)
    db.commit()
    return None
