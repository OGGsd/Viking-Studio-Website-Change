import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Mail, CheckCircle, AlertTriangle, Smartphone } from "lucide-react"
import Link from "next/link"

export default function IntegritetspolicyPage() {
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
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="bg-amber-600/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-10 w-10 text-amber-500" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                INTEGRITETSPOLICY
              </h1>
              <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto">
                Vi värnar om din integritet och är transparenta med hur vi hanterar dina personuppgifter
              </p>
              <p className="text-sm text-stone-400 mt-4">
                Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Introduction */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Inledning</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>
                    Denna integritetspolicy beskriver hur Viking Salong ("vi", "oss", "vår") samlar in, 
                    använder och skyddar dina personuppgifter när du använder vår webbplats, mobilapplikation 
                    och bokningssystem.
                  </p>
                  <p>
                    Vi är engagerade i att skydda din integritet och säkerställer att dina personuppgifter 
                    hanteras på ett säkert och ansvarsfullt sätt i enlighet med GDPR och svensk lagstiftning.
                  </p>
                  <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <span className="font-semibold text-amber-400">Viktigt</span>
                    </div>
                    <p className="text-sm">
                      Vi använder INGA spårningscookies eller tredjepartsanalys. All databehandling 
                      sker endast för att tillhandahålla våra tjänster.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Collection */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Vilka uppgifter vi samlar in</h2>
                </div>
                <div className="space-y-6 text-stone-300">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-amber-400">Bokningsuppgifter:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Fullständigt namn (obligatoriskt för bokning)</li>
                      <li>Telefonnummer (obligatoriskt för bokningsbekräftelser)</li>
                      <li>E-postadress (obligatoriskt för bokningsbekräftelser)</li>
                      <li>Valfritt meddelande (frivilligt)</li>
                      <li>Vald tjänst, datum och tid</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-amber-400">Teknisk information (minimal):</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Grundläggande enhetsidentifierare (endast för appfunktionalitet)</li>
                      <li>Sessionsdata (för att hålla dig inloggad under bokningsprocessen)</li>
                      <li>Funktionella cookies (endast för webbplatsens funktion)</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                    <h4 className="font-semibold text-red-400 mb-2">Vad vi INTE samlar in:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Spårningscookies eller analysdata</li>
                      <li>Reklam-ID eller marknadsföringsidentifierare</li>
                      <li>Platsdata (utöver vad du frivilligt anger)</li>
                      <li>Beteendedata för tredjepartsanalys</li>
                      <li>Sociala medier-integrationer som spårar dig</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Data */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Hur vi använder dina uppgifter</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>Vi använder dina personuppgifter ENDAST för följande ändamål:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-stone-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-400 mb-2">Primära ändamål:</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>Hantera och bekräfta dina bokningar</li>
                        <li>Skicka bokningsbekräftelser via e-post/SMS</li>
                        <li>Kontakta dig vid ändringar eller avbokningar</li>
                        <li>Tillhandahålla kundservice</li>
                      </ul>
                    </div>
                    <div className="bg-stone-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-400 mb-2">Tekniska ändamål:</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>Säkerställa webbplatsens funktionalitet</li>
                        <li>Förhindra bedrägerier och säkerhetshot</li>
                        <li>Följa juridiska krav</li>
                        <li>Hantera teknisk support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Booking System Details */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Bokningssystem och samtycke</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>
                    Vårt bokningssystem är fullt funktionellt och kräver ditt uttryckliga samtycke 
                    innan någon data behandlas.
                  </p>
                  <div className="bg-stone-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-400 mb-3">Bokningsprocessen:</h4>
                    <ol className="list-decimal pl-4 space-y-2 text-sm">
                      <li>Du väljer önskad tjänst, datum och tid</li>
                      <li>Du anger ditt fullständiga namn, telefonnummer och e-postadress</li>
                      <li>Du kan lämna ett valfritt meddelande</li>
                      <li>Du bekräftar din bokning genom att kryssa i samtyckesrutan</li>
                      <li>Du får en bekräftelse via e-post med möjlighet att ändra eller avboka</li>
                    </ol>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-400 mb-2">Samtyckestext i bokningssystemet:</h4>
                    <p className="text-sm italic">
                      "Jag bekräftar att jag vill ta emot innehåll från detta företag genom att använda 
                      den kontaktinformation jag anger, i enlighet med Viking Salongs integritetspolicy 
                      där mina personuppgifter hanteras ansvarsfullt enligt GDPR och svensk lagstiftning."
                    </p>
                  </div>
                </div>
              </section>

              {/* Apple App Store Compliance Notice - MOVED TO MIDDLE */}
              <section className="bg-blue-900/20 border border-blue-700 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-blue-400">Mobilapp och App Store-efterlevnad</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>
                    Vår mobilapplikation följer strikta integritetsstandarder och är godkänd av Apple App Store 
                    enligt deras riktlinjer för användarintegritet.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-stone-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">Ingen spårning (Guideline 5.1.2):</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>Inga spårningscookies används</li>
                        <li>Ingen data delas med tredje parter</li>
                        <li>App Tracking Transparency implementeras inte (ej nödvändigt)</li>
                        <li>Endast funktionella cookies för sessionshantering</li>
                      </ul>
                    </div>
                    <div className="bg-stone-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">Komplett bokningssystem (Guideline 2.1):</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>Fullt funktionellt inbäddat bokningssystem</li>
                        <li>Användare kan välja datum och tid</li>
                        <li>Komplett formulär för kontaktuppgifter</li>
                        <li>GDPR-kompatibel samtyckeshantering</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="font-semibold text-green-400">Apple-godkänd integritetspolicy</span>
                    </div>
                    <p className="text-sm">
                      Denna integritetspolicy har granskats och godkänts av Apple som en del av vår 
                      App Store-ansökan och uppfyller alla krav för användarintegritet.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Sharing */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Delning av uppgifter</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Vår policy:</h4>
                    <p className="text-sm">
                      Vi delar ALDRIG dina personuppgifter med tredje parter för marknadsföring, 
                      analys eller andra kommersiella ändamål.
                    </p>
                  </div>
                  <p>Vi delar endast dina personuppgifter i följande begränsade fall:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Med ditt uttryckliga skriftliga samtycke</li>
                    <li>För att uppfylla juridiska krav eller myndighetsförfrågningar</li>
                    <li>Med vårt bokningssystem (som är vårt eget system)</li>
                    <li>För att skydda våra rättigheter vid juridiska tvister</li>
                  </ul>
                  <p className="mt-4 text-sm bg-stone-700 p-3 rounded">
                    <strong>Viktigt:</strong> Vi använder inga tredjepartstjänster för analys, 
                    marknadsföring eller spårning. All databehandling sker internt.
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Cookies och teknologier</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Endast funktionella cookies:</h4>
                    <p className="text-sm">
                      Vi använder endast cookies som är nödvändiga för webbplatsens grundläggande funktion. 
                      Inga spårnings- eller analyscookies används.
                    </p>
                  </div>
                  <p>Våra funktionella cookies används för att:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Komma ihåg dina preferenser under sessionen</li>
                    <li>Hantera bokningsformuläret korrekt</li>
                    <li>Säkerställa webbplatsens säkerhet</li>
                    <li>Validera formulärdata</li>
                  </ul>
                  <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-red-400 mb-2">Vad vi INTE använder:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Google Analytics eller liknande spårningstjänster</li>
                      <li>Facebook Pixel eller sociala medier-spårning</li>
                      <li>Reklamcookies eller marknadsföringsspårning</li>
                      <li>Tredjepartscookies för analys</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Datasäkerhet</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>
                    Vi vidtar omfattande tekniska och organisatoriska säkerhetsåtgärder för att skydda 
                    dina personuppgifter mot obehörig åtkomst, förlust, förstörelse eller ändring.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-stone-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-400 mb-2">Tekniska åtgärder:</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>SSL/TLS-kryptering för all datatransmission</li>
                        <li>Säker datalagring med kryptering</li>
                        <li>Regelbundna säkerhetsuppdateringar</li>
                        <li>Brandväggar och intrångsskydd</li>
                      </ul>
                    </div>
                    <div className="bg-stone-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-400 mb-2">Organisatoriska åtgärder:</h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>Begränsad åtkomst till personuppgifter</li>
                        <li>Regelbundna säkerhetskontroller</li>
                        <li>Personalutbildning i datasäkerhet</li>
                        <li>Incidenthanteringsrutiner</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Dina rättigheter enligt GDPR</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>Du har följande rättigheter gällande dina personuppgifter:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-stone-700 p-3 rounded">
                        <h4 className="font-semibold text-amber-400 text-sm">Rätt till information</h4>
                        <p className="text-xs mt-1">Få information om hur vi behandlar dina uppgifter</p>
                      </div>
                      <div className="bg-stone-700 p-3 rounded">
                        <h4 className="font-semibold text-amber-400 text-sm">Rätt till åtkomst</h4>
                        <p className="text-xs mt-1">Begära en kopia av de uppgifter vi har om dig</p>
                      </div>
                      <div className="bg-stone-700 p-3 rounded">
                        <h4 className="font-semibold text-amber-400 text-sm">Rätt till rättelse</h4>
                        <p className="text-xs mt-1">Begära att felaktiga uppgifter korrigeras</p>
                      </div>
                      <div className="bg-stone-700 p-3 rounded">
                        <h4 className="font-semibold text-amber-400 text-sm">Rätt till radering</h4>
                        <p className="text-xs mt-1">Begära att dina uppgifter raderas</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-stone-700 p-3 rounded">
                        <h4 className="font-semibold text-amber-400 text-sm">Rätt till begränsning</h4>
                        <p className="text-xs mt-1">Begära att behandlingen av dina uppgifter begränsas</p>
                      </div>
                      <div className="bg-stone-700 p-3 rounded">
                        <h4 className="font-semibold text-amber-400 text-sm">Rätt till dataportabilitet</h4>
                        <p className="text-xs mt-1">Få dina uppgifter i ett strukturerat format</p>
                      </div>
                      <div className="bg-stone-700 p-3 rounded">
                        <h4 className="font-semibold text-amber-400 text-sm">Rätt att invända</h4>
                        <p className="text-xs mt-1">Invända mot behandling av dina uppgifter</p>
                      </div>
                      <div className="bg-stone-700 p-3 rounded">
                        <h4 className="font-semibold text-amber-400 text-sm">Rätt att återkalla samtycke</h4>
                        <p className="text-xs mt-1">Återkalla ditt samtycke när som helst</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Retention */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Lagringstid</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>
                    Vi behåller dina personuppgifter endast så länge det är nödvändigt för de ändamål 
                    som beskrivs i denna policy eller enligt vad som krävs enligt lag.
                  </p>
                  <div className="bg-stone-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-400 mb-3">Specifika lagringstider:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Bokningsuppgifter:</span>
                        <span className="text-amber-400">3 år efter senaste besök</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Kontaktuppgifter:</span>
                        <span className="text-amber-400">Tills du begär radering</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Funktionella cookies:</span>
                        <span className="text-amber-400">Sessionens slut</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Säkerhetsloggar:</span>
                        <span className="text-amber-400">6 månader</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Kontakta oss</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>
                    Om du har frågor om denna integritetspolicy eller vill utöva dina rättigheter, 
                    kontakta oss gärna:
                  </p>
                  <div className="bg-stone-700 p-4 rounded-lg">
                    <p><strong>Viking Salong</strong></p>
                    <p>Trädgårdsgatan 25</p>
                    <p>553 17 Jönköping</p>
                    <p>Telefon: 036-777 99 97</p>
                    <p>E-post: info@vikingsalong.se</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-400 mb-2">Snabb respons:</h4>
                    <p className="text-sm">
                      Vi svarar på alla förfrågningar gällande personuppgifter inom 30 dagar enligt GDPR. 
                      För brådskande ärenden, ring oss direkt.
                    </p>
                  </div>
                  <p>
                    Du har också rätt att lämna in ett klagomål till Integritetsskyddsmyndigheten (IMY) 
                    om du anser att vi behandlar dina personuppgifter på ett felaktigt sätt.
                  </p>
                </div>
              </section>

              {/* Changes to Policy */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Ändringar av policyn</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>
                    Vi kan komma att uppdatera denna integritetspolicy från tid till annan för att 
                    reflektera ändringar i vår verksamhet eller juridiska krav.
                  </p>
                  <div className="bg-stone-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-400 mb-2">Vid ändringar kommer vi att:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Uppdatera datumet för "Senast uppdaterad" överst på sidan</li>
                      <li>Meddela väsentliga ändringar via e-post till registrerade användare</li>
                      <li>Publicera information om ändringar på vår webbplats</li>
                      <li>Begära nytt samtycke vid väsentliga ändringar</li>
                    </ul>
                  </div>
                  <p>
                    Vi rekommenderar att du regelbundet granskar denna policy för att hålla dig 
                    informerad om hur vi skyddar dina uppgifter.
                  </p>
                </div>
              </section>
            </div>

            {/* Back to Home Button */}
            <div className="text-center mt-12">
              <Link href="/">
                <Button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 text-lg">
                  Tillbaka till startsidan
                </Button>
              </Link>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
    </div>
  )
}