"use client"
import { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
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
  const [bookingStep, setBookingStep] = useState<"loading" | "booking">("loading")
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
    setBookingStep("loading")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent
        className={`sm:max-w-[900px] max-h-[90vh] overflow-hidden bg-stone-900 border-stone-700 rounded-xl p-0 ${
          isMobile ? "w-[calc(100%-16px)] mx-auto" : ""
        }`}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Boka tid för {serviceName}</DialogTitle>
          <DialogDescription>
            Boka din tid för {serviceName} till priset {price}
          </DialogDescription>
        </DialogHeader>

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
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold">
                    Boka {serviceName}
                  </h2>
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

                <div className="relative w-full h-[600px] md:h-[700px] bg-white rounded-lg overflow-hidden">
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
                      <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
                    </div>
                  )}
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/CcVkF1JcMj1eb6eEUFkk"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    onLoad={handleIframeLoad}
                    className="w-full h-full"
                    title={`Boka ${serviceName}`}
                    allow="camera; microphone; geolocation"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}