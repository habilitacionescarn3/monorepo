import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
}
export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: () => <Progress value={60} className="w-64" />,
}

export const Empty: Story = {
  render: () => <Progress value={0} className="w-64" />,
}

export const Full: Story = {
  render: () => <Progress value={100} className="w-64" />,
}

export const Half: Story = {
  render: () => <Progress value={50} className="w-64" />,
}
