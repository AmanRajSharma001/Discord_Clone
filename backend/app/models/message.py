from datetime import datetime

from sqlalchemy import ForeignKey,Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

class Message(Base):
    __tablename__ = "messages"
    message_id: Mapped[int] = mapped_column(primary_key=True,autoincrement=True,index=True)
    channel_id: Mapped[int] = mapped_column(ForeignKey("server_channels.channel_id"),nullable=False)
    author_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"),nullable=False)
    content: Mapped[str] = mapped_column(Text,nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow,nullable=False)
