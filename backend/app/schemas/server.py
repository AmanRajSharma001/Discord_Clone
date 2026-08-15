from datetime import datetime

from pydantic import BaseModel

class ChannelCreate(BaseModel):
    channel_name: str
    channel_type: str


class CategoryCreate(BaseModel):
    category_name: str
    channels: list[ChannelCreate]


class ServerCreate(BaseModel):
    server_name: str
    server_icon: str | None = None
    owner_id: int
    description: str | None = None
    categories: list[CategoryCreate]


class ChannelResponse(BaseModel):
    channel_id: int
    channel_name: str
    channel_type: str


class CategoryResponse(BaseModel):
    category_id: int
    category_name: str
    channels: list[ChannelResponse]


class ServerResponse(BaseModel):
    server_id: int
    server_name: str
    server_icon: str | None
    owner_id: int
    description: str | None
    created_at: datetime
    categories: list[CategoryResponse]