"use server"

import { headers } from "next/headers";

export async function submitContact(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
) {
  const name = String(formData.get("name") ?? "")
  const email = String(formData.get("email") ?? "")
  const message = String(formData.get("message") ?? "")

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all fields." }
  }

  try {
    // Send to Make.com webhook
    const webhookUrl = process.env.MAKE_WEBHOOK_URL // Add this to your .env

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          timestamp: new Date().toISOString(),
          userAgent: (await headers()).get('user-agent') || 'Unknown',
        }),
      })
    }

    return {
      success: true,
      message: `Thanks ${name}, your message was received. I'll reply to ${email} soon.`,
    }
  } catch (error) {
    // Safely handle the unknown error type
    const error_message = error instanceof Error ? error.message : 'Unknown error occurred'

    // In your catch block, also send error notifications
    if (process.env.MAKE_ERROR_WEBHOOK_URL) {
      await fetch(process.env.MAKE_ERROR_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error_message,
          timestamp: new Date().toISOString(),
          formData: { name, email, messageLength: message.length }
        }),
      })
    }

    // Still return success to user - don't let webhook failures break UX
    return {
      success: true,
      message: `Thanks ${name}, your message was received. I'll reply to ${email} soon.`,
    }
  }
}