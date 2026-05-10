import type { Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card"
import { Button } from "@workspace/ui/components/button"

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main card content area.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-64">
      <CardHeader>
        <CardTitle>Small card</CardTitle>
        <CardDescription>Compact layout.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Less padding, tighter spacing.</p>
      </CardContent>
    </Card>
  ),
}

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-64">
      <CardContent>
        <p>A card with only content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Manage your notification preferences.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Mark all read</Button>
        <Button size="sm" variant="ghost">
          Settings
        </Button>
      </CardFooter>
    </Card>
  ),
}
