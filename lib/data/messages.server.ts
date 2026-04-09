import { createServerSupabaseClient } from "@/lib/db/supabase-server";
import type { ContactMessage } from "@/lib/data/messages";

export async function getAllMessages(): Promise<ContactMessage[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact messages:", error.message);
    return [];
  }

  return (data ?? []) as ContactMessage[];
}

export async function getMessageById(
  id: string
): Promise<ContactMessage | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching contact message:", error.message);
    return null;
  }

  return data as ContactMessage;
}