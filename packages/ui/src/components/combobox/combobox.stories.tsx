import type { Meta, StoryObj } from "@storybook/react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox"

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
}
export default meta
type Story = StoryObj<typeof Combobox>

const fruits = ["Apple", "Banana", "Blueberry", "Mango", "Orange", "Peach"]

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Search fruit..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          {fruits.map((fruit) => (
            <ComboboxItem key={fruit} value={fruit}>
              {fruit}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
