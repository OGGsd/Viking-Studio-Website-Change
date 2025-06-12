"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Instagram, Facebook, MapPin, Phone, Clock, Menu, ChevronRight, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ServiceCard } from "@/components/service-card"
import { ServiceCardMobile } from "@/components/service-card-mobile"
import { ResponsiveContainer } from "@/components/responsive-container"
import { MobileNavigation } from "@/components/mobile-navigation"
import { CookieConsent } from "@/components/cookie-consent"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"
import { InstallAppButton } from "@/components/install-app-button"

// Importera den nya hooken högst upp i filen, efter de andra importerna
import { usePreventAutoScroll } from "@/hooks/use-prevent-auto-scroll"

// Dynamically import ReelsSection with no SSR to ensure it only runs on client
const DynamicReelsSection = dynamic(
  () => import("../components/reels-section").then((mod) => ({ default: mod.ReelsSection })),
  {
    ssr: false,
  },
)

// Video data with unique Vercel Blob Storage URLs and poster images
const videos = [
  {
    src: "https://kt5xwoxw7ivvaxql.public.blob.vercel-storage.com/AQMBPlMUNDAxufkqOuKv1frq8WmRGF_fFJgIVf0o42WB6R6BRfYy4nwWl2J3Y-llY5mnXum7UeFsAddxKlg9_-Da4_14VkLnVZfT-Rg-GRRsRonamv2LjX6rKPnc2lb6OFKcLv.mp4",
    poster: "/barber-haircut.png",
    title: "Herrklippning",
  },
  {
    src: "https://kt5xwoxw7ivvaxql.public.blob.vercel-storage.com/AQMHHG8Ef7TNZCZzYOneLpBH_CguvjHArpOqMa_7OEocG21NHiyKIk_4yVAYKxscmtRIjE5K2LOOo8GB1FPFurDC1-D0LETwuktsBuU-NXWZOVYSeKVGucA4bESErNwp7DvUDn.mp4",
    poster: "/beard-trim.png",
    title: "Skäggklippning",
  },
  {
    src: "https://kt5xwoxw7ivvaxql.public.blob.vercel-storage.com/AQMzBas-RcU9rU0x9ayJPMZ4GDmZvEIZy1NtWnaLzF5P3BLsXjnS3_cRC-v4R8uz0Z3xDlEzHERXXIuPUdE0z-hx-vGoCst9x4PoyZuV9oVcVGUGvCEd0dt.mp4",
    poster: "/diverse-hair-styling.png",
    title: "Styling",
  },
  {
    src: "https://kt5xwoxw7ivvaxql.public.blob.vercel-storage.com/AQN1S6SyFA1zPUUFYD9JrEqXKiaufX2jRYc_NtnsBeAZOlevZPuPd44MBoXjadWtxzEuCeU5IJ3hWbfmniZQhoxjV3quSOMka9DdlSM-YYjeRulPqzwCOUJ067j1qTshKAaSow.mp4",
    title: "Skäggtrimning",
  },
  {
    src: "https://kt5xwoxw7ivvaxql.public.blob.vercel-storage.com/AQNfKX0VDSuhKXWXO2pEuYjib5wlQN8KhHuWaugXCUnVYLReRysbqYUClvrHN8fT9OAmHrGdQpzqPdfis5HLuFIi3PQjJexRWlIQ5bs-ycevfAEoDRDwpfPuPs2ATjcCloRyej.mp4",
    title: "Fade-klippning",
  },
  {
    src: "https://kt5xwoxw7ivvaxql.public.blob.vercel-storage.com/AQPLwo09JyjAflVauXPINTA7OhRx65OCtneRT_-xSIHy6dv8VWtuI7xI__OwgykQ2qFrRYGLM400q-DG_FW4FJXb-RCoOvX5YBz4fWqMkZQ2L1Whbd42JJs.mp4",
    title: "Modern herrklippning",
  }
]

