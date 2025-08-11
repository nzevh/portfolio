"use client"

import { useActionState } from "react"
import { Github, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitContact } from "./actions"
import { SafeLink } from "@/components/safe-link"
import { siteConfig } from "@/lib/site"

type ContactState = { success: boolean; message: string } | null

export default function ContactPage() {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, null)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-2 text-white/70">Let’s talk about robotics control, research, or collaborations.</p>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={action} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="border-white/15 bg-black/40 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="border-white/15 bg-black/40 text-white placeholder:text-white/40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="How can I help?"
                  className="min-h-40 border-white/15 bg-black/40 text-white placeholder:text-white/40"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={pending} className="bg-white text-black hover:bg-zinc-200">
                  {pending ? "Sending…" : "Send message"}
                </Button>
                <span className="text-sm text-white/60">I typically respond within a day.</span>
              </div>

              {state && (
                <Alert className="mt-4 border-white/20 bg-white/5 text-white">
                  <AlertTitle>{state.success ? "Message sent" : "Something went wrong"}</AlertTitle>
                  <AlertDescription className={state.success ? "text-white/85" : "text-white/80"}>
                    {state.message}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 flex items-center gap-3">
          <SafeLink href={siteConfig.social.github} target="_blank" className="inline-flex">
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </SafeLink>
          <SafeLink href={siteConfig.social.linkedin} target="_blank" className="inline-flex">
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </SafeLink>
          <SafeLink href={siteConfig.social.twitter} target="_blank" className="inline-flex">
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </SafeLink>
        </div>
      </main>
    </div>
  )
}
