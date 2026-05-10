import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Toaster } from "./sonner"

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
}
export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <button onClick={() => toast("Hello from sonner!")}>Show toast</button>
    </div>
  ),
}

export const WithSuccess: Story = {
  render: () => (
    <div>
      <Toaster />
      <button onClick={() => toast.success("Saved successfully")}>Success toast</button>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div>
      <Toaster />
      <button onClick={() => toast.error("Something went wrong")}>Error toast</button>
    </div>
  ),
}
