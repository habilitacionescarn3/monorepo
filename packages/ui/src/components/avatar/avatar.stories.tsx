import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
}
export default meta

type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="shadcn"
      />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/nonexistent.png" alt="User" />
      <AvatarFallback>HT</AvatarFallback>
    </Avatar>
  ),
}

export const Small: Story = {
  render: () => (
    <Avatar size="sm">
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
  ),
}

export const Large: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
}
