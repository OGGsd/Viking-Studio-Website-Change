import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ArrowLeft, CheckCircle2, Mail, Calendar, Phone, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function BekraftelsePage() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-sm border-b border-stone-800">
        <ResponsiveContainer className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-stone-800"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Tillbaka</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Image
                src="/images/viking-logo.jpeg"
                alt="Viking Salong Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <span className="text-lg font-bold">VIKING SALONG</span>
            </div>
          </div>
        </ResponsiveContainer>
      </header>

      {/* Main Content */}
      <main className="py-8 md:py-16">
        <ResponsiveContainer>
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="bg-green-600/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                BOKNING BEKRÄFTAD!
              </h1>
              <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto">
                Tack för din bokning! Vi ser fram emot att träffa dig på Viking Salong.
              </p>
            </div>

            {/* Important Information */}
            <div className="bg-amber-600/20 border border-amber-600/30 rounded-xl p-6 md:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-amber-500" />
                <h2 className="text-xl md:text-2xl font-bold text-amber-400">Viktigt - Kontrollera din e-post!</h2>
              </div>
              <div className="space-y-4 text-stone-200">
                <p className="text-base md:text-lg">
                  En bekräftelse har skickats till din e-postadress med alla detaljer om din bokning.
                </p>
                <div className="bg-stone-800/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">📧 Glöm inte att kontrollera:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Din inkorg för bekräftelsemail</li>
                    <li>Skräppost/spam-mappen om du inte ser mailet</li>
                    <li>Alla mappar i din e-postklient</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Email Actions */}
            <div className="bg-stone-800 rounded-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-amber-500" />
                Hantera din bokning
              </h3>
              <div className="space-y-4 text-stone-300">
                <p className="text-base md:text-lg">
                  I bekräftelsemailet hittar du länkar för att:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-stone-700 p-4 rounded-lg text-center">
                    <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Spara i kalender</h4>
                    <p className="text-sm text-stone-400">Lägg till i din kalender</p>
                  </div>
                  <div className="bg-stone-700 p-4 rounded-lg text-center">
                    <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Ändra tid</h4>
                    <p className="text-sm text-stone-400">Boka om till annan tid</p>
                  </div>
                  <div className="bg-stone-700 p-4 rounded-lg text-center">
                    <ArrowLeft className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Avboka</h4>
                    <p className="text-sm text-stone-400">Avboka din tid</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-stone-800 rounded-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                <Phone className="h-6 w-6 text-amber-500" />
                Kontakta oss
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-amber-400">Har du frågor?</h4>
                  <p className="text-stone-300 mb-4">
                    Kontakta oss gärna om du har några frågor om din bokning eller våra tjänster.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-amber-500" />
                      <span>036-777 99 97</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-amber-500" />
                      <span>Trädgårdsgatan 25, 553 17 Jönköping</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-amber-400">Öppettider</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Måndag - Fredag:</span>
                      <span className="text-amber-400">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lördag:</span>
                      <span className="text-amber-400">10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Söndag:</span>
                      <span>Stängt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-stone-800 rounded-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6">Vad du kan förvänta dig</h3>
              <div className="grid md:grid-cols-2 gap-6 text-stone-300">
                <div>
                  <h4 className="font-semibold mb-3 text-amber-400">Före ditt besök</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Kom gärna 5 minuter före din bokade tid</li>
                    <li>• Ta med legitimation om du bookat studentpris</li>
                    <li>• Meddela oss om du behöver ändra eller avboka</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-amber-400">Under ditt besök</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Professionell service av erfarna barberare</li>
                    <li>• Konsultation för att hitta rätt stil för dig</li>
                    <li>• Kvalitetsprodukter och verktyg</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 text-lg w-full sm:w-auto">
                  Tillbaka till startsidan
                </Button>
              </Link>
              <a href="tel:+46367779997">
                <Button variant="outline" className="border-stone-700 hover:bg-stone-800 px-8 py-3 text-lg w-full sm:w-auto">
                  Ring oss
                </Button>
              </a>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
    </div>
  )
}