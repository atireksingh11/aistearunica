"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Heart,
  Users,
  Sparkles,
  Instagram,
  Linkedin,
  Mail,
  Star,
  Calendar,
  Quote,
  Trophy,
  Target,
  Lightbulb,
  Globe,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ReviewCarousel } from "@/components/review-carousel"
import { SITE_IMAGES } from "@/components/image-variables"

const teamMembers = [
  {
    name: "Sarika Dahiya",
    role: "Founder & CEO",
    experience: "15+ years",
    specialties: ["Bridal Makeup", "Hairstyling", "Draping"],
    image: "/images/team/sarika-founder.png",
    bio: "Sarika is the mastermind behind AistearUnica with 15+ years of working experience in the makeup industry & trainer. Expertise in bridal makeup, hairstyling & draping. She has done 250+ Bridal Makeup & 1000+ Party Makeup.",
    certifications: ["Professional Makeup Artist", "Bridal Beauty Expert", "Makeup Trainer"],
    achievements: ["250+ Bridal Transformations", "1000+ Party Makeup", "15+ Years Industry Experience"],
    quote: "Beauty is not about perfection, it's about confidence and celebrating what makes you unique.",
    availability: "Mon-Sun, Appointments available",
    rating: 5.0,
    reviews: 250,
    social: {
      instagram: "@aistearunica",
      linkedin: "sarika-dahiya",
      email: "sarika.dahiya13@gmail.com",
    },
  },
]

const values = [
  {
    icon: Heart,
    title: "Personalized Care",
    description:
      "Every client receives individualized attention and customized beauty solutions tailored to their unique needs and preferences.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Award,
    title: "Professional Excellence",
    description:
      "Our team maintains the highest standards of professionalism, continuously updating skills and using premium products.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Sparkles,
    title: "Natural Enhancement",
    description:
      "We believe in enhancing your natural beauty rather than masking it, creating looks that feel authentically you.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Users,
    title: "Inclusive Beauty",
    description:
      "Beauty has no boundaries. We celebrate and cater to all skin tones, ages, and personal styles with equal expertise.",
    color: "from-purple-500 to-indigo-600",
  },
]

const testimonials = [
  {
    name: "Jennifer Walsh",
    role: "Bride",
    content:
      "Sarah made my wedding day absolutely perfect. Her attention to detail and calming presence made the entire experience magical.",
    rating: 5,
    artist: "Sarah Mitchell",
  },
  {
    name: "Amanda Foster",
    role: "Corporate Executive",
    content: "Emma's color expertise is incredible. She helped me find the perfect look for my professional headshots.",
    rating: 5,
    artist: "Emma Rodriguez",
  },
  {
    name: "Rachel Kim",
    role: "Skincare Client",
    content: "Dr. Chen transformed my skin completely. Her personalized approach and expertise are unmatched.",
    rating: 5,
    artist: "Dr. Lisa Chen",
  },
]

const brandTimeline = [
  {
    year: "2016",
    title: "The Beginning",
    description: "Sarika founded Aistear Unica with a vision to revolutionize beauty services in Canada",
    icon: Lightbulb,
    color: "from-pink-500 to-rose-600",
    image: SITE_IMAGES.aboutHero,
  },
  {
    year: "2018",
    title: "First 100 Brides",
    description: "Reached our first major milestone of 100 bridal transformations with 5-star reviews",
    icon: Heart,
    color: "from-purple-500 to-indigo-600",
    image: SITE_IMAGES.bridalAfter,
  },
  {
    year: "2020",
    title: "Digital Innovation",
    description: "Launched online booking platform and virtual consultations during the pandemic",
    icon: Globe,
    color: "from-blue-500 to-cyan-600",
    image: SITE_IMAGES.consultationProcess,
  },
  {
    year: "2022",
    title: "Team Expansion",
    description: "Grew to a team of 5 certified professionals serving the Greater Toronto Area",
    icon: Users,
    color: "from-green-500 to-emerald-600",
    image: SITE_IMAGES.teamSarika,
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Awarded 'Best Bridal Makeup Service' and featured in top beauty publications",
    icon: Trophy,
    color: "from-amber-500 to-orange-600",
    image: SITE_IMAGES.portfolioClassic,
  },
]

