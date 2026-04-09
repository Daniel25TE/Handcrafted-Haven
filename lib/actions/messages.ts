"use server";

import { createServerSupabaseClient } from "@/lib/db/supabase-server";
import {
  normalizeContactMessageInput,
  validateContactMessageInput,
  type ContactMessageActionState,
} from "@/lib/data/messages";

export async function sendContactMessage(
  _prevState: ContactMessageActionState,
  formData: FormData
): Promise<ContactMessageActionState> {
  const supabase = await createServerSupabaseClient();

  const profileIdValue = formData.get("profileId");
  const fullNameValue = formData.get("fullName");
  const emailValue = formData.get("email");
  const subjectValue = formData.get("subject");
  const messageValue = formData.get("message");

  const values = normalizeContactMessageInput({
    profileId:
      typeof profileIdValue === "string" && profileIdValue.trim()
        ? profileIdValue
        : null,
    fullName: typeof fullNameValue === "string" ? fullNameValue : "",
    email: typeof emailValue === "string" ? emailValue : "",
    subject: typeof subjectValue === "string" ? subjectValue : "",
    message: typeof messageValue === "string" ? messageValue : "",
  });

  const fieldErrors = validateContactMessageInput(values);

  if (Object.keys(fieldErrors ?? {}).length > 0) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let safeProfileId: string | null = null;

  if (user && values.profileId === user.id) {
    safeProfileId = user.id;
  }

  const { error } = await supabase.from("contact_messages").insert({
    profile_id: safeProfileId,
    full_name: values.fullName,
    email: values.email,
    subject: values.subject,
    message: values.message,
  });

  if (error) {
    return {
      success: false,
      message: "Failed to send your message. Please try again.",
    };
  }

  return {
    success: true,
    message: "Your message has been sent successfully.",
  };
}