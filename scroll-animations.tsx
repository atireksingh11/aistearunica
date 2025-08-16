"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scaleIn" | "rotateIn" | "flipIn"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export function ScrollAnimation({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className,
  once = true,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true)
            if (once) setHasAnimated(true)
          }, delay)
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold, once, hasAnimated])

  const animationClasses = {
    fadeIn: "scroll-fade-in",
    slideUp: "scroll-slide-up",
    slideDown: "scroll-slide-down",
    slideLeft: "scroll-slide-left",
    slideRight: "scroll-slide-right",
    scaleIn: "scroll-scale-in",
    rotateIn: "scroll-rotate-in",
    flipIn: "scroll-flip-in",
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        "scroll-animation-element",
        animationClasses[animation],
        isVisible && "scroll-animation-visible",
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  )
}

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -speed
        setOffset(rate)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={elementRef} className={cn("parallax-container", className)}>
      <div
        className="parallax-element"
        style={{
          transform: `translateY(${offset}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface ScrollProgressProps {
  className?: string
  color?: string
}

export function ScrollProgress({ className, color = "bg-primary" }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.pageYOffset / totalHeight) * 100
      setProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={cn("fixed top-0 left-0 w-full h-1 bg-secondary/30 z-50", className)}>
      <div className={cn("h-full transition-all duration-150 ease-out", color)} style={{ width: `${progress}%` }} />
    </div>
  )
}

interface StaggeredAnimationProps {
  children: React.ReactNode[]
  staggerDelay?: number
  animation?: "fadeIn" | "slideUp" | "scaleIn"
  className?: string
}

export function StaggeredAnimation({
  children,
  staggerDelay = 100,
  animation = "fadeIn",
  className,
}: StaggeredAnimationProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollAnimation key={index} animation={animation} delay={index * staggerDelay} className="staggered-item">
          {child}
        </ScrollAnimation>
      ))}
    </div>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({ end, duration = 2000, prefix = "", suffix = "", className }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const startCount = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={elementRef} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export function Typewriter({ text, speed = 50, delay = 0, className }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1))
        index++
        if (index >= text.length) {
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, text, speed, delay])

  return (
    <div ref={elementRef} className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  )
}
