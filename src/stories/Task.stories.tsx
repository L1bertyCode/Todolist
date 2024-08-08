import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "../components/Task/Task";

const meta: Meta<typeof Task> = {
 title: "TODOLISTS/Task",
 component: Task,

 tags: ["autodocs"],

 args: {
  changeTaskStatusHandler: action(
   "Status changed inside Task"
  ),
  changeTaskTitleHandler: action(
   "Title changed inside Task"
  ),
  removeTask: action(
   "Remove Button clicked changed inside Task"
  ),
  task: { id: "12wsdewfijdei", title: "JS", isDone: false },
  todolistId: "fgdosrg8rgjuh",
 },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
 args: {
  task: {
   id: "12wsdewfijdei2343",
   title: "CSS",
   isDone: true,
  },
 },
};
