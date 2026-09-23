from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Article
from app.schemas import ArticleCreate, ArticleOut, image_url

router = APIRouter(prefix="/articles", tags=["articles"])


def _to_out(article: Article) -> ArticleOut:
    return ArticleOut.model_validate(article, from_attributes=True).model_copy(
        update={"image_url": image_url(article.image_id)}
    )


@router.get("", response_model=list[ArticleOut])
def list_articles(db: Session = Depends(get_db)):
    articles = db.query(Article).order_by(Article.sort_order).all()
    return [_to_out(a) for a in articles]


@router.get("/{slug}", response_model=ArticleOut)
def get_article(slug: str, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return _to_out(article)


@router.post("", response_model=ArticleOut, status_code=201)
def create_article(
    payload: ArticleCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    if db.query(Article).filter(Article.slug == payload.slug).first():
        raise HTTPException(status_code=409, detail="An article with this slug already exists")
    article = Article(**payload.model_dump())
    db.add(article)
    db.commit()
    db.refresh(article)
    return _to_out(article)


@router.put("/{article_id}", response_model=ArticleOut)
def update_article(
    article_id: int,
    payload: ArticleCreate,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    article = db.get(Article, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    for field, value in payload.model_dump().items():
        setattr(article, field, value)
    db.commit()
    db.refresh(article)
    return _to_out(article)


@router.delete("/{article_id}", status_code=204)
def delete_article(
    article_id: int,
    db: Session = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    article = db.get(Article, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(article)
    db.commit()
    return None
