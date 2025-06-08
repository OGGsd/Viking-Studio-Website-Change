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

  // Media queries for responsive design
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem("cookieConsent")

    // Only show the banner if no choice has been made yet
    if (!consentGiven) {
      // Small delay to not show immediately on page load
      const timer = setTimeout(
        () => {
          setShowConsent(true)
        },
        isMobile ? 2000 : 1500,
      )

      return () => clearTimeout(timer)
    }
  }, [isMobile])

  // Handle click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (consentRef.current && !consentRef.current.contains(event.target as Node)) {
        // Don't auto-dismiss on mobile - require explicit action
        if (!isMobile) {
          dismissConsent()
        }
      }
    }

    // Only add listener if consent is showing
    if (showConsent) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showConsent, isMobile])

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

  if (!showConsent) return null

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
          {/* Mobile Layout */}
          {isMobile && (
            <div className="mx-3 mb-20 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl p-4 backdrop-blur-sm bg-opacity-95">
              <div className="flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-600/20 p-1.5 rounded-full">
                      <Cookie className="h-4 w-4 text-amber-500" />
                    </div>
                    <h3 className="text-base font-medium">Cookies</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={dismissConsent}
                    className="h-7 w-7 rounded-full hover:bg-stone-800 -mt-1 -mr-1"
                    aria-label="Stäng"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-stone-300 mb-2">
                    Vi använder cookies för att förbättra din upplevelse på vår webbplats.
                  </p>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-stone-400 mt-2">
                          Nödvändiga cookies hjälper till att göra webbplatsen användbar genom att aktivera
                          grundläggande funktioner. Webbplatsen kan inte fungera korrekt utan dessa cookies.
                          Statistikcookies hjälper oss förstå hur besökare interagerar med webbplatsen genom att samla
                          in anonym information.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={toggleExpanded}
                    className="flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 mt-1 transition-colors"
                  >
                    <Info className="h-3 w-3" />
                    <span>{expanded ? "Visa mindre" : "Läs mer"}</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={acceptCookies}
                    className="bg-amber-600 hover:bg-amber-500 text-white text-xs flex-1 h-9"
                  >
                    Acceptera alla
                  </Button>
                  <Button
                    onClick={declineCookies}
                    variant="outline"
                    className="border-stone-700 hover:bg-stone-800 text-xs flex-1 h-9"
                  >
                    Endast nödvändiga
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tablet Layout */}
          {isTablet && !isMobile && (
            <div className="mx-6 mb-6 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl p-6 backdrop-blur-sm bg-opacity-95">
              <div className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-600/20 p-2 rounded-full">
                      <Cookie className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-medium">Vi använder cookies</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={dismissConsent}
                    className="h-8 w-8 rounded-full hover:bg-stone-800 -mt-1 -mr-1"
                    aria-label="Stäng"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mb-5">
                  <p className="text-sm text-stone-300 mb-2">
                    Vi använder cookies för att förbättra din upplevelse på vår webbplats. Genom att fortsätta använda
                    webbplatsen godkänner du användningen av cookies.
                  </p>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-stone-400 mt-2">
                          Nödvändiga cookies hjälper till att göra webbplatsen användbar genom att aktivera
                          grundläggande funktioner. Webbplatsen kan inte fungera korrekt utan dessa cookies.
                          Statistikcookies hjälper oss förstå hur besökare interagerar med webbplatsen genom att samla
                          in anonym information.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={toggleExpanded}
                    className="flex items-center gap-1 text-sm text-amber-500 hover:text-amber-400 mt-2 transition-colors"
                  >
                    <Info className="h-3.5 w-3.5" />
                    <span>{expanded ? "Visa mindre" : "Läs mer"}</span>
                  </button>
                </div>

                <div className="flex gap-3">
                  <Button onClick={acceptCookies} className="bg-amber-600 hover:bg-amber-500 text-white text-sm h-10">
                    Acceptera alla
                  </Button>
                  <Button
                    onClick={declineCookies}
                    variant="outline"
                    className="border-stone-700 hover:bg-stone-800 text-sm h-10"
                  >
                    Endast nödvändiga
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Layout */}
          {!isTablet && !isMobile && (
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
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
