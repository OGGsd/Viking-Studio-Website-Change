"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronUp, ChevronDown, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

interface VideoProps {
  src: string
  srcMobile?: string // Optional mobile-optimized version
  srcTablet?: string // Optional tablet-optimized version
  poster?: string
  title?: string
}

export function ReelsSection({ videos }: { videos: VideoProps[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted to comply with autoplay policies
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [showAudioPrompt, setShowAudioPrompt] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const videoContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchStartTime = useRef<number | null>(null)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isUserScrolling = useRef<boolean>(false)

  // Responsive design breakpoints
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")

  // Scroll to next section after last video - with improved behavior
  const scrollToNextSection = useCallback(() => {
    const nextSection = document.getElementById("barberare")
    if (nextSection) {
      // Set scrolling state to prevent other scroll handlers
      setIsScrolling(true)

      // Pause current video and mute it
      if (videoRefs.current[currentIndex]) {
        const video = videoRefs.current[currentIndex]
        // Only pause if we're not in the middle of a play operation
        if (playPromiseRef.current) {
          playPromiseRef.current
            .then(() => {
              video.pause()
            })
            .catch(() => {
              // If play failed, we can safely pause
              video.pause()
            })
        } else {
          video.pause()
        }
      }

      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        // Smooth scroll to next section
        nextSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false)
        }, 1000)
      })
    }
  }, [currentIndex])

  // Safe play function to prevent race conditions
  const safePlayVideo = useCallback((video: HTMLVideoElement) => {
    if (!video) return Promise.reject("No video element")

    // If we're already trying to play, wait for that to finish
    if (playPromiseRef.current) {
      return playPromiseRef.current
        .then(() => {
          // Now it's safe to play
          const promise = video.play()
          playPromiseRef.current = promise
          return promise
        })
        .catch(() => {
          // Previous play failed, try again
          const promise = video.play()
          playPromiseRef.current = promise
          return promise
        })
    } else {
      // No play in progress, start one
      const promise = video.play()
      playPromiseRef.current = promise
      return promise
    }
  }, [])

  // Safe pause function to prevent race conditions
  const safePauseVideo = useCallback((video: HTMLVideoElement) => {
    if (!video) return

    // If we're in the middle of a play operation, wait for it to complete
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          video.pause()
          playPromiseRef.current = null
        })
        .catch(() => {
          // If play failed, we can safely pause
          video.pause()
          playPromiseRef.current = null
        })
    } else {
      // No play in progress, safe to pause
      video.pause()
    }
  }, [])

  // Try to enable audio on the current video
  const tryEnableAudio = useCallback(() => {
    if (!hasInteracted || !audioEnabled) return false

    const video = videoRefs.current[currentIndex]
    if (video) {
      try {
        video.muted = false
        setIsMuted(false)
        return true
      } catch (error) {
        console.warn("Could not unmute video:", error)
        return false
      }
    }
    return false
  }, [currentIndex, hasInteracted, audioEnabled])

  // Handle scroll navigation with improved smoothness
  const scrollToVideo = useCallback(
    (index: number) => {
      if (index >= 0 && index < videos.length && !isScrolling) {
        // Set scrolling state to prevent multiple scroll events
        setIsScrolling(true)

        // Pause all videos first
        videoRefs.current.forEach((video) => {
          if (video) {
            safePauseVideo(video)
          }
        })

        setCurrentIndex(index)

        // Smooth scroll to the selected video
        if (videoContainerRefs.current[index]) {
          // Use requestAnimationFrame for smoother scrolling
          requestAnimationFrame(() => {
            videoContainerRefs.current[index]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          })
        }

        // Play the new video after a short delay to allow for smooth scrolling
        setTimeout(() => {
          const video = videoRefs.current[index]
          if (video) {
            // Start muted (will try to unmute after if possible)
            video.muted = true
            setIsMuted(true)
            video.currentTime = 0 // Start from beginning

            safePlayVideo(video)
              .then(() => {
                setIsPlaying(true)
                playPromiseRef.current = null

                // Try to enable audio if user has interacted
                if (hasInteracted && audioEnabled) {
                  setTimeout(() => {
                    tryEnableAudio()
                  }, 300)
                }
              })
              .catch((err) => {
                console.error("Error playing video:", err)
                playPromiseRef.current = null
              })
          }

          // Reset scrolling state
          setIsScrolling(false)
        }, 300)
      }
    },
    [videos.length, isScrolling, safePlayVideo, safePauseVideo, hasInteracted, audioEnabled, tryEnableAudio],
  )

  // Detect which video is currently visible in the viewport
  const checkVisibleVideo = useCallback(() => {
    if (!containerRef.current || isScrolling || isUserScrolling.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const containerCenter = containerRect.top + containerRect.height / 2

    let closestIndex = currentIndex
    let closestDistance = Number.POSITIVE_INFINITY

    videoContainerRefs.current.forEach((container, index) => {
      if (container) {
        const rect = container.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - containerCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      }
    })

    if (closestIndex !== currentIndex) {
      // Update current index without scrolling
      setCurrentIndex(closestIndex)

      // Play the newly visible video and pause others
      videoRefs.current.forEach((video, index) => {
        if (!video) return

        if (index === closestIndex) {
          // Start muted (will try to unmute after if possible)
          video.muted = true
          setIsMuted(true)

          safePlayVideo(video)
            .then(() => {
              // Try to enable audio if user has interacted
              if (hasInteracted && audioEnabled) {
                setTimeout(() => {
                  tryEnableAudio()
                }, 300)
              }
            })
            .catch(() => {
              playPromiseRef.current = null
            })
        } else {
          safePauseVideo(video)
        }
      })

      setIsPlaying(true)
    }
  }, [currentIndex, isScrolling, safePlayVideo, safePauseVideo, hasInteracted, audioEnabled, tryEnableAudio])

  // Handle wheel event for custom scrolling with improved debounce
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Only handle wheel events when the section is visible and the user is interacting with this section
      if (!isSectionVisible || !containerRef.current?.contains(e.target as Node)) return

      // Prevent default scrolling only within this section
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault()

        // Mark that user is actively scrolling
        isUserScrolling.current = true

        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        // Debounce the scroll event
        scrollTimeoutRef.current = setTimeout(() => {
          if (e.deltaY > 0) {
            // Scroll down
            if (currentIndex === videos.length - 1) {
              scrollToNextSection()
            } else {
              scrollToVideo(currentIndex + 1)
            }
          } else {
            // Scroll up
            scrollToVideo(currentIndex - 1)
          }

          // Reset user scrolling flag after a delay
          setTimeout(() => {
            isUserScrolling.current = false
          }, 500)
        }, 50)
      }
    },
    [currentIndex, isSectionVisible, scrollToNextSection, scrollToVideo, videos.length],
  )

  // Set up wheel event listener with passive: false to allow preventDefault
  useEffect(() => {
    const container = containerRef.current
    if (container && isSectionVisible) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [handleWheel, isSectionVisible])

  // Handle scroll events to detect which video is visible
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling && !isUserScrolling.current) {
        checkVisibleVideo()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isScrolling, checkVisibleVideo])

  // Handle touch events for mobile with improved smoothness
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      // Only handle touch events when the section is visible
      if (!isSectionVisible) return

      touchStartY.current = e.touches[0].clientY
      touchStartTime.current = Date.now()
      setHasInteracted(true)

      // Mark that user is actively scrolling
      isUserScrolling.current = true
    },
    [isSectionVisible],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      // Only handle touch events when the section is visible
      if (!isSectionVisible) return

      // Prevent default scrolling only within this section
      if (containerRef.current?.contains(e.target as Node)) {
        e.preventDefault()
      }

      if (touchStartY.current === null || isScrolling) return

      const touchY = e.touches[0].clientY
      const diff = touchStartY.current - touchY
      const timeDiff = touchStartTime.current ? Date.now() - touchStartTime.current : 0

      // Only trigger if the swipe is fast enough and long enough
      if (Math.abs(diff) > 50 && timeDiff < 300) {
        if (diff > 0) {
          // Swipe up - go to next
          touchStartY.current = null
          touchStartTime.current = null

          if (currentIndex === videos.length - 1) {
            scrollToNextSection()
          } else {
            scrollToVideo(currentIndex + 1)
          }
        } else if (diff < 0) {
          // Swipe down - go to previous
          touchStartY.current = null
          touchStartTime.current = null

          scrollToVideo(currentIndex - 1)
        }
      }
    },
    [isSectionVisible, isScrolling, currentIndex, videos.length, scrollToNextSection, scrollToVideo],
  )

  const handleTouchEnd = useCallback(() => {
    touchStartY.current = null
    touchStartTime.current = null

    // Reset user scrolling flag after a delay
    setTimeout(() => {
      isUserScrolling.current = false
    }, 500)
  }, [])

  // Play/pause the current video
  const togglePlay = useCallback(() => {
    const video = videoRefs.current[currentIndex]
    if (!video) return

    setHasInteracted(true)

    if (isPlaying) {
      safePauseVideo(video)
      setIsPlaying(false)
    } else {
      safePlayVideo(video)
        .then(() => {
          setIsPlaying(true)
          playPromiseRef.current = null

          // Try to enable audio if user has interacted
          if (audioEnabled) {
            setTimeout(() => {
              tryEnableAudio()
            }, 300)
          }
        })
        .catch((err) => {
          console.error("Error playing video:", err)
          playPromiseRef.current = null
        })
    }
  }, [currentIndex, isPlaying, safePlayVideo, safePauseVideo, audioEnabled, tryEnableAudio])

  // Toggle mute for current video
  const toggleMute = useCallback(() => {
    setHasInteracted(true)

    const currentVideo = videoRefs.current[currentIndex]
    if (!currentVideo) return

    if (isMuted) {
      // Trying to unmute
      try {
        currentVideo.muted = false
        setIsMuted(false)
        setAudioEnabled(true)
      } catch (error) {
        console.warn("Could not unmute video:", error)
        // Show audio prompt if unmute fails
        setShowAudioPrompt(true)
        setTimeout(() => {
          setShowAudioPrompt(false)
        }, 3000)
      }
    } else {
      // Muting
      currentVideo.muted = true
      setIsMuted(true)
    }
  }, [isMuted, currentIndex])

  // Handle video ended event
  const handleVideoEnded = useCallback(() => {
    // Go to next video if available
    if (currentIndex < videos.length - 1) {
      scrollToVideo(currentIndex + 1)
    } else {
      // If it's the last video, scroll to next section
      scrollToNextSection()
    }
  }, [currentIndex, videos.length, scrollToVideo, scrollToNextSection])

  // Set up intersection observer to detect when section is visible
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsSectionVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }, // Trigger when 30% of the section is visible
    )

    observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Handle section visibility changes
  useEffect(() => {
    if (!isSectionVisible) {
      // If section is not visible, pause all videos
      videoRefs.current.forEach((video) => {
        if (video) {
          safePauseVideo(video)
        }
      })
      setIsPlaying(false)
    } else {
      // If section becomes visible, play current video
      const currentVideo = videoRefs.current[currentIndex]
      if (currentVideo) {
        // Start muted to comply with autoplay policies
        currentVideo.muted = true
        setIsMuted(true)

        // Try to play the video
        safePlayVideo(currentVideo)
          .then(() => {
            setIsPlaying(true)
            playPromiseRef.current = null

            // Show audio prompt after a short delay
            if (!hasInteracted) {
              setTimeout(() => {
                setShowAudioPrompt(true)
                setTimeout(() => {
                  setShowAudioPrompt(false)
                }, 5000)
              }, 1000)
            } else if (audioEnabled) {
              // Try to enable audio if user has already interacted
              setTimeout(() => {
                tryEnableAudio()
              }, 300)
            }
          })
          .catch((err) => {
            console.error("Error playing video:", err)
            playPromiseRef.current = null
          })
      }
    }
  }, [isSectionVisible, currentIndex, safePlayVideo, safePauseVideo, hasInteracted, audioEnabled, tryEnableAudio])

  // Set up global interaction listeners to detect when user interacts with the page
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true)

      // Clear any existing timeout
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }

      // Try to enable audio after user interaction
      if (isSectionVisible && !isMuted && audioEnabled) {
        const currentVideo = videoRefs.current[currentIndex]
        if (currentVideo) {
          try {
            currentVideo.muted = false
          } catch (error) {
            console.warn("Could not unmute video after interaction:", error)
          }
        }
      }
    }

    // Add event listeners for common interactions
    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)
    document.addEventListener("keydown", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)

      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
    }
  }, [isSectionVisible, currentIndex, isMuted, audioEnabled])

  // Clean up timeouts and promises on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
      playPromiseRef.current = null
    }
  }, [])

  // Initialize the first video when component mounts
  useEffect(() => {
    // Fix mobile viewport height
    if (isMobile) {
      const setVh = () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
      setVh()
      window.addEventListener('resize', setVh)
      return () => window.removeEventListener('resize', setVh)
    }
  }, [isMobile])

  useEffect(() => {
    if (videoRefs.current[0] && isSectionVisible) {
      const firstVideo = videoRefs.current[0]

      // Start muted to comply with autoplay policies
      firstVideo.muted = true
      setIsMuted(true)

      safePlayVideo(firstVideo)
        .then(() => {
          setIsPlaying(true)

          // Show audio prompt after a short delay
          setTimeout(() => {
            setShowAudioPrompt(true)
            setTimeout(() => {
              setShowAudioPrompt(false)
            }, 5000)
          }, 1000)
        })
        .catch((err) => {
          console.error("Error playing first video:", err)
        })
    }
  }, [isSectionVisible, safePlayVideo])

  // Get container height based on device
  const getContainerHeight = () => {
    if (isMobile) return "calc(var(--vh, 1vh) * 100)" // Dynamic mobile height
    if (isTablet) return "90vh" // Taller on tablet
    return "95vh" // Taller on desktop
  }

  // Get video container width/height based on device
  const getVideoContainerStyle = () => {
    if (isMobile) {
      return "w-full h-full" // Full width and height on mobile
    }
    if (isTablet) {
      return "w-full max-w-md h-[85vh]" // Taller on tablet
    }
    return "w-full max-w-xl h-[90vh]" // Wider and taller on desktop
  }

  // Enable audio for all videos
  const enableAudio = useCallback(() => {
    setAudioEnabled(true)
    setShowAudioPrompt(false)

    // Try to unmute current video
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo) {
      try {
        currentVideo.muted = false
        setIsMuted(false)

        // Show audio confirmation
        const videoContainer = videoContainerRefs.current[currentIndex]
        if (videoContainer) {
          const audioConfirmation = document.createElement("div")
          audioConfirmation.className =
            "absolute top-4 right-4 bg-amber-500/80 text-white px-2 py-1 rounded-md text-xs z-30"
          audioConfirmation.textContent = "Ljud på"

          videoContainer.appendChild(audioConfirmation)
          setTimeout(() => {
            if (videoContainer.contains(audioConfirmation)) {
              videoContainer.removeChild(audioConfirmation)
            }
          }, 1500)
        }
      } catch (error) {
        console.warn("Could not unmute video:", error)
      }
    }
  }, [currentIndex])

  return (
    <div
      ref={sectionRef}
      className="relative bg-stone-900 overflow-hidden"
      style={{ height: getContainerHeight() }}
      onClick={() => setHasInteracted(true)}
    >
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-stone-900/80 via-transparent to-stone-900/80"></div>

      {/* Mobile-optimized Audio prompt overlay */}
      {showAudioPrompt && (
        <div
          className={`absolute z-30 shadow-lg ${
            isMobile ? "bottom-32 left-1/2 -translate-x-1/2 w-auto max-w-[90%]" : "top-4 left-1/2 -translate-x-1/2"
          }`}
        >
          <div className="bg-black/80 backdrop-blur-sm text-white rounded-lg flex items-center overflow-hidden">
            {/* Audio icon with amber background for better visibility */}
            <div className="bg-amber-600 p-2 flex-shrink-0">
              <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>

            {/* Text content - shorter on mobile */}
            <div className="px-3 py-2">
              <span className="text-xs sm:text-sm whitespace-nowrap">
                {isMobile ? "Aktivera ljud?" : "Klicka för att aktivera ljud"}
              </span>
            </div>

            {/* Button with clear visual distinction */}
            <Button
              variant="ghost"
              size="sm"
              className="h-full bg-amber-600 hover:bg-amber-500 rounded-none border-none text-white text-xs sm:text-sm px-3 py-2"
              onClick={(e) => {
                e.stopPropagation()
                enableAudio()
              }}
            >
              {isMobile ? "Ja" : "Aktivera"}
            </Button>
          </div>
        </div>
      )}

      {/* Navigation buttons - hidden on mobile */}
      <div
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4 ${isMobile ? "hidden" : ""}`}
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-stone-800/70 border-stone-700 hover:bg-stone-700"
          onClick={() => scrollToVideo(currentIndex - 1)}
          disabled={currentIndex === 0 || isScrolling}
        >
          <ChevronUp className="h-5 w-5" />
          <span className="sr-only">Föregående</span>
        </Button>
        <div className="text-center text-sm font-medium bg-stone-800/70 px-2 py-1 rounded-full">
          {currentIndex + 1}/{videos.length}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-stone-800/70 border-stone-700 hover:bg-stone-700"
          onClick={() => scrollToVideo(currentIndex + 1)}
          disabled={currentIndex === videos.length - 1 || isScrolling}
        >
          <ChevronDown className="h-5 w-5" />
          <span className="sr-only">Nästa</span>
        </Button>
      </div>

      {/* Video controls - positioned differently on mobile */}
      <div className={`absolute z-20 flex gap-4 ${isMobile ? "right-4 bottom-24" : "left-4 bottom-8"}`}>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-stone-800/70 border-stone-700 hover:bg-stone-700"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          <span className="sr-only">{isPlaying ? "Pausa" : "Spela"}</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full bg-stone-800/70 border-stone-700 hover:bg-stone-700 ${isMuted ? "" : "text-amber-500"}`}
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          <span className="sr-only">{isMuted ? "Ljud på" : "Ljud av"}</span>
        </Button>
      </div>

      {/* Video counter for mobile */}
      {isMobile && (
        <div className="absolute left-4 bottom-24 z-20 text-center text-sm font-medium bg-stone-800/70 px-2 py-1 rounded-full">
          {currentIndex + 1}/{videos.length}
        </div>
      )}

      {/* Videos container */}
      <div
        ref={containerRef}
        className="h-full snap-y snap-mandatory overflow-y-auto scrollbar-hide scroll-smooth"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {videos.map((video, index) => (
          <div
            key={index}
            ref={(el) => { videoContainerRefs.current[index] = el }}
            className="h-full w-full snap-start snap-always flex items-center justify-center"
            id={`video-container-${index}`}
          >
            <div className={`${getVideoContainerStyle()} bg-stone-800 rounded-xl overflow-hidden shadow-xl relative`}>
              <video
                ref={(el) => { videoRefs.current[index] = el }}
                src={
                  isMobile && video.srcMobile
                    ? video.srcMobile
                    : isTablet && video.srcTablet
                    ? video.srcTablet
                    : video.src
                }
                poster={video.poster}
                className={`w-full h-full ${isMobile ? "object-cover" : "object-contain"}`}
                playsInline
                loop={true}
                muted={index !== currentIndex || isMuted} // Only current video can have sound
                controls={false}
                onEnded={handleVideoEnded}
                onClick={togglePlay}
                preload={index <= currentIndex + 1 ? "metadata" : "none"} // Only preload nearby videos
                data-index={index}
                crossOrigin="anonymous"
                onError={(e) => {
                  // Fallback to default source if device-specific fails
                  const video = e.target as HTMLVideoElement
                  if (video.src !== video.src) {
                    video.src = video.src
                    video.load()
                  }
                }}
              />

              {/* Title overlay */}
              {video.title && (
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md">
                  {video.title}
                </div>
              )}

              {/* Play button overlay (only shown when paused and current) */}
              {index === currentIndex && !isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="bg-white/20 p-6 rounded-full">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
              )}

              {/* Audio indicator (only shown when current video is playing) */}
              {index === currentIndex && isPlaying && !isMuted && (
                <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full">
                  <Volume2 className="h-4 w-4 text-amber-500" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile swipe instruction - only shown on first load */}
      {isMobile && currentIndex === 0 && (
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-20 bg-black/50 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap animate-pulse">
          Svep upp/ner för att bläddra
        </div>
      )}
    </div>
  )
}
