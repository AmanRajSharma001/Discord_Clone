from sqlalchemy import create_engine, text
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from urllib.parse import quote_plus
from app.core.config import (
    USERNAME,
    PASSWORD,
    HOST,
    PORT,
    DB_NAME,
)

encoded_password = quote_plus(PASSWORD)
def _ensure_database_exist():
    temp_engine = create_engine(
        f"postgresql+psycopg2://{USERNAME}:{encoded_password}@{HOST}:{PORT}/postgres"
    )
    with temp_engine.connect() as conn:
        conn.execution_options(isolation_level = "AUTOCOMMIT")
        result = conn.execute(
            text(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}'")
        )
        exists = result.scalar()
        if not exists:
            conn.execute(text(f"CREATE DATABASE {DB_NAME}"))
    temp_engine.dispose()

_ensure_database_exist()

engine = create_engine(
    f"postgresql+psycopg2://{USERNAME}:{encoded_password}@{HOST}:{PORT}/{DB_NAME}"
)

class Base(DeclarativeBase):
    pass


SessionLocal = sessionmaker(bind = engine, autoflush= False, autocommit = False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()