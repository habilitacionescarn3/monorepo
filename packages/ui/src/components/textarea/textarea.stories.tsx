import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => <Textarea placeholder="Enter a message..." />,
}

export const WithValue: Story = {
  render: () => (
    <Textarea defaultValue="Some pre-filled content here." />
  ),
}

export const Disabled: Story = {
  render: () => <Textarea disabled placeholder="Disabled textarea" />,
}
