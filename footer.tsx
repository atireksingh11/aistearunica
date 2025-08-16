import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AU</span>
              </div>
              <span className="font-bold text-xl text-foreground">Aistear Unica</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium beauty services for the modern woman. Professional makeup artistry for weddings, special events,
              and everyday elegance.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/services"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Our Services
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link href="/signup" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Bridal Makeup</p>
              <p className="text-sm text-muted-foreground">Party Makeup</p>
              <p className="text-sm text-muted-foreground">Skincare Consultation</p>
              <p className="text-sm text-muted-foreground">Makeup Lessons</p>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@aistearunica.ca</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Toronto, ON, Canada</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Newsletter</p>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="text-sm" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Aistear Unica. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