// Booking URLs for each service
const bookingUrls = {
  herrklippning: "https://api.leadconnectorhq.com/widget/booking/sMhSs45jTqvuU1i8Vtwp?user_id=j9AQvQTGUiNpsEQUkStS",
  pensionar: "https://api.leadconnectorhq.com/widget/booking/UsUhSPgitp8eKkF7KAaG",
  barn: "https://api.leadconnectorhq.com/widget/booking/aMSgRcmyvcuPxUxdYWCa",
  student: "https://api.leadconnectorhq.com/widget/booking/yciH8eaawHFYSyqHAqBp",
  snaggning: "https://api.leadconnectorhq.com/widget/booking/qclJbSCCD3JlN2zWvLqo",
  klippSkagg: "https://api.leadconnectorhq.com/widget/booking/JM6cQaotjxPoLF3yB7Zp",
  klippSkaggPensionar: "https://api.leadconnectorhq.com/widget/booking/oGX645SPeeI0Lox00Kdb",
  klippSkaggStudent: "https://api.leadconnectorhq.com/widget/booking/aM7MmhRcguf402m7n0BX",
  skaggRakning: "https://api.leadconnectorhq.com/widget/booking/CM06OMbK6hAYFVuK2R95",
  skaggKlippning: "https://api.leadconnectorhq.com/widget/booking/A58Tr1UChBAZKPQKj3iC",
}

