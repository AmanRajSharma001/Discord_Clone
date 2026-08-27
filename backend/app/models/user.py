from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(primary_key=True,autoincrement=True,index=True)
    username: Mapped[str] = mapped_column(String,nullable=False)
    messages = relationship("Message",back_populates="author")