const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.18.42:3000"
).replace(/\/$/, "");

export interface JoinWaitlistInput {
  name: string;
  email: string;
  platforms: string[];
  whatsappNumber?: string;
  joinWhatsapp: boolean;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  name: string;
  platforms: string[];
  whatsappNumber: string | null;
  joinWhatsapp: boolean;
  status: "joined" | "invited";
  invitedAt: string | null;
  createdAt: string;
}

/**
 * Join the Copynsync closed beta waitlist.
 * Resolves with `alreadyJoined: true` when the email was already stored
 * (the API dedupes by email, so this call is idempotent).
 * Throws an Error with the server message on validation/network failure.
 */
export async function joinWaitlist(
  input: JoinWaitlistInput,
): Promise<{ alreadyJoined: boolean; entry: WaitlistEntry }> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/v1/waitlist/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.name.trim(),
        email: input.email.trim(),
        platforms: input.platforms,
        ...(input.joinWhatsapp && input.whatsappNumber?.trim()
          ? { whatsappNumber: input.whatsappNumber.trim() }
          : {}),
        joinWhatsapp: input.joinWhatsapp,
      }),
    });
  } catch {
    throw new Error(
      "Could not reach the signup server. Check your connection and try again.",
    );
  }

  const body = (await response.json().catch(() => null)) as {
    data?: { entry: WaitlistEntry; alreadyJoined: boolean };
    message?: string;
  } | null;

  if ((response.status === 201 || response.status === 200) && body?.data) {
    return {
      alreadyJoined:
        response.status === 200 || body.data.alreadyJoined === true,
      entry: body.data.entry,
    };
  }

  throw new Error(
    typeof body?.message === "string" && body.message.length > 0
      ? body.message
      : "Something went wrong. Please try again.",
  );
}
