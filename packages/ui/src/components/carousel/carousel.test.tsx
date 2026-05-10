import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

describe("Carousel", () => {
  it("renders slides", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide One</CarouselItem>
          <CarouselItem>Slide Two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
    expect(screen.getByText("Slide One")).toBeInTheDocument()
    expect(screen.getByText("Slide Two")).toBeInTheDocument()
  })

  it("renders navigation buttons", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
    expect(screen.getByText("Previous slide")).toBeInTheDocument()
    expect(screen.getByText("Next slide")).toBeInTheDocument()
  })
})
