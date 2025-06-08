"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"
import { Scissors, Clock, Check } from "lucide-react"
import { motion } from "framer-motion"

interface ServiceCardProps {
  name: string
  price: string
  description?: string
  bookingUrl: string
  duration?: string
  popular?: boolean
}

export function ServiceCard({ name, price, description, bookingUrl, duration, popular }: ServiceCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleOpenBooking = () => {
    setIsBookingOpen(true)
  }

  const handleCloseBooking = () => {
    setIsBookingOpen(false)
  }

  return (
    <>
      <motion.div
        className={`bg-stone-800 p-8 rounded-xl shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden ${
          popular ? "ring-2 ring-amber-500" : ""
        }`}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-amber-600 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-[30%] translate-y-[-10%] shadow-md">
              POPULÄR
            </div>
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600/20 p-2 rounded-lg">
              <Scissors className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
          <span className="text-xl font-bold text-amber-500">{price}</span>
        </div>

        {description && <p className="text-stone-300 mb-4 flex-grow">{description}</p>}

        {duration && (
          <div className="flex items-center gap-2 mb-4 text-stone-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{duration}</span>
          </div>
        )}

        <ul className="mb-6 space-y-2">
          <li className="flex items-center gap-2 text-stone-300">
            <Check className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Professionell service</span>
          </li>
          <li className="flex items-center gap-2 text-stone-300">
            <Check className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Erfarna barberare</span>
          </li>
        </ul>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            className="bg-amber-600 hover:bg-amber-500 w-full mt-auto transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/20 font-medium text-base py-6"
            onClick={handleOpenBooking}
          >
            Boka tid nu
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
