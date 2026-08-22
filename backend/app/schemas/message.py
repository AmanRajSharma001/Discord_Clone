from datetime import datetime
from pydantic import BaseModel


class MessageCreate(BaseModel):
    channel_id: int
    author_id: int
    content: str


class MessageResponse(BaseModel):
    message_id: int
    channel_id: int
    author_id: int
    content: str
    created_at: datetime

    class Config:
        from_attributes = True