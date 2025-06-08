"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"

interface InstallAppButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function InstallAppButton({ className = "", variant = "outline" }: InstallAppButtonProps) {
  const [isInstallable, setIsInstallable] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isAppInstalled, setIsAppInstalled] = useState(false)
  const deferredPromptRef = useRef<any>(null)

  useEffect(() => {
    // Check if the app is already installed
    const checkIfInstalled = () => {
      // Check if in standalone mode (PWA)
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsAppInstalled(true)
        return true
      }
      // Check for iOS home screen
      if (
        window.navigator.standalone === true ||
        window.navigator.standalone === "true" ||
        window.navigator.standalone === "yes"
      ) {
        setIsAppInstalled(true)
        return true
      }
      return false
    }

    // Check if the app can be installed
    const checkInstallability = () => {
      // iOS devices can always "install" via Add to Home Screen
      const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
      if (isIOS) {
        setIsInstallable(true)
        return
      }
    }

    if (!checkIfInstalled()) {
      checkInstallability()
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser prompt
      e.preventDefault()
      // Store the event for later use
      deferredPromptRef.current = e
      setIsInstallable(true)
      console.log("Captured beforeinstallprompt event for later use")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsAppInstalled(true)
      setIsInstallable(false)
      console.log("App was installed successfully")
    }

    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = () => {
    console.log("Install button clicked, showing prompt")
    setShowPrompt(true)
  }

  if (isAppInstalled) {
    return null // Don't show the button if the app is already installed
  }

  return (
    <>
      <Button
        variant={variant}
        onClick={handleInstallClick}
        className={`${className} flex items-center gap-2`}
        aria-label="Ladda ner appen"
      >
        <Download className="h-4 w-4" />
        <span>Ladda ner appen</span>
      </Button>
      {showPrompt && (
        <PWAInstallPrompt
          manuallyTriggered={true}
          onClose={() => setShowPrompt(false)}
          deferredPrompt={deferredPromptRef.current}
        />
      )}
    </>
  )
}
