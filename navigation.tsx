"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE_IMAGES } from "@/components/image-variables"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50" : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover-scale group">
              <div className="w-12 h-12 flex items-center justify-center hover-glow transition-all duration-300 group-hover:scale-110">
                <img
                  src={SITE_IMAGES.logo || "/placeholder.svg"}
                  alt={SITE_IMAGES.logoAlt}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <span className="text-2xl font-playfair tracking-wide font-sans font-medium shadow-none text-black">
                Aistear Unica
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 hover:text-primary relative group font-montserrat",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  {pathname === item.href && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-scale-in" />
                  )}
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover-lift font-montserrat" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button size="sm" className="hover-glow hover-scale font-montserrat" asChild>
                  <Link href="/signup">Book Now</Link>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden hover-scale" onClick={() => setIsOpen(!isOpen)}>
              <div className="relative w-5 h-5">
                <Menu
                  className={cn(
                    "h-5 w-5 absolute transition-all duration-300",
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                  )}
                />
                <X
                  className={cn(
                    "h-5 w-5 absolute transition-all duration-300",
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                  )}
                />
              </div>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-500 ease-out",
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="bg-background/95 backdrop-blur-md border-t border-border/50 animate-slide-down">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md transition-all duration-300 hover-lift font-montserrat",
                      pathname === item.href
                        ? "text-primary bg-secondary"
                        : "text-muted-foreground hover:text-primary hover:bg-secondary",
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 px-3 pt-2">
                  <Button variant="ghost" size="sm" className="hover-lift font-montserrat" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button size="sm" className="hover-glow font-montserrat" asChild>
                    <Link href="/signup">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Button
        onClick={scrollToTop}
        size="sm"
        className={cn(
          "fixed bottom-6 right-6 z-40 rounded-full w-12 h-12 shadow-lg hover-lift hover-glow transition-all duration-500 bg-primary hover:bg-primary/90",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
    </>
  )
}
