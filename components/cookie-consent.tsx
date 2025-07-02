"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cookie, Info } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const consentRef = useRef<HTMLDivElement>(null)

  // Media queries for responsive design - ONLY show on desktop
  const isDesktop = useMediaQuery("(min-width: 1025px)")

  useEffect(() => {
    // Only show cookie consent on desktop devices
    if (!isDesktop) {
      return
    }

    // Check if user has already made a choice
    const consentGiven = localStorage.getItem("cookieConsent")

    // Only show the banner if no choice has been made yet
    if (!consentGiven) {
      // Small delay to not show immediately on page load
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isDesktop])

  // Handle click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (consentRef.current && !consentRef.current.contains(event.target as Node)) {
        dismissConsent()
      }
    }

    // Only add listener if consent is showing
    if (showConsent) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showConsent])

  // Handle escape key to dismiss
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissConsent()
      }
    }

    if (showConsent) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [showConsent])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowConsent(false)
  }

  const dismissConsent = () => {
    // Just hide without saving preference
    setShowConsent(false)
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  // Don't render anything if not desktop
  if (!isDesktop || !showConsent) return null

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="fixed z-50 bottom-0 left-0 right-0 w-full"
          ref={consentRef}
        >
          {/* Desktop Layout Only */}
          <div className="bg-stone-900 border-t border-stone-700 shadow-2xl backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-amber-600/20 p-2.5 rounded-full">
                  <Cookie className="h-5 w-5 text-amber-500" />
                </div>
                <div className="max-w-xl">
                  <h3 className="text-base font-medium mb-1">Vi använder cookies</h3>
                  <p className="text-sm text-stone-300">
                    Vi använder cookies för att förbättra din upplevelse på vår webbplats. Genom att fortsätta använda
                    webbplatsen godkänner du användningen av cookies.
                  </p>
                  <button
                    onClick={toggleExpanded}
                    className="flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 mt-1 transition-colors"
                  >
                    <Info className="h-3 w-3" />
                    <span>{expanded ? "Visa mindre" : "Läs mer"}</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Button
                  onClick={acceptCookies}
                  className="bg-amber-600 hover:bg-amber-500 text-white whitespace-nowrap"
                >
                  Acceptera alla
                </Button>
                <Button
                  onClick={declineCookies}
                  variant="outline"
                  className="border-stone-700 hover:bg-stone-800 whitespace-nowrap"
                >
                  Endast nödvändiga
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={dismissConsent}
                  className="h-10 w-10 rounded-full hover:bg-stone-800"
                  aria-label="Stäng"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-stone-800"
                >
                  <div className="max-w-7xl mx-auto px-6 py-3">
                    <p className="text-xs text-stone-400">
                      Nödvändiga cookies hjälper till att göra webbplatsen användbar genom att aktivera grundläggande
                      funktioner. Webbplatsen kan inte fungera korrekt utan dessa cookies. Statistikcookies hjälper
                      oss förstå hur besökare interagerar med webbplatsen genom att samla in anonym information.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}