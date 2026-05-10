import type { Meta, StoryObj } from "@storybook/react"
import { AspectRatio } from "./aspect-ratio"

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
}
export default meta

type Story = StoryObj<typeof AspectRatio>

export const SixteenByNine: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=640"
          alt="Landscape"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={1}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
}

export const FourByThree: Story = {
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={4 / 3}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
          4:3
        </div>
      </AspectRatio>
    </div>
  ),
}
