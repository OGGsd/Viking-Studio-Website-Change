"use client"
import { useState, useEffect } from "react"
import { X, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  serviceName: string
  bookingUrl: string
  price: string
}

export function BookingModal({ isOpen, onClose, serviceName, bookingUrl, price }: BookingModalProps) {
  const [bookingStep, setBookingStep] = useState<"loading" | "booking" | "confirmation">("loading")
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Media queries for responsive design
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setBookingStep("loading")
      setIframeLoaded(false)
    }
  }, [isOpen])

  // Simulate iframe loading
  useEffect(() => {
    if (isOpen && bookingStep === "loading") {
      const timer = setTimeout(() => {
        setBookingStep("booking")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, bookingStep])

  const handleIframeLoad = () => {
    setIframeLoaded(true)
  }

  const handleCloseModal = () => {
    if (bookingStep === "confirmation") {
      // Reset state before closing
      setBookingStep("loading")
      setSelectedBarber(null)
    }
    onClose()
  }

  // For demo purposes - in a real app this would be triggered by the booking system
  const simulateBookingComplete = () => {
    setBookingStep("confirmation")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent
        className={`sm:max-w-[650px] max-h-[90vh] overflow-hidden bg-stone-900 border-stone-700 rounded-xl p-0 ${
          isMobile ? "w-[calc(100%-16px)] mx-auto" : ""
        }`}
        aria-describedby="booking-description"
      >
        <AnimatePresence mode="wait">
          {bookingStep === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-[400px] md:h-[500px]"
            >
              <Loader2 className="h-10 md:h-12 w-10 md:w-12 text-amber-500 animate-spin mb-4" />
              <p className="text-base md:text-lg text-stone-300">Laddar bokningssystem...</p>
            </motion.div>
          )}

          {bookingStep === "booking" && (
            <motion.div key="booking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <DialogTitle className="text-xl md:text-2xl font-bold">
                    VIKING SALONG
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full hover:bg-stone-800 touch-target"
                    onClick={handleCloseModal}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Stäng</span>
                  </Button>
                </div>
              </DialogHeader>

              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 sm:py-6 text-base sm:text-lg font-bold touch-target"
                  onClick={() => window.location.href = `tel:0367779997`}
                >
                  <span className="text-base sm:text-lg mobile-text">Ring Oss</span>
                </Button>
              </div>
            </motion.div>
          )}

          {bookingStep === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-8 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-amber-600/20 p-4 md:p-6 rounded-full mb-4 md:mb-6"
              >
                <CheckCircle2 className="h-12 md:h-16 w-12 md:w-16 text-amber-500" />
              </motion.div>

              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Bokning bekräftad!</h2>
              <p className="text-stone-300 mb-4 md:mb-6 text-sm md:text-base">
                Din bokning av <span className="font-medium text-amber-500">{serviceName}</span> har registrerats. Vi
                ser fram emot att träffa dig!
              </p>

              <div className="bg-stone-800 p-3 md:p-4 rounded-lg mb-6 md:mb-8 w-full max-w-md text-sm md:text-base">
                <div className="flex justify-between mb-2">
                  <span className="text-stone-400">Tjänst:</span>
                  <span className="font-medium">{serviceName}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-stone-400">Pris:</span>
                  <span className="font-medium">{price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Datum:</span>
                  <span className="font-medium">{new Date().toLocaleDateString("sv-SE")}</span>
                </div>
              </div>

              <Button
                className="bg-amber-600 hover:bg-amber-500 w-full py-4 sm:py-6 text-base sm:text-lg font-medium touch-target"
                onClick={handleCloseModal}
              >
                <span className="text-base sm:text-lg mobile-text">Stäng</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
