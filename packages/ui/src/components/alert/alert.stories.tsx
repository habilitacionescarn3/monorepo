import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./alert"
import { Button } from "@workspace/ui/components/button"

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
}
export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>A new version is ready to install.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </AlertAction>
    </Alert>
  ),
}
