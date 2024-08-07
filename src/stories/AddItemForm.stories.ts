import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import AddItemForm from "../components/AddItemForm/AddItemForm";

const meta = {
 title: "TODOLISTS/Task",
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
 // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItemFormStory: Story = {
 // More on args: https://storybook.js.org/docs/react/writing-stories/args
 args: {
  addItem: action("Button clicked inside form"),
 },
};
