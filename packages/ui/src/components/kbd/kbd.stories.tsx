import type { Meta, StoryObj } from "@storybook/react"
import { Kbd, KbdGroup } from "./kbd"

const meta: Meta<typeof Kbd> = {
  title: "Components/Kbd",
  component: Kbd,
}
export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  render: () => <Kbd>Enter</Kbd>,
}

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Cmd</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}

export const Modifier: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
}
