import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
}

export const Circle: Story = {
  render: () => <Skeleton className="size-12 rounded-full" />,
}

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-40 w-64 rounded-xl" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  ),
}
