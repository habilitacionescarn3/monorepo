import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => <Switch />,
}

export const Checked: Story = {
  render: () => <Switch defaultChecked />,
}

export const Small: Story = {
  render: () => <Switch size="sm" />,
}

export const Disabled: Story = {
  render: () => <Switch disabled />,
}
