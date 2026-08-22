from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageResponse

router = APIRouter(prefix="/messages",tags=["Messages"])

@router.post("/", response_model=MessageResponse)
def create_message(message: MessageCreate,db: Session = Depends(get_db)):
    new_message = Message(channel_id=message.channel_id,author_id=message.author_id,content=message.content)
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

@router.get("/{channel_id}", response_model=list[MessageResponse])
def get_messages(channel_id: int,db: Session = Depends(get_db)):
    messages = (db.query(Message).filter(Message.channel_id == channel_id).order_by(Message.created_at.asc()).all())
    return messages