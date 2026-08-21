from supabase import create_client
from app.core.config import (
    SUPABASE_URL,
    SUPABASE_KEY,
    SUPABASE_BUCKET,
)

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)