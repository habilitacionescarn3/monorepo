"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel"
import {
  Card,
  CardContent,
} from "@workspace/ui/components/card"

const slides = [
  { title: "Design System", description: "Consistent UI components" },
  { title: "TypeScript First", description: "Full type safety" },
  { title: "Accessible", description: "ARIA compliant by default" },
  { title: "Themeable", description: "Dark and light mode" },
]

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-2 p-8 text-center">
                <p className="text-lg font-semibold">{slide.title}</p>
                <p className="text-sm text-muted-foreground">{slide.description}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
