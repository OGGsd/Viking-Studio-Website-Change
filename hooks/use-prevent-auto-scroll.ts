"use client"

import { useEffect } from "react"

/**
 * Hook för att förhindra oönskad automatisk scrollning på webbplatsen
 * Särskilt användbart för att förhindra att vissa sektioner automatiskt scrollas till
 */
export function usePreventAutoScroll() {
  useEffect(() => {
    // Spara originalfunktionen för scrollIntoView
    const originalScrollIntoView = Element.prototype.scrollIntoView

    // Överskugga scrollIntoView för att förhindra oönskad automatisk scrollning
    Element.prototype.scrollIntoView = function (options) {
      // Kontrollera om elementet är en del av tjänstesektionen och om scrollningen inte är explicit begärd
      const isServiceSection = this.id === "tjanster" || this.closest("#tjanster")
      const isExplicitScroll = options && typeof options === "object" && options.behavior === "smooth"

      // Tillåt endast explicit begärd scrollning till tjänstesektionen
      if (isServiceSection && !isExplicitScroll) {
        console.log("Prevented automatic scroll to service section")
        return
      }

      // Annars, använd originalfunktionen
      return originalScrollIntoView.apply(this, arguments)
    }

    // Återställ originalfunktionen vid cleanup
    return () => {
      Element.prototype.scrollIntoView = originalScrollIntoView
    }
  }, [])
}
