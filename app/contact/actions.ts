"use server"

export async function submitContact(prevState: { success: boolean; message: string } | null, formData: FormData) {
  // Simulate processing
  await new Promise((r) => setTimeout(r, 800))

  const name = String(formData.get("name") ?? "")
  const email = String(formData.get("email") ?? "")
  const message = String(formData.get("message") ?? "")

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all fields." }
  }

  // In production, send to your email service or persist to a database
  return {
    success: true,
    message: `Thanks ${name}, your message was received. I’ll reply to ${email} soon.`,
  }
}
