"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Scissors, Users, Calendar, Phone, X, Instagram, Facebook } from "lucide-react"
import Image from "next/image"

interface MobileNavigationProps {
  scrollToSection: (id: string) => void
}

export function MobileNavigation({ scrollToSection }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("home")
  const [isScrolling, setIsScrolling] = useState(false)

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Skip if we're in the middle of a programmatic scroll
      if (isScrolling) return

      const scrollPosition = window.scrollY + 100 // Offset for header

      // Get all sections
      const sections = [
        { id: "home", element: document.getElementById("hero") },
        { id: "om-oss", element: document.getElementById("om-oss") },
        { id: "vara-verk", element: document.getElementById("vara-verk") },
        { id: "barberare", element: document.getElementById("barberare") },
        { id: "tjanster", element: document.getElementById("tjanster") },
        { id: "kontakt", element: document.getElementById("kontakt") },
      ]

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const offsetTop = section.element.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolling])

  const handleNavigation = (id: string) => {
    // Set scrolling flag to prevent interference from scroll event listeners
    setIsScrolling(true)

    scrollToSection(id)
    setIsOpen(false)

    // Reset scrolling flag after animation completes
    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-800 z-50 lg:hidden">
        <div className="flex justify-around items-center h-20 md:h-16">
          <button
            onClick={() => handleNavigation("hero")}
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${
              activeSection === "home" ? "text-amber-500" : "text-stone-400"
            }`}
          >
            <Home className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-sm md:text-xs mt-1">Hem</span>
          </button>
          <button
            onClick={() => handleNavigation("vara-verk")}
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${
              activeSection === "vara-verk" ? "text-amber-500" : "text-stone-400"
            }`}
          >
            <Scissors className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-sm md:text-xs mt-1">Verk</span>
          </button>
          <button
            onClick={() => handleNavigation("barberare")}
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${
              activeSection === "barberare" ? "text-amber-500" : "text-stone-400"
            }`}
          >
            <Users className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-sm md:text-xs mt-1">Team</span>
          </button>
          <button
            onClick={() => handleNavigation("tjanster")}
            className={`flex flex-col items-center justify-center w-1/5 py-2 ${
              activeSection === "tjanster" ? "text-amber-500" : "text-stone-400"
            }`}
          >
            <Calendar className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-sm md:text-xs mt-1">Boka</span>
          </button>
          <a href="tel:+46367779997" className="w-1/5">
            <button
              className={`flex flex-col items-center justify-center w-full py-2 ${
                activeSection === "kontakt" ? "text-amber-500" : "text-stone-400"
              }`}
            >
              <Phone className="h-6 w-6 md:h-5 md:w-5" />
              <span className="text-sm md:text-xs mt-1">Kontakt</span>
            </button>
          </a>
        </div>
      </div>

      {/* Floating Action Button for Booking */}
      <div className="fixed bottom-20 right-4 z-50 lg:hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            onClick={() => handleNavigation("tjanster")}
            className="bg-amber-600 hover:bg-amber-500 text-white rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
          >
            <Calendar className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-stone-900 z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <Image src="/images/logo.png" alt="Viking Salong Logo" width={40} height={40} />
                <span className="text-xl font-bold">VIKING SALONG</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <nav className="flex flex-col gap-6">
                <button
                  onClick={() => handleNavigation("hero")}
                  className="flex items-center gap-4 py-3 border-b border-stone-800"
                >
                  <Home className="h-6 w-6 text-amber-500" />
                  <span className="text-xl">Hem</span>
                </button>
                <button
                  onClick={() => handleNavigation("om-oss")}
                  className="flex items-center gap-4 py-3 border-b border-stone-800"
                >
                  <Home className="h-6 w-6 text-amber-500" />
                  <span className="text-xl">Om Oss</span>
                </button>
                <button
                  onClick={() => handleNavigation("vara-verk")}
                  className="flex items-center gap-4 py-3 border-b border-stone-800"
                >
                  <Scissors className="h-6 w-6 text-amber-500" />
                  <span className="text-xl">Våra Verk</span>
                </button>
                <button
                  onClick={() => handleNavigation("barberare")}
                  className="flex items-center gap-4 py-3 border-b border-stone-800"
                >
                  <Users className="h-6 w-6 text-amber-500" />
                  <span className="text-xl">Barberare</span>
                </button>
                <button
                  onClick={() => handleNavigation("tjanster")}
                  className="flex items-center gap-4 py-3 border-b border-stone-800"
                >
                  <Calendar className="h-6 w-6 text-amber-500" />
                  <span className="text-xl">Tjänster</span>
                </button>
                <button
                  onClick={() => handleNavigation("kontakt")}
                  className="flex items-center gap-4 py-3 border-b border-stone-800"
                >
                  <Phone className="h-6 w-6 text-amber-500" />
                  <span className="text-xl">Kontakt</span>
                </button>
              </nav>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Följ oss</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/vikingsalong/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full border-stone-700">
                      <Instagram className="h-5 w-5" />
                    </Button>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61554619247503"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="rounded-full border-stone-700">
                      <Facebook className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Kontakta oss</h3>
                <p className="text-stone-300 mb-2">Trädgårdsgatan 25, 553 17 Jönköping</p>
                <p className="text-stone-300">036-777 99 97</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
