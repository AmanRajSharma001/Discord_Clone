import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

export async function uploadServerIcon(file) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from("Dc clone")
        .upload(`server-icons/${fileName}`, file);

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("Dc clone")
        .getPublicUrl(`server-icons/${fileName}`);

    return data.publicUrl;
}