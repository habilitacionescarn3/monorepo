import type { Meta, StoryObj } from "@storybook/react"
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupAddon,
} from "./input-group"

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
}
export default meta
type Story = StoryObj<typeof InputGroup>

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
}

export const WithButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Go</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