export default function Home() {
  // State to track if the page has been hydrated
  const [isHydrated, setIsHydrated] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Media queries for responsive design
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")

  // Set hydrated state once component mounts
  useEffect(() => {
    setIsHydrated(true)

    // Add smooth scrolling to the entire page
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      // Clean up
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  // Improved scroll function with better handling
  const scrollToSection = (id: string) => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Prevent multiple scroll operations
    if (isScrolling) return

    setIsScrolling(true)

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    const element = document.getElementById(id)
    if (element) {
      // Get the header height to offset the scroll position
      const header = document.querySelector("header")
      const headerHeight = header ? header.getBoundingClientRect().height : 0

      // Calculate the element's position relative to the document
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

      // Additional offset for mobile to account for bottom navigation
      const mobileOffset = isMobile ? 60 : 0

      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        // Scroll to the element with offset for the header
        window.scrollTo({
          top: elementPosition - headerHeight - mobileOffset,
          behavior: "smooth",
        })

        // Reset scrolling state after animation completes
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 1000)
      })
    } else {
      // If element not found, reset scrolling state
      setIsScrolling(false)
    }
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Lägg till följande rad i Home-komponenten, direkt efter de andra useEffect-anropen
  usePreventAutoScroll()

  return (
    <>
      <div className="min-h-screen bg-stone-900 text-stone-100 pb-16 md:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800">
          <ResponsiveContainer className="flex items-center justify-between py-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2"
            >
              <Image
                src="/images/viking-logo.jpeg"
                alt="Viking Salong Logo"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full"
              />
              <span className="text-xl font-bold hidden sm:block">VIKING SALONG</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#om-oss"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("om-oss")
                }}
                className="hover:text-amber-400 transition-colors duration-300 relative group"
              >
                Hem
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#vara-verk"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("vara-verk")
                }}
                className="hover:text-amber-400 transition-colors duration-300 relative group"
              >
                Våra Verk
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#barberare"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("barberare")
                }}
                className="hover:text-amber-400 transition-colors duration-300 relative group"
              >
                Barberare
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#tjanster"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("tjanster")
                }}
                className="hover:text-amber-400 transition-colors duration-300 relative group"
              >
                Tjänster
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("kontakt")
                }}
                className="hover:text-amber-400 transition-colors duration-300 relative group"
              >
                Kontakt
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Button
                className="bg-amber-600 hover:bg-amber-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/20"
                onClick={() => scrollToSection("tjanster")}
              >
                Boka nu
              </Button>
            </nav>

            {/* Mobile Navigation Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Öppna meny</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-stone-900 text-stone-100 border-stone-800">
                <nav className="flex flex-col gap-4 mt-8">
                  <a
                    href="#om-oss"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("om-oss")
                    }}
                    className="text-lg hover:text-amber-400 transition py-2 flex items-center justify-between"
                  >
                    Hem
                    <ChevronRight className="h-5 w-5 text-amber-500" />
                  </a>
                  <a
                    href="#vara-verk"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("vara-verk")
                    }}
                    className="text-lg hover:text-amber-400 transition py-2 flex items-center justify-between"
                  >
                    Våra Verk
                    <ChevronRight className="h-5 w-5 text-amber-500" />
                  </a>
                  <a
                    href="#barberare"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("barberare")
                    }}
                    className="text-lg hover:text-amber-400 transition py-2 flex items-center justify-between"
                  >
                    Barberare
                    <ChevronRight className="h-5 w-5 text-amber-500" />
                  </a>
                  <a
                    href="#tjanster"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("tjanster")
                    }}
                    className="text-lg hover:text-amber-400 transition py-2 flex items-center justify-between"
                  >
                    Tjänster
                    <ChevronRight className="h-5 w-5 text-amber-500" />
                  </a>
                  <a
                    href="#kontakt"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("kontakt")
                    }}
                    className="text-lg hover:text-amber-400 transition py-2 flex items-center justify-between"
                  >
                    Kontakt
                    <ChevronRight className="h-5 w-5 text-amber-500" />
                  </a>
                  <Button
                    className="bg-amber-600 hover:bg-amber-500 text-white mt-4"
                    onClick={() => {
                      scrollToSection("tjanster")
                    }}
                  >
                    Boka nu
                  </Button>
                </nav>
                <div className="flex gap-4 mt-8">
                  <a href="https://www.instagram.com/vikingsalong/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full border-stone-700 hover:bg-stone-800">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61554619247503"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="rounded-full border-stone-700 hover:bg-stone-800">
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </ResponsiveContainer>
        </header>

        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-[80vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-background.png"
              alt="Viking Salong Barberare"
              fill
              className="object-cover brightness-40 scale-105 transform transition-transform duration-10000 animate-slow-zoom"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/40 to-stone-900"></div>
          </div>
          <ResponsiveContainer className="z-10 text-center">
            <div className="animate-fade-in-up">
              <Image
                src="/images/viking-logo.jpeg"
                alt="Viking Salong Logo"
                width={isMobile ? 120 : 180}
                height={isMobile ? 120 : 180}
                className="mx-auto mb-6 md:mb-8 drop-shadow-2xl rounded-full"
              />
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight text-white drop-shadow-lg">
                VIKING SALONG
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto text-stone-200 px-4">
                Professionell herrfrisör i Jönköping med verklig erfarenhet
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Button
                  className="bg-amber-600 hover:bg-amber-500 text-white text-base md:text-lg py-5 md:py-7 px-6 md:px-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-600/20 flex items-center gap-2"
                  onClick={() => scrollToSection("tjanster")}
                >
                  <Calendar className="h-5 w-5" />
                  Boka nu
                </Button>
                <a href="tel:+46367779997">
                  <Button
                    variant="outline"
                    className="border-white hover:bg-white/10 text-base md:text-lg py-5 md:py-7 px-6 md:px-8 rounded-lg transition-all duration-300"
                  >
                    <Phone className="mr-2 h-5 w-5" /> Ring Oss
                  </Button>
                </a>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* About Us Section */}
        <section id="om-oss" className="py-16 md:py-24 bg-stone-800 relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-900 to-transparent"></div>
          <ResponsiveContainer>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                VÄLKOMMEN TILL VIKING SALONG
              </h2>
              <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto"></div>
            </div>
            <div className="max-w-3xl mx-auto text-center px-4">
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed text-stone-200">
                På Viking Salong erbjuder vi förstklassig service inom herrklippning och skäggvård. Med verklig
                erfarenhet i branschen garanterar vi att du får en professionell och personlig upplevelse varje gång du
                besöker oss.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-stone-200">
                Vårt team av erfarna barberare är dedikerade till att skapa den perfekta stilen för dig. Vi kombinerar
                traditionella tekniker med moderna trender för att ge dig den bästa möjliga upplevelsen.
              </p>
              <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-stone-700 rounded-lg">
                  <Star className="h-4 md:h-5 w-4 md:w-5 text-amber-500" />
                  <span className="font-bold text-sm md:text-base">Kvalitet</span>
                </div>
                <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-stone-700 rounded-lg">
                  <Star className="h-4 md:h-5 w-4 md:w-5 text-amber-500" />
                  <span className="font-bold text-sm md:text-base">Erfarenhet</span>
                </div>
                <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-stone-700 rounded-lg">
                  <Star className="h-4 md:h-5 w-4 md:w-5 text-amber-500" />
                  <span className="font-bold text-sm md:text-base">Service</span>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Video Reels Section */}
        <section id="vara-verk" className="relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-800 to-transparent z-10"></div>
          <div className="text-center pt-16 md:pt-24 pb-6 md:pb-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">VÅRA VERK</h2>
            <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto"></div>
            <p className="text-base sm:text-lg md:text-xl mt-4 md:mt-6 max-w-2xl mx-auto text-stone-200 px-4">
              Bläddra genom våra senaste arbeten och se vår expertis i aktion. Svep upp eller ner för att se fler
              videos.
            </p>
          </div>
          {isHydrated && <DynamicReelsSection videos={videos} />}
        </section>

        {/* Barbers Section */}
        <section id="barberare" className="py-16 md:py-24 relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-900 to-transparent"></div>
          <ResponsiveContainer>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">VÅRA BARBERARE</h2>
              <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto"></div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {/* Fadi */}
              <div className="bg-stone-800 rounded-xl overflow-hidden shadow-xl hover:shadow-amber-600/10 transition-all duration-300 hover:-translate-y-2">
                <div className="h-60 sm:h-72 md:h-80 bg-stone-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/fadi.png"
                    alt="Fadi - Barberare på Viking Salong"
                    width={400}
                    height={400}
                    className="object-cover h-full w-full object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Fadi</h3>
                  <p className="text-amber-400 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    <span>Frisör</span>
                  </p>
                  <p className="mb-4 md:mb-6 text-stone-300 text-sm md:text-base leading-relaxed">
                    Hej, jag är Fadi – din dedikerade barberare och frisör med över 30 års branscherfarenhet. Varje
                    klippning är för mig en chans att skapa något unikt och personligt för dig. Mitt mål är att inte
                    bara klippa hår, utan att skapa förtroende och glädje hos varje kund jag möter.
                  </p>
                  <Button
                    className="w-full bg-stone-700 hover:bg-amber-600 transition-colors duration-300 py-2 md:py-3"
                    onClick={() => {
                      scrollToSection("tjanster")
                    }}
                  >
                    Boka tid med Fadi
                  </Button>
                </div>
              </div>

              {/* Hazem */}
              <div className="bg-stone-800 rounded-xl overflow-hidden shadow-xl hover:shadow-amber-600/10 transition-all duration-300 hover:-translate-y-2">
                <div className="h-60 sm:h-72 md:h-80 bg-stone-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/hazem.png"
                    alt="Hazem - Barberare på Viking Salong"
                    width={400}
                    height={400}
                    className="object-cover h-full w-full object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Hazem</h3>
                  <p className="text-amber-400 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    <span>Frisör</span>
                  </p>
                  <p className="mb-4 md:mb-6 text-stone-300 text-sm md:text-base leading-relaxed">
                    Hej alla! Jag är Hazem och har jobbat som frisör i 5 år. Det bästa med mitt jobb är inte bara att
                    skapa fantastiska frisyrer, utan möjligheten att möta och lära känna er! Resultatet av mitt arbete
                    är något som jag är stolt över – att se glädjen i varje leende efter att ha skapat deras frisyr är
                    en känsla som är svårslagen. Ser fram emot att träffa dig ⭐️
                  </p>
                  <Button
                    className="w-full bg-stone-700 hover:bg-amber-600 transition-colors duration-300 py-2 md:py-3"
                    onClick={() => {
                      scrollToSection("tjanster")
                    }}
                  >
                    Boka tid med Hazem
                  </Button>
                </div>
              </div>

              {/* Alaa */}
              <div className="bg-stone-800 rounded-xl overflow-hidden shadow-xl hover:shadow-amber-600/10 transition-all duration-300 hover:-translate-y-2 sm:col-span-2 md:col-span-1">
                <div className="h-60 sm:h-72 md:h-80 bg-stone-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/alaa.png"
                    alt="Alaa - Barberare på Viking Salong"
                    width={400}
                    height={400}
                    className="object-cover h-full w-full object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Alaa</h3>
                  <p className="text-amber-400 mb-3 md:mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    <span>Frisör</span>
                  </p>
                  <p className="mb-4 md:mb-6 text-stone-300 text-sm md:text-base leading-relaxed">
                    Hej! Alaa heter jag, en frisör med över 22 års erfarenhet i branschen.💈Att skapa fantastiska
                    frisyrer är mitt sätt att skulptera konst. 👨‍🎨 Det bästa med mitt jobb är att se mina kunders
                    leenden när de kliver ut med en ny stil som verkligen passar dem. Jag är lyhörd och ger allt för att
                    kunna skapa en stil som är unik för dig.
                  </p>
                  <Button
                    className="w-full bg-stone-700 hover:bg-amber-600 transition-colors duration-300 py-2 md:py-3"
                    onClick={() => {
                      scrollToSection("tjanster")
                    }}
                  >
                    Boka tid med Alaa
                  </Button>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Services Section */}
        <section id="tjanster" className="py-16 md:py-24 bg-stone-800 relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-900 to-transparent"></div>
          <ResponsiveContainer>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">VÅRA TJÄNSTER</h2>
              <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto mb-10 md:mb-16">
              <div className="bg-stone-900 rounded-xl overflow-hidden shadow-xl">
                <div className="p-4 md:p-8 text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 uppercase tracking-wider">Prislista</h3>

                  <div className="mb-8 md:mb-10">
                    <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 border-b border-amber-600 pb-2 uppercase tracking-wider">
                      Herrklippning
                    </h4>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 text-sm md:text-base">
                      <div className="text-left">Herrklippning</div>
                      <div className="text-right font-bold text-amber-500">280:-</div>

                      <div className="text-left">Pensionär</div>
                      <div className="text-right font-bold text-amber-500">230:-</div>

                      <div className="text-left">Barn</div>
                      <div className="text-right font-bold text-amber-500">230:-</div>

                      <div className="text-left">Student</div>
                      <div className="text-right font-bold text-amber-500">230:-</div>

                      <div className="text-left">Snaggning</div>
                      <div className="text-right font-bold text-amber-500">140:-</div>

                      <div className="text-left">Klipp + Skägg</div>
                      <div className="text-right font-bold text-amber-500">400:-</div>

                      <div className="text-left">Klipp + Skägg Pensionär</div>
                      <div className="text-right font-bold text-amber-500">350:-</div>

                      <div className="text-left">Klipp + Skägg Student</div>
                      <div className="text-right font-bold text-amber-500">350:-</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 border-b border-amber-600 pb-2 uppercase tracking-wider">
                      Skägg
                    </h4>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 text-sm md:text-base">
                      <div className="text-left">Rakning med kniv</div>
                      <div className="text-right font-bold text-amber-500">170:-</div>

                      <div className="text-left">Maskin klippning</div>
                      <div className="text-right font-bold text-amber-500">100:-</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop/Tablet Service Cards */}
            <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* 1. Herrklippning */}
              <ServiceCard
                name="Herrklippning"
                price="280:-"
                description="Professionell klippning anpassad efter dina önskemål och ansiktsform. Inkluderar tvätt och styling."
                bookingUrl={bookingUrls.herrklippning}
                duration="30 min"
                popular={true}
              />

              {/* 2. Pensionär */}
              <ServiceCard
                name="Pensionär"
                price="230:-"
                description="Specialpris för pensionärer. Inkluderar klippning och styling."
                bookingUrl={bookingUrls.pensionar}
                duration="30 min"
              />

              {/* 3. Barn */}
              <ServiceCard
                name="Barn Klippning"
                price="230:-"
                description="Klippning för barn. Anpassad för att göra upplevelsen rolig och bekväm."
                bookingUrl={bookingUrls.barn}
                duration="25 min"
              />

              {/* 4. Student */}
              <ServiceCard
                name="Student"
                price="230:-"
                description="Specialpris för studenter. Glöm inte att ta med studentlegitimation."
                bookingUrl={bookingUrls.student}
                duration="30 min"
              />

              {/* 5. Snaggning */}
              <ServiceCard
                name="Snaggning"
                price="140:-"
                description="Enkel och snabb klippning med maskin i en längd över hela huvudet."
                bookingUrl={bookingUrls.snaggning}
                duration="15 min"
              />

              {/* 6. Klipp + Skägg */}
              <ServiceCard
                name="Klipp + Skägg"
                price="400:-"
                description="Både hår- och skäggklippning i ett paket. Perfekt för dig som vill ha en komplett uppfräschning."
                bookingUrl={bookingUrls.klippSkagg}
                duration="45 min"
                popular={true}
              />

              {/* 7. Klipp + Skägg Pensionär */}
              <ServiceCard
                name="Klipp + Skägg Pensionär"
                price="350:-"
                description="Kombinerad hår- och skäggklippning till specialpris för pensionärer."
                bookingUrl={bookingUrls.klippSkaggPensionar}
                duration="45 min"
              />

              {/* 8. Klipp + Skägg Student */}
              <ServiceCard
                name="Klipp + Skägg Student"
                price="350:-"
                description="Kombinerad hår- och skäggklippning till specialpris för studenter."
                bookingUrl={bookingUrls.klippSkaggStudent}
                duration="45 min"
              />

              {/* 9. Skägg Rakning */}
              <ServiceCard
                name="Skägg Rakning"
                price="170:-"
                description="Professionell rakning av skägg med kniv för en slät och ren finish."
                bookingUrl={bookingUrls.skaggRakning}
                duration="20 min"
              />

              {/* 10. Skägg Klippning */}
              <ServiceCard
                name="Skägg Klippning"
                price="100:-"
                description="Trimning och formning av skägg med maskin för att uppnå önskad stil."
                bookingUrl={bookingUrls.skaggKlippning}
                duration="15 min"
              />
            </div>

            {/* Mobile Service Cards */}
            <div className="sm:hidden space-y-3 px-2">
              {/* 1. Herrklippning */}
              <ServiceCardMobile
                name="Herrklippning"
                price="280:-"
                description="Professionell klippning anpassad efter dina önskemål och ansiktsform. Inkluderar tvätt och styling."
                bookingUrl={bookingUrls.herrklippning}
                duration="30 min"
                popular={true}
              />

              {/* 2. Pensionär */}
              <ServiceCardMobile
                name="Pensionär"
                price="230:-"
                description="Specialpris för pensionärer. Inkluderar klippning och styling."
                bookingUrl={bookingUrls.pensionar}
                duration="30 min"
              />

              {/* 3. Barn */}
              <ServiceCardMobile
                name="Barn Klippning"
                price="230:-"
                description="Klippning för barn. Anpassad för att göra upplevelsen rolig och bekväm."
                bookingUrl={bookingUrls.barn}
                duration="25 min"
              />

              {/* 4. Student */}
              <ServiceCardMobile
                name="Student"
                price="230:-"
                description="Specialpris för studenter. Glöm inte att ta med studentlegitimation."
                bookingUrl={bookingUrls.student}
                duration="30 min"
              />

              {/* 5. Snaggning */}
              <ServiceCardMobile
                name="Snaggning"
                price="140:-"
                description="Enkel och snabb klippning med maskin i en längd över hela huvudet."
                bookingUrl={bookingUrls.snaggning}
                duration="15 min"
              />

              {/* 6. Klipp + Skägg */}
              <ServiceCardMobile
                name="Klipp + Skägg"
                price="400:-"
                description="Både hår- och skäggklippning i ett paket. Perfekt för dig som vill ha en komplett uppfräschning."
                bookingUrl={bookingUrls.klippSkagg}
                duration="45 min"
                popular={true}
              />

              {/* 7. Klipp + Skägg Pensionär */}
              <ServiceCardMobile
                name="Klipp + Skägg Pensionär"
                price="350:-"
                description="Kombinerad hår- och skäggklippning till specialpris för pensionärer."
                bookingUrl={bookingUrls.klippSkaggPensionar}
                duration="45 min"
              />

              {/* 8. Klipp + Skägg Student */}
              <ServiceCardMobile
                name="Klipp + Skägg Student"
                price="350:-"
                description="Kombinerad hår- och skäggklippning till specialpris för studenter."
                bookingUrl={bookingUrls.klippSkaggStudent}
                duration="45 min"
              />

              {/* 9. Skägg Rakning */}
              <ServiceCardMobile
                name="Skägg Rakning"
                price="170:-"
                description="Professionell rakning av skägg med kniv för en slät och ren finish."
                bookingUrl={bookingUrls.skaggRakning}
                duration="20 min"
              />

              {/* 10. Skägg Klippning */}
              <ServiceCardMobile
                name="Skägg Klippning"
                price="100:-"
                description="Trimning och formning av skägg med maskin för att uppnå önskad stil."
                bookingUrl={bookingUrls.skaggKlippning}
                duration="15 min"
              />
            </div>
          </ResponsiveContainer>
        </section>

        {/* Opening Hours & Contact Section */}
        <section id="kontakt" className="py-16 md:py-24 relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-800 to-transparent"></div>
          <ResponsiveContainer>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              {/* Opening Hours */}
              <div className="bg-stone-800 p-6 md:p-10 rounded-xl shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight">ÖPPETTIDER</h2>
                <div className="w-16 md:w-24 h-1 bg-amber-600 mb-6 md:mb-8"></div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-stone-700">
                    <span className="font-medium text-base md:text-lg">Måndag</span>
                    <span className="text-amber-400 font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-stone-700">
                    <span className="font-medium text-base md:text-lg">Tisdag</span>
                    <span className="text-amber-400 font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-stone-700">
                    <span className="font-medium text-base md:text-lg">Onsdag</span>
                    <span className="text-amber-400 font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-stone-700">
                    <span className="font-medium text-base md:text-lg">Torsdag</span>
                    <span className="text-amber-400 font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-stone-700">
                    <span className="font-medium text-base md:text-lg">Fredag</span>
                    <span className="text-amber-400 font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-stone-700">
                    <span className="font-medium text-base md:text-lg">Lördag</span>
                    <span className="text-amber-400 font-medium">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-stone-700">
                    <span className="font-medium text-base md:text-lg">Söndag</span>
                    <span>Stängt</span>
                  </div>
                </div>

                <div className="mt-6 md:mt-8">
                  <p className="text-xs md:text-sm text-stone-400">
                    * Öppettiderna kan variera under helgdagar. Vänligen ring för att bekräfta.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-stone-800 p-6 md:p-10 rounded-xl shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight">KONTAKTA OSS</h2>
                <div className="w-16 md:w-24 h-1 bg-amber-600 mb-6 md:mb-8"></div>

                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="bg-amber-600 p-2 md:p-3 rounded-lg">
                      <MapPin className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl mb-1 md:mb-2">Adress</h3>
                      <p className="text-stone-300 text-base md:text-lg">Trädgårdsgatan 25, 553 17 Jönköping</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="bg-amber-600 p-2 md:p-3 rounded-lg">
                      <Phone className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl mb-1 md:mb-2">Telefon</h3>
                      <p className="text-stone-300 text-base md:text-lg">036-777 99 97</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="bg-amber-600 p-2 md:p-3 rounded-lg">
                      <Clock className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl mb-1 md:mb-2">Öppettider</h3>
                      <p className="text-stone-300 text-sm md:text-base">Måndag - Fredag: 09:00 - 18:00</p>
                      <p className="text-stone-300 text-sm md:text-base">Lördag: 10:00 - 14:00</p>
                      <p className="text-stone-300 text-sm md:text-base">Söndag: Stängt</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 md:mt-10 flex gap-4">
                  <a href="https://www.instagram.com/vikingsalong/" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-stone-700 hover:bg-stone-700 hover:border-amber-500 transition-colors duration-300 h-10 w-10 md:h-12 md:w-12"
                    >
                      <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61554619247503"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-stone-700 hover:bg-stone-700 hover:border-amber-500 transition-colors duration-300 h-10 w-10 md:h-12 md:w-12"
                    >
                      <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Map Section */}
        <section className="h-[300px] md:h-[500px] relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-stone-900 to-transparent z-10"></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1088.0518736347!2d14.160388300000001!3d57.7816962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465a6de97da071d5%3A0xd4e4f5a079ac67d9!2sViking%20salong!5e0!3m2!1ssv!2sse!4v1714598000000!5m2!1ssv!2sse"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Viking Salong på Google Maps"
            aria-label="Karta till Viking Salong på Trädgårdsgatan 25 i Jönköping"
          ></iframe>
        </section>

        {/* Footer */}
        <footer className="bg-stone-900 py-8 md:py-12 border-t border-stone-800">
          <ResponsiveContainer>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-0">
                <Image
                  src="/images/viking-logo.jpeg"
                  alt="Viking Salong Logo"
                  width={50}
                  height={50}
                  className="h-10 md:h-14 w-auto"
                />
                <div>
                  <h3 className="font-bold text-lg md:text-xl">VIKING SALONG</h3>
                  <p className="text-stone-400 text-xs md:text-sm">Professionell herrfrisör i Jönköping</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-6 md:mb-0">
                <a
                  href="#om-oss"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("om-oss")
                  }}
                  className="hover:text-amber-400 transition text-center md:text-left text-sm md:text-base"
                >
                  Hem
                </a>
                <a
                  href="#vara-verk"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("vara-verk")
                  }}
                  className="hover:text-amber-400 transition text-center md:text-left text-sm md:text-base"
                >
                  Våra Verk
                </a>
                <a
                  href="#barberare"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("barberare")
                  }}
                  className="hover:text-amber-400 transition text-center md:text-left text-sm md:text-base"
                >
                  Barberare
                </a>
                <a
                  href="#tjanster"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("tjanster")
                  }}
                  className="hover:text-amber-400 transition text-center md:text-left text-sm md:text-base"
                >
                  Tjänster
                </a>
                <a
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("kontakt")
                  }}
                  className="hover:text-amber-400 transition text-center md:text-left text-sm md:text-base"
                >
                  Kontakt
                </a>
                <InstallAppButton
                  className="hover:text-amber-400 transition text-center md:text-left text-sm md:text-base"
                  variant="link"
                />
              </div>

              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="https://www.instagram.com/vikingsalong/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-stone-700 hover:bg-stone-700 hover:border-amber-500 transition-colors duration-300 h-10 w-10 md:h-12 md:w-12"
                  >
                    <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61554619247503"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-stone-700 hover:bg-stone-700 hover:border-amber-500 transition-colors duration-300 h-10 w-10 md:h-12 md:w-12"
                  >
                    <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 md:pt-8 border-t border-stone-800 text-center text-stone-400 text-xs md:text-sm">
              <p>&copy; {new Date().getFullYear()} Viking Salong. Alla rättigheter förbehållna.</p>
            </div>
          </ResponsiveContainer>
        </footer>

        {/* Mobile Navigation */}
        {isHydrated && <MobileNavigation scrollToSection={scrollToSection} />}

        {/* Cookie Consent Banner */}
        {isHydrated && <CookieConsent />}

        {/* PWA Install Prompt - Automatic timer version */}
        {isHydrated && (
          <PWAInstallPrompt
            manuallyTriggered={false}
            key="auto-pwa-prompt" // Lägg till en unik nyckel för att säkerställa korrekt rendering
          />
        )}
      </div>
    </>
  )
}