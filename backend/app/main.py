from fastapi import FastAPI
from app.routers.servers import router as server_router
from app.core.database import Base, engine
from app.models.server import Server, Category, Channel, ServerMember

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(server_router)

@app.get("/")
def root():
    return {"message": "Backend is running"}