const communityInitiatives = [
  {
    title: "Beauty for All",
    description: "Free makeup services for cancer survivors and women in transition",
    impact: "50+ women served",
    icon: Heart,
    image: SITE_IMAGES.naturalAfter,
  },
  {
    title: "Education Program",
    description: "Free makeup workshops for young women entering the workforce",
    impact: "200+ students trained",
    icon: BookOpen,
    image: SITE_IMAGES.makeupLessons,
  },
  {
    title: "Charity Partnerships",
    description: "Supporting local women's shelters with beauty care packages",
    impact: "$10K+ donated",
    icon: Users,
    image: SITE_IMAGES.skincare,
  },
]

const awards = [
  {
    year: "2024",
    title: "Best Bridal Makeup Service",
    organization: "Toronto Beauty Awards",
    description: "Recognized for excellence in bridal beauty services",
  },
  {
    year: "2023",
    title: "Top Rated Beauty Professional",
    organization: "WeddingWire",
    description: "Couples' Choice Award for outstanding reviews",
  },
  {
    year: "2023",
    title: "Innovation in Beauty",
    organization: "Canadian Beauty Association",
    description: "For pioneering virtual consultation services",
  },
  {
    year: "2022",
    title: "Small Business Excellence",
    organization: "Mississauga Chamber of Commerce",
    description: "Outstanding contribution to local business community",
  },
]

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [activeTimelineItem, setActiveTimelineItem] = useState<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen pt-16 about-page about-theme">
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-6 animate-bounce">
                <Heart className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">About Aistear Unica</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Founded in 2016, Aistear Unica began as a dream to create a beauty experience that celebrates every
                woman's unique radiance. Today, we're Canada's premier destination for professional makeup artistry and
                skincare services.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">8+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1250+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="/services">Our Services</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:shadow-lg transform hover:scale-105 transition-all duration-300 bg-transparent"
                  asChild
                >
                  <Link href="#timeline">Our Journey</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={SITE_IMAGES.aboutHero || "/placeholder.svg"}
                  alt="Aistear Unica team at work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg animate-pulse">
                <div className="text-lg font-bold">Award</div>
                <div className="text-sm">Winning Team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="timeline-header">
            <h2
              className={`text-4xl font-bold text-foreground mb-4 ${visibleElements.has("timeline-header") ? "animate-fade-in" : "opacity-0"}`}
            >
              Our Journey
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-2xl mx-auto ${visibleElements.has("timeline-header") ? "animate-slide-up" : "opacity-0"}`}
            >
              From a single vision to Canada's premier beauty service provider
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full"></div>

            <div className="space-y-12">
              {brandTimeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} ${
                    visibleElements.has("timeline-header") ? "animate-slide-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <Badge variant="secondary" className="mb-1">
                              {item.year}
                            </Badge>
                            <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                        <div className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 btn-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To empower every woman to feel confident and beautiful by providing exceptional makeup artistry and
                  skincare services. We believe that beauty is not about perfection, but about enhancing what makes you
                  uniquely you.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Target className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Personalized beauty solutions</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Target className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Professional excellence in every service</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Target className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Inclusive beauty for all women</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 btn-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To be Canada's most trusted and innovative beauty service provider, setting new standards for
                  personalized care, professional excellence, and inclusive beauty practices that celebrate diversity in
                  all its forms.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Sparkles className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Leading beauty innovation in Canada</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Sparkles className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Expanding to serve more communities</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Sparkles className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Setting industry standards for excellence</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="values-header">
            <h2
              className={`text-4xl font-bold text-foreground mb-4 ${visibleElements.has("values-header") ? "animate-fade-in" : "opacity-0"}`}
            >
              Our Values
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-2xl mx-auto ${visibleElements.has("values-header") ? "animate-slide-up" : "opacity-0"}`}
            >
              The principles that guide everything we do and every service we provide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`text-center p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                  visibleElements.has("values-header") ? "animate-scale-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="pt-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="community-header">
            <h2
              className={`text-4xl font-bold text-foreground mb-4 ${visibleElements.has("community-header") ? "animate-fade-in" : "opacity-0"}`}
            >
              Giving Back to Our Community
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-2xl mx-auto ${visibleElements.has("community-header") ? "animate-slide-up" : "opacity-0"}`}
            >
              Beauty is about more than looks - it's about building confidence and supporting our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityInitiatives.map((initiative, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                  visibleElements.has("community-header") ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative h-48">
                  <Image
                    src={initiative.image || "/placeholder.svg"}
                    alt={initiative.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
                      {initiative.impact}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <initiative.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{initiative.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{initiative.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="awards-header">
            <h2
              className={`text-4xl font-bold text-foreground mb-4 ${visibleElements.has("awards-header") ? "animate-fade-in" : "opacity-0"}`}
            >
              Awards & Recognition
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-2xl mx-auto ${visibleElements.has("awards-header") ? "animate-slide-up" : "opacity-0"}`}
            >
              Industry recognition for our commitment to excellence and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                  visibleElements.has("awards-header") ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{award.title}</h3>
                        <p className="text-primary font-medium">{award.organization}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{award.year}</Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section id="team" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate id="team-header">
            <h2
              className={`text-4xl font-bold text-foreground mb-4 font-serif ${visibleElements.has("team-header") ? "animate-fade-in" : "opacity-0"}`}
            >
              Meet Our Founder
            </h2>
            <p
              className={`text-xl text-muted-foreground max-w-2xl mx-auto ${visibleElements.has("team-header") ? "animate-slide-up" : "opacity-0"}`}
            >
              The visionary behind AistearUnica's innovative approach to beauty services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer ${
                  visibleElements.has("team-header") ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSelectedMember(selectedMember === index ? null : index)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-80 md:h-full">
                    <Image
                      src={SITE_IMAGES.teamSarika || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                        <span className="ml-2 text-sm">({member.reviews})</span>
                      </div>
                      <p className="text-sm">Click to learn more</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {member.experience}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 fill-accent text-accent mr-1" />
                          <span className="text-xs text-muted-foreground">{member.rating}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{member.bio}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, sIndex) => (
                          <Badge key={sIndex} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-xs text-muted-foreground mb-1">
                        <Calendar className="w-3 h-3 mr-2" />
                        {member.availability}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                          <Instagram className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                          <Linkedin className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/contact">Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>

                {/* Expanded Details */}
                {selectedMember === index && (
                  <div className="border-t border-border bg-secondary/30 p-6 animate-slide-down">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <Quote className="w-4 h-4 mr-2 text-primary" />
                          Personal Quote
                        </h4>
                        <p className="text-muted-foreground italic text-sm mb-4">"{member.quote}"</p>

                        <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                        <div className="space-y-2">
                          {member.achievements.map((achievement, aIndex) => (
                            <div key={aIndex} className="flex items-center text-sm">
                              <Award className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Certifications:</h4>
                        <div className="space-y-2 mb-4">
                          {member.certifications.map((cert, cIndex) => (
                            <div key={cIndex} className="flex items-center text-sm">
                              <Award className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{cert}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-accent text-accent mr-1" />
                            <span className="text-sm font-medium">{member.rating}/5.0</span>
                            <span className="text-xs text-muted-foreground ml-2">({member.reviews} reviews)</span>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-primary to-accent" asChild>
                            <Link href="/contact">Book with {member.name.split(" ")[0]}</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Testimonials */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Clients Say About Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Personal experiences with our talented artists
            </p>
          </div>

          <ReviewCarousel autoPlay={true} autoPlayInterval={8000} variant="compact" className="mb-8" />
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 btn-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-primary-foreground/90">Numbers that reflect our commitment to excellence</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "250+", label: "Bridal Makeup", icon: Heart },
              { number: "1000+", label: "Party Makeup", icon: Users },
              { number: "15+", label: "Years Experience", icon: Calendar },
              { number: "98%", label: "Client Satisfaction", icon: Award },
            ].map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white group-hover:scale-110 transition-transform duration-300">
                  {achievement.number}
                </div>
                <div className="text-primary-foreground/90 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-6">Looking Ahead</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            As we continue to grow, our commitment remains the same: to provide exceptional beauty services that
            celebrate every woman's unique beauty. We're expanding our team, introducing new services, and exploring
            innovative ways to serve our community better.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-2">Expansion Plans</h3>
              <p className="text-sm text-muted-foreground">Serving more cities across Ontario</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <Lightbulb className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">New techniques and sustainable practices</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">More programs to give back</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hover:shadow-xl transform hover:scale-105 transition-all duration-300" asChild>
              <Link href="/contact">Book Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
