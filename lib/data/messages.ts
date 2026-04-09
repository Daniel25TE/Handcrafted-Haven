export type ContactMessage = {
  id: string;
  profile_id: string | null;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type ContactMessageFormValues = {
  profileId: string | null;
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactMessageActionState = {
  success: boolean;
  message: string;
  fieldErrors?: {
    fullName?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
};

export const initialContactMessageActionState: ContactMessageActionState = {
  success: false,
  message: "",
};

export function normalizeContactMessageInput(
  values: ContactMessageFormValues
): ContactMessageFormValues {
  return {
    profileId: values.profileId,
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  };
}

export function validateContactMessageInput(
  values: ContactMessageFormValues
): ContactMessageActionState["fieldErrors"] {
  const errors: ContactMessageActionState["fieldErrors"] = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!values.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}