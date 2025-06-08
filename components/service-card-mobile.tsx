"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"
import { Scissors, Clock, Check, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface ServiceCardMobileProps {
  name: string
  price: string
  description?: string
  bookingUrl: string
  duration?: string
  popular?: boolean
}

export function ServiceCardMobile({ name, price, description, bookingUrl, duration, popular }: ServiceCardMobileProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleOpenBooking = () => {
    setIsBookingOpen(true)
  }

  const handleCloseBooking = () => {
    setIsBookingOpen(false)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <motion.div
        className={`bg-stone-800 rounded-xl shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden ${
          popular ? "ring-2 ring-amber-500" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-amber-600 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-[30%] translate-y-[-10%] shadow-md">
              POPULÄR
            </div>
          </div>
        )}

        <div className="p-4" onClick={toggleExpand}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-amber-600/20 p-1.5 rounded-lg">
                <Scissors className="h-4 w-4 text-amber-500" />
              </div>
              <h3 className="text-base font-bold">{name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-amber-500">{price}</span>
              <ChevronRight
                className={`h-5 w-5 text-stone-400 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
              />
            </div>
          </div>

          {duration && (
            <div className="flex items-center gap-2 mt-2 text-stone-400">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{duration}</span>
            </div>
          )}

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              {description && <p className="text-sm text-stone-300 mb-3">{description}</p>}

              <ul className="mb-4 space-y-1.5">
                <li className="flex items-center gap-2 text-stone-300">
                  <Check className="h-3 w-3 text-amber-500" />
                  <span className="text-xs">Professionell service</span>
                </li>
                <li className="flex items-center gap-2 text-stone-300">
                  <Check className="h-3 w-3 text-amber-500" />
                  <span className="text-xs">Erfarna barberare</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        <motion.div
          className={`px-4 pb-4 ${isExpanded ? "mt-0" : "mt-0"}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            className="bg-amber-600 hover:bg-amber-500 w-full transition-all duration-300 text-sm py-3"
            onClick={handleOpenBooking}
          >
            Boka tid
          </Button>
        </motion.div>
      </motion.div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        serviceName={name}
        bookingUrl={bookingUrl}
        price={price}
      />
    </>
  )
}
