import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => <Input placeholder="Type something..." />,
}

export const Disabled: Story = {
  render: () => <Input placeholder="Disabled" disabled />,
}

export const WithType: Story = {
  render: () => <Input type="email" placeholder="you@example.com" />,
}
