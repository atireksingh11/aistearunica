"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: "fade" | "slide-left" | "slide-right" | "scale"
  delay?: number
  threshold?: number
}

export function ScrollAnimation({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("in-view")
            }, delay)
          }
        })
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay, threshold])

  const getAnimationClass = () => {
    switch (animation) {
      case "slide-left":
        return "animate-on-scroll-left"
      case "slide-right":
        return "animate-on-scroll-right"
      case "scale":
        return "animate-on-scroll scale-95"
      default:
        return "animate-on-scroll"
    }
  }

  return (
    <div ref={elementRef} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  )
}
