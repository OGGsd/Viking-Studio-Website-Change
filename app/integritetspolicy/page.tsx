import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react"
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
                    använder och skyddar dina personuppgifter när du använder vår webbplats och mobilapplikation.
                  </p>
                  <p>
                    Vi är engagerade i att skydda din integritet och säkerställa att dina personuppgifter 
                    hanteras på ett säkert och ansvarsfullt sätt i enlighet med GDPR och svensk lagstiftning.
                  </p>
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
                    <h3 className="text-xl font-semibold mb-3 text-amber-400">Personuppgifter du lämnar till oss:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Namn och kontaktuppgifter när du bokar tid</li>
                      <li>Telefonnummer för bokningsbekräftelser</li>
                      <li>E-postadress för kommunikation</li>
                      <li>Preferenser för tjänster och behandlingar</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-amber-400">Automatiskt insamlade uppgifter:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>IP-adress och enhetsidentifierare</li>
                      <li>Webbläsarinformation och operativsystem</li>
                      <li>Användningsstatistik och navigeringsmönster</li>
                      <li>Cookies och liknande teknologier</li>
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
                  <p>Vi använder dina personuppgifter för följande ändamål:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Hantera och bekräfta dina bokningar</li>
                    <li>Kommunicera med dig om våra tjänster</li>
                    <li>Förbättra vår webbplats och app-funktionalitet</li>
                    <li>Skicka påminnelser om kommande besök</li>
                    <li>Tillhandahålla kundservice och support</li>
                    <li>Följa juridiska krav och förpliktelser</li>
                    <li>Förhindra bedrägerier och säkerställa säkerhet</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Delning av uppgifter</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>Vi delar inte dina personuppgifter med tredje parter, förutom i följande fall:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Med ditt uttryckliga samtycke</li>
                    <li>För att uppfylla juridiska krav eller myndighetsförfrågningar</li>
                    <li>Med betrodda tjänsteleverantörer som hjälper oss att driva vår verksamhet (t.ex. bokningssystem)</li>
                    <li>För att skydda våra rättigheter, egendom eller säkerhet</li>
                  </ul>
                  <p className="mt-4">
                    Alla tredje parter som vi delar uppgifter med är bundna av strikta sekretessavtal 
                    och får endast använda uppgifterna för de specifika ändamål vi anger.
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Cookies och spårningsteknologier</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>Vi använder cookies och liknande teknologier för att:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Komma ihåg dina preferenser och inställningar</li>
                    <li>Förbättra webbplatsens prestanda och funktionalitet</li>
                    <li>Analysera hur vår webbplats används</li>
                    <li>Tillhandahålla personaliserat innehåll</li>
                  </ul>
                  <p className="mt-4">
                    Du kan kontrollera och hantera cookies genom dina webbläsarinställningar. 
                    Observera att vissa funktioner kanske inte fungerar korrekt om du inaktiverar cookies.
                  </p>
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
                    Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda 
                    dina personuppgifter mot obehörig åtkomst, förlust, förstörelse eller ändring.
                  </p>
                  <p>Våra säkerhetsåtgärder inkluderar:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kryptering av känsliga uppgifter</li>
                    <li>Säkra serveranslutningar (SSL/TLS)</li>
                    <li>Regelbundna säkerhetsuppdateringar</li>
                    <li>Begränsad åtkomst till personuppgifter</li>
                    <li>Regelbundna säkerhetskontroller</li>
                  </ul>
                </div>
              </section>

              {/* Your Rights */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Dina rättigheter</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>Enligt GDPR har du följande rättigheter:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Rätt till information:</strong> Få information om hur vi behandlar dina uppgifter</li>
                    <li><strong>Rätt till åtkomst:</strong> Begära en kopia av de uppgifter vi har om dig</li>
                    <li><strong>Rätt till rättelse:</strong> Begära att felaktiga uppgifter korrigeras</li>
                    <li><strong>Rätt till radering:</strong> Begära att dina uppgifter raderas</li>
                    <li><strong>Rätt till begränsning:</strong> Begära att behandlingen av dina uppgifter begränsas</li>
                    <li><strong>Rätt till dataportabilitet:</strong> Få dina uppgifter i ett strukturerat format</li>
                    <li><strong>Rätt att invända:</strong> Invända mot behandling av dina uppgifter</li>
                  </ul>
                </div>
              </section>

              {/* Children's Privacy */}
              <section className="bg-stone-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold">Barns integritet</h2>
                </div>
                <div className="space-y-4 text-stone-300">
                  <p>
                    Våra tjänster riktar sig inte specifikt till barn under 13 år. Vi samlar inte 
                    medvetet in personuppgifter från barn under 13 år utan föräldrars samtycke.
                  </p>
                  <p>
                    Om vi blir medvetna om att vi har samlat in personuppgifter från ett barn under 13 år 
                    utan föräldrars samtycke, kommer vi att vidta åtgärder för att radera dessa uppgifter.
                  </p>
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
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Bokningsuppgifter: 3 år efter senaste besök</li>
                    <li>Kontaktuppgifter: Tills du begär radering</li>
                    <li>Webbplatsloggar: 12 månader</li>
                    <li>Marknadsföringsuppgifter: Tills du avanmäler dig</li>
                  </ul>
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
                    Vi kan komma att uppdatera denna integritetspolicy från tid till annan. 
                    Väsentliga ändringar kommer att meddelas på vår webbplats eller via e-post.
                  </p>
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