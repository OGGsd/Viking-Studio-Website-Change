"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Set initial value on client side
    const media = window.matchMedia(query)
    setMatches(media.matches)

    // Create listener for changes
    const listener = () => setMatches(media.matches)

    // Add listener
    media.addEventListener("change", listener)

    // Clean up
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
