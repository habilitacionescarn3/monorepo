import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "./spinner"

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: () => <Spinner />,
}

export const Large: Story = {
  render: () => <Spinner className="size-8" />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner />
      <span>Loading...</span>
    </div>
  ),
}
