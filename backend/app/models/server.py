from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Server(Base):
    __tablename__ = "servers"

    server_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    server_name: Mapped[str] = mapped_column(String, nullable=False)
    server_icon: Mapped[str | None] = mapped_column(String, nullable=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Category(Base):
    __tablename__ = "server_categories"

    category_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    server_id: Mapped[int] = mapped_column(ForeignKey("servers.server_id"), nullable=False)
    category_name: Mapped[str] = mapped_column(String, nullable=False)


class Channel(Base):
    __tablename__ = "server_channels"

    channel_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("server_categories.category_id"), nullable=False)
    channel_name: Mapped[str] = mapped_column(String, nullable=False)
    channel_type: Mapped[str] = mapped_column(String, nullable=False)


class ServerMember(Base):
    __tablename__ = "server_members"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    server_id: Mapped[int] = mapped_column(ForeignKey("servers.server_id"), nullable=False)
    member_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"), nullable=False)
    member_role: Mapped[str] = mapped_column(String, default="member")
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)