import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import AddItemForm from "../components/AddItemForm/AddItemForm";

const meta = {
 title: "TODOLISTS/AddItemForm",
 component: AddItemForm,
 //  parameters: {
 //   layout: "centered",
 //  },

 tags: ["autodocs"],
 // More on argTypes: https://storybook.js.org/docs/api/argtypes
 argTypes: {
  addItem: {
   description: "Button clicked inside form",
   action: "clicked",
  },
 },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItemFormStory: Story = {
 args: {
  addItem: action("Button clicked inside form"),
 },
};
