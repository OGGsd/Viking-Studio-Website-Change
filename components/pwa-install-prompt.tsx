"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download } from "lucide-react"
import Image from "next/image"

interface PWAInstallPromptProps {
  manuallyTriggered?: boolean
  onClose?: () => void
  deferredPrompt?: any
}

export function PWAInstallPrompt({ manuallyTriggered = false, onClose, deferredPrompt }: PWAInstallPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const promptEventRef = useRef<any>(null)

  useEffect(() => {
    // Check if on iOS
    const isIOSDevice = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }

    setIsIOS(isIOSDevice())

    // If we received a deferred prompt from props, use it
    if (deferredPrompt) {
      promptEventRef.current = deferredPrompt
      setIsInstallable(true)
    }

    // Listen for the beforeinstallprompt event if not manually triggered
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      promptEventRef.current = e
      setIsInstallable(true)
      console.log("Captured beforeinstallprompt event")
    }

    // Add event listener for beforeinstallprompt
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Handle automatic timer for showing the prompt
    let timerRef: NodeJS.Timeout | null = null

    if (!manuallyTriggered) {
      console.log("Setting up 60-second timer for PWA prompt")

      // Check if the app is already installed to avoid showing the prompt unnecessarily
      const isAppInstalled =
        window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true

      if (!isAppInstalled) {
        // Use a shorter timeout for testing if needed (e.g., 5000 for 5 seconds)
        timerRef = setTimeout(() => {
          console.log("Timer fired after 60 seconds")

          // Only show if not dismissed previously
          const isDismissed = localStorage.getItem("pwaInstallPromptDismissed") === "true"

          if (!isDismissed) {
            console.log("Showing PWA prompt after timer")
            setShowPrompt(true)
          } else {
            console.log("PWA prompt was previously dismissed, not showing")
          }
        }, 60000) // 60 seconds
      } else {
        console.log("App is already installed, not setting timer")
      }
    }

    // Cleanup function
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

      if (timerRef) {
        console.log("Clearing PWA prompt timer on cleanup")
        clearTimeout(timerRef)
      }
    }
  }, [manuallyTriggered, deferredPrompt])

  // Effect to show prompt immediately if manually triggered
  useEffect(() => {
    if (manuallyTriggered) {
      setShowPrompt(true)
    }
  }, [manuallyTriggered])

  const handleInstall = async () => {
    // First try the passed deferredPrompt
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        console.log(`User ${outcome} the installation prompt (from props)`)
        closePrompt()
        return
      } catch (error) {
        console.error("Error using passed deferredPrompt:", error)
      }
    }

    // Then try the stored promptEventRef
    if (promptEventRef.current) {
      try {
        promptEventRef.current.prompt()
        const { outcome } = await promptEventRef.current.userChoice
        promptEventRef.current = null
        console.log(`User ${outcome} the installation prompt (from ref)`)
        closePrompt()
        return
      } catch (error) {
        console.error("Error using promptEventRef:", error)
      }
    }

    // If we're on iOS, just keep the instructions visible
    if (isIOS) {
      // For iOS we just show instructions, no need to do anything else
      return
    }

    // If we can't trigger the prompt, just close it
    closePrompt()
  }

  const closePrompt = () => {
    setShowPrompt(false)
    if (onClose) {
      onClose()
    }
  }

  const dismissPrompt = () => {
    // Remember that the user dismissed the prompt
    localStorage.setItem("pwaInstallPromptDismissed", "true")
    closePrompt()
  }

  if (!showPrompt) return null

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="fixed z-50 inset-0 flex items-center justify-center px-4"
        >
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full">
            <div className="p-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-stone-900">Installera app</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={dismissPrompt}
                  className="h-8 w-8 rounded-full hover:bg-stone-100 text-stone-500"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Stäng</span>
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-black flex-shrink-0">
                  <Image
                    src="/android-chrome-512x512.png"
                    alt="Viking Salong Logo"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    Viking Salong - Professionell Herrfrisör i Jönköping
                  </p>
                  <p className="text-xs text-stone-500">vikingsalong.axiestudio.se</p>
                </div>
              </div>

              {isIOS ? (
                <div className="mb-4 text-sm text-stone-600">
                  <p>För att installera appen på din iOS-enhet:</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1">
                    <li>Tryck på dela-ikonen i Safari</li>
                    <li>Scrolla ner och tryck på "Lägg till på hemskärmen"</li>
                    <li>Tryck på "Lägg till" i övre högra hörnet</li>
                  </ol>
                </div>
              ) : (
                <p className="mb-4 text-sm text-stone-600">
                  Installera Viking Salong på din enhet för snabbare åtkomst och en bättre upplevelse.
                </p>
              )}

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={dismissPrompt}
                  className="border-stone-300 text-stone-700 hover:bg-stone-100"
                >
                  Avbryt
                </Button>
                {!isIOS && (
                  <Button onClick={handleInstall} className="bg-amber-600 hover:bg-amber-500 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Installera
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
