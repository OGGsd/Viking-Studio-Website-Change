export function generateStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Viking Salong",
    image: "https://vikingsalong.axiestudio.se/android-chrome-512x512.png",
    logo: "https://vikingsalong.axiestudio.se/android-chrome-512x512.png",
    "@id": "https://vikingsalong.axiestudio.se",
    url: "https://vikingsalong.axiestudio.se",
    telephone: "036-777 99 97",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Trädgårdsgatan 25",
      addressLocality: "Jönköping",
      postalCode: "553 17",
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 57.7816962,
      longitude: 14.1603883,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    sameAs: ["https://www.instagram.com/vikingsalong/", "https://www.facebook.com/profile.php?id=61554619247503"],
    priceRange: "$$",
    description:
      "Viking Salong erbjuder professionell herrklippning och skäggvård i Jönköping. Med verklig erfarenhet i branschen garanterar vi att du får en professionell och personlig upplevelse varje gång du besöker oss.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Frisörtjänster",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Herrklippning",
            description:
              "Professionell klippning anpassad efter dina önskemål och ansiktsform. Inkluderar tvätt och styling.",
          },
          price: "280",
          priceCurrency: "SEK",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Skäggklippning",
            description: "Trimning och formning av skägg med maskin för att uppnå önskad stil.",
          },
          price: "100",
          priceCurrency: "SEK",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Klipp + Skägg",
            description:
              "Både hår- och skäggklippning i ett paket. Perfekt för dig som vill ha en komplett uppfräschning.",
          },
          price: "400",
          priceCurrency: "SEK",
        },
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://vikingsalong.axiestudio.se/#tjanster",
        inLanguage: "sv-SE",
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
      result: {
        "@type": "Reservation",
        name: "Boka tid",
      },
    },
  }

  return JSON.stringify(structuredData)
}
