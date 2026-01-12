"use client"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import * as Sentry from "@sentry/nextjs"
import { useAuth } from "@clerk/clerk-react"

const DemoPage = () => {
  const { userId } = useAuth()

  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const handleBlocking = async () => {
    setLoading(true)
    await fetch("/api/demo/blocking", {
      method: "POST",
    })
    setLoading(false)
  }

  const handleBackground = async () => {
    setLoading2(true)
    await fetch("/api/demo/background", {
      method: "POST",
    })
    setLoading2(false)
  }
  const handleClientError = () => {
    Sentry.logger.info("user attempting to click on client function", { userId })
    throw new Error("Client error: Something went wrong!")
  }

  const handleApiError = async () => {
    await fetch("/api/demo/error", { method: "POST" })
  }

  const handleInngestError = async () => {
    await fetch("/api/demo/inngest-error", {
      method: "POST",
    })
  }

  return (
    <div className="p-8 space-x-5">
      <Button onClick={handleBlocking}>
        {loading ? "Loading..." : "Blocking"}
      </Button>
      <Button onClick={handleBackground}>
        {loading2 ? "Loading..." : "Blocking"}
      </Button>

      <Button variant={"destructive"} onClick={handleClientError}>
        Client Error
      </Button>
      <Button variant={"destructive"} onClick={handleApiError}>
        API Error
      </Button>
      <Button variant={"destructive"} onClick={handleInngestError}>
        Inngest Error
      </Button>
    </div>
  )
}

export default DemoPage
