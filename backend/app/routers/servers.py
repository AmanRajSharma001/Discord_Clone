from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.server import Server, Category, Channel
from app.schemas.server import (
    ServerCreate,
    ServerResponse,
    CategoryResponse,
    ChannelResponse,
)


router = APIRouter(prefix="/servers", tags=["Servers"])


@router.post("/", response_model=ServerResponse)
def create_server(server: ServerCreate, db: Session = Depends(get_db)):
    new_server = Server(
        server_name=server.server_name,
        server_icon=server.server_icon,
        owner_id=server.owner_id,
        description=server.description
    )

    db.add(new_server)
    db.flush()

    for category_data in server.categories:
        new_category = Category(
            server_id=new_server.server_id,
            category_name=category_data.category_name
        )

        db.add(new_category)
        db.flush()

        for channel_data in category_data.channels:
            new_channel = Channel(
                category_id=new_category.category_id,
                channel_name=channel_data.channel_name,
                channel_type=channel_data.channel_type
            )

            db.add(new_channel)

    db.commit()
    db.refresh(new_server)

    categories = db.query(Category).filter(
        Category.server_id == new_server.server_id
    ).all()

    category_data = []

    for category in categories:
        channels = db.query(Channel).filter(
            Channel.category_id == category.category_id
        ).all()

        channel_data = []

        for channel in channels:
            channel_data.append(
                ChannelResponse(
                    channel_id=channel.channel_id,
                    channel_name=channel.channel_name,
                    channel_type=channel.channel_type
                )
            )

        category_data.append(
            CategoryResponse(
                category_id=category.category_id,
                category_name=category.category_name,
                channels=channel_data
            )
        )

    return ServerResponse(
        server_id=new_server.server_id,
        server_name=new_server.server_name,
        server_icon=new_server.server_icon,
        owner_id=new_server.owner_id,
        description=new_server.description,
        created_at=new_server.created_at,
        categories=category_data
    )


@router.get("/", response_model=list[ServerResponse])
def get_servers(db: Session = Depends(get_db)):
    servers = db.query(Server).all()

    result = []

    for server in servers:
        categories = db.query(Category).filter(
            Category.server_id == server.server_id
        ).all()

        category_data = []

        for category in categories:
            channels = db.query(Channel).filter(
                Channel.category_id == category.category_id
            ).all()

            channel_data = []

            for channel in channels:
                channel_data.append(
                    ChannelResponse(
                        channel_id=channel.channel_id,
                        channel_name=channel.channel_name,
                        channel_type=channel.channel_type
                    )
                )

            category_data.append(
                CategoryResponse(
                    category_id=category.category_id,
                    category_name=category.category_name,
                    channels=channel_data
                )
            )

        result.append(
            ServerResponse(
                server_id=server.server_id,
                server_name=server.server_name,
                server_icon=server.server_icon,
                owner_id=server.owner_id,
                description=server.description,
                created_at=server.created_at,
                categories=category_data
            )
        )

    return result