"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Star, Quote, Play, Pause, ChevronLeft, ChevronRight, Heart, Camera, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SITE_IMAGES } from "@/components/image-variables"

interface Review {
  id: string
  name: string
  role: string
  service: string
  rating: number
  content: string
  image: string
  beforeImage?: string
  afterImage?: string
  date: string
  location?: string
  verified?: boolean
  featured?: boolean
  serviceCategory?: string
  highlights?: string[]
}

interface ReviewCarouselProps {
  reviews?: Review[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showDots?: boolean
  className?: string
  variant?: "default" | "compact" | "featured" | "gallery"
}

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Bride",
    service: "Bridal Makeup",
    rating: 5,
    content:
      "Absolutely stunning work! The team made me feel like a princess on my wedding day. The makeup lasted all day and looked flawless in every photo. I couldn't have asked for a better experience.",
    image: SITE_IMAGES.testimonial1,
    beforeImage: SITE_IMAGES.bridalBefore,
    afterImage: SITE_IMAGES.bridalAfter,
    date: "2024-01-15",
    location: "Toronto, ON",
    verified: true,
    featured: true,
    serviceCategory: "Bridal",
    highlights: ["Long-lasting", "Photo-perfect", "Professional service"],
  },
  {
    id: "2",
    name: "Emily Chen",
    role: "Corporate Executive",
    service: "Professional Makeup",
    rating: 5,
    content:
      "Professional, punctual, and incredibly talented. I book regular appointments for important meetings and events. Emma always exceeds my expectations and makes me feel confident.",
    image: SITE_IMAGES.testimonial2,
    beforeImage: SITE_IMAGES.corporateBefore,
    afterImage: SITE_IMAGES.corporateAfter,
    date: "2024-01-10",
    location: "Toronto, ON",
    verified: true,
    serviceCategory: "Corporate",
    highlights: ["Punctual", "Professional", "Confidence-boosting"],
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    role: "Party Host",
    service: "Party Makeup",
    rating: 5,
    content:
      "The party makeup service was incredible! I felt confident and glamorous all night. The team's attention to detail is unmatched, and they really listened to what I wanted.",
    image: SITE_IMAGES.testimonial3,
    beforeImage: SITE_IMAGES.partyBefore,
    afterImage: SITE_IMAGES.partyAfter,
    date: "2024-01-08",
    location: "Mississauga, ON",
    verified: true,
    featured: true,
    serviceCategory: "Party",
    highlights: ["Glamorous", "Attention to detail", "Great listening"],
  },
  {
    id: "4",
    name: "Jennifer Walsh",
    role: "Bride",
    service: "Bridal Package",
    rating: 5,
    content:
      "Sarah and her team were amazing! From the trial to the wedding day, everything was perfect. They made me feel so comfortable and beautiful. Highly recommend!",
    image: SITE_IMAGES.testimonial4,
    beforeImage: SITE_IMAGES.bridalBefore,
    afterImage: SITE_IMAGES.bridalAfter,
    date: "2024-01-05",
    location: "Toronto, ON",
    verified: true,
    serviceCategory: "Bridal",
    highlights: ["Amazing team", "Comfortable experience", "Perfect results"],
  },
  {
    id: "5",
    name: "Amanda Foster",
    role: "Model",
    service: "Photography Makeup",
    rating: 5,
    content:
      "Emma's expertise in photography makeup is incredible. She knows exactly how to make you look amazing on camera. Professional and friendly service every time.",
    image: SITE_IMAGES.testimonial5,
    beforeImage: SITE_IMAGES.editorialBefore,
    afterImage: SITE_IMAGES.editorialAfter,
    date: "2024-01-03",
    location: "Toronto, ON",
    verified: true,
    serviceCategory: "Photography",
    highlights: ["Camera expertise", "Professional", "Friendly service"],
  },
  {
    id: "6",
    name: "Rachel Kim",
    role: "Skincare Client",
    service: "Skincare Consultation",
    rating: 5,
    content:
      "Dr. Chen completely transformed my skin! Her personalized approach and expertise are unmatched. My skin has never looked better, and I finally have a routine that works.",
    image: SITE_IMAGES.testimonial6,
    date: "2024-01-01",
    location: "Toronto, ON",
    verified: true,
    serviceCategory: "Skincare",
    highlights: ["Skin transformation", "Personalized approach", "Expert guidance"],
  },
  {
    id: "7",
    name: "Isabella Martinez",
    role: "Fashion Model",
    service: "Editorial Makeup",
    rating: 5,
    content:
      "The editorial makeup was absolutely stunning! Perfect for my fashion shoot. The artist understood the creative vision and brought it to life beautifully.",
    image: SITE_IMAGES.testimonial7,
    beforeImage: SITE_IMAGES.editorialBefore,
    afterImage: SITE_IMAGES.editorialAfter,
    date: "2023-12-28",
    location: "Toronto, ON",
    verified: true,
    featured: true,
    serviceCategory: "Editorial",
    highlights: ["Creative vision", "Fashion-forward", "Stunning results"],
  },
  {
    id: "8",
    name: "Sophie Williams",
    role: "Young Professional",
    service: "Natural Makeup",
    rating: 5,
    content:
      "Perfect natural makeup for my corporate headshots! The artist enhanced my features beautifully while keeping it professional and polished.",
    image: SITE_IMAGES.testimonial8,
    beforeImage: SITE_IMAGES.naturalBefore,
    afterImage: SITE_IMAGES.naturalAfter,
    date: "2023-12-25",
    location: "Mississauga, ON",
    verified: true,
    serviceCategory: "Natural",
    highlights: ["Natural enhancement", "Professional polish", "Perfect for photos"],
  },
]

export function ReviewCarousel({
  reviews = defaultReviews,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
  className,
  variant = "default",
}: ReviewCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showBeforeAfter, setShowBeforeAfter] = useState<string | null>(null)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    if (!api || !isPlaying) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, isPlaying, autoPlayInterval])

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  const goToSlide = (index: number) => {
    api?.scrollTo(index)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={cn("w-4 h-4", i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300")} />
    ))
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "max-w-2xl"
      case "featured":
        return "max-w-6xl"
      case "gallery":
        return "max-w-7xl"
      default:
        return "max-w-4xl"
    }
  }

  const getBasisClasses = () => {
    switch (variant) {
      case "compact":
        return "basis-full"
      case "featured":
        return "md:basis-1/2 lg:basis-1/2"
      case "gallery":
        return "md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      default:
        return "md:basis-1/2 lg:basis-1/3"
    }
  }

  return (
    <div className={cn("w-full mx-auto", getVariantClasses(), className)}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <div className="relative">
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={review.id} className={getBasisClasses()}>
                <div className="p-2">
                  <Card
                    className={cn(
                      "h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-secondary/20",
                      review.featured && "ring-2 ring-primary/20 shadow-lg",
                    )}
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                              <Image
                                src={review.image || "/placeholder.svg"}
                                alt={review.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            {review.verified && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                            {review.featured && (
                              <div className="absolute -top-1 -left-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <Heart className="w-3 h-3 text-white fill-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{review.name}</h4>
                            <p className="text-sm text-muted-foreground">{review.role}</p>
                            {review.location && (
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {review.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge variant="secondary" className="text-xs">
                            {review.service}
                          </Badge>
                          {review.featured && (
                            <Badge variant="default" className="text-xs bg-primary">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex space-x-1">{renderStars(review.rating)}</div>
                        <span className="text-sm font-medium text-foreground">{review.rating}.0</span>
                      </div>

                      {/* Quote */}
                      <div className="flex-1 relative">
                        <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                        <p className="text-muted-foreground leading-relaxed text-sm italic pl-4">"{review.content}"</p>
                      </div>

                      {review.highlights && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-1">
                            {review.highlights.map((highlight, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs text-primary border-primary/30">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {review.beforeImage && review.afterImage && (
                        <div className="mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowBeforeAfter(showBeforeAfter === review.id ? null : review.id)}
                            className="text-primary hover:text-primary/80 p-0 h-auto"
                          >
                            <Camera className="w-3 h-3 mr-1" />
                            {showBeforeAfter === review.id ? "Hide" : "View"} Transformation
                          </Button>
                        </div>
                      )}

                      {showBeforeAfter === review.id && review.beforeImage && review.afterImage && (
                        <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-center">
                              <div className="relative h-20 rounded overflow-hidden mb-1">
                                <Image
                                  src={review.beforeImage || "/placeholder.svg"}
                                  alt="Before"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">Before</span>
                            </div>
                            <div className="text-center">
                              <div className="relative h-20 rounded overflow-hidden mb-1">
                                <Image
                                  src={review.afterImage || "/placeholder.svg"}
                                  alt="After"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">After</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls */}
          {showControls && (
            <>
              <CarouselPrevious className="hidden md:flex -left-12 hover:bg-primary hover:text-primary-foreground transition-colors duration-300" />
              <CarouselNext className="hidden md:flex -right-12 hover:bg-primary hover:text-primary-foreground transition-colors duration-300" />

              {/* Mobile Navigation */}
              <div className="flex md:hidden justify-center space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => api?.scrollPrev()}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAutoPlay}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300 bg-transparent"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => api?.scrollNext()}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {showDots && (
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  current === index + 1 ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play Control */}
        {autoPlay && (
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAutoPlay}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>
          </div>
        )}
      </Carousel>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-6 bg-secondary/30 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">4.9</div>
          <div className="flex justify-center space-x-1 mb-1">{renderStars(5)}</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{reviews.length}+</div>
          <div className="text-sm text-muted-foreground">Happy Clients</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">100%</div>
          <div className="text-sm text-muted-foreground">Verified Reviews</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{reviews.filter((r) => r.featured).length}</div>
          <div className="text-sm text-muted-foreground">Featured Stories</div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-foreground mb-3 text-center">Reviews by Service</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from(new Set(reviews.map((r) => r.serviceCategory).filter(Boolean))).map((category) => {
            const categoryCount = reviews.filter((r) => r.serviceCategory === category).length
            return (
              <Badge key={category} variant="secondary" className="text-sm">
                {category} ({categoryCount})
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}
