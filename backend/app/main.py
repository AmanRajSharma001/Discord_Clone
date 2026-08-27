from fastapi import FastAPI
from app.routers.servers import router as server_router
from app.routers.messages import router as message_router
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.models.server import Server, Category, Channel, ServerMember
from app.models.message import Message
from app.models.user import User
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(server_router)
app.include_router(message_router)

@app.get("/")
def root():
    return {"message": "Backend is running"}
