import { ChangeEvent, memo, useCallback } from "react";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { FilterValuesType, TaskType } from "../../app/App";
import {
 Checkbox,
 IconButton,
 ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface PropsType {
 task: TaskType;
 removeTask: (taskId: string, todolistId: string) => void;
 changeTaskStatusHandler: (
  e: ChangeEvent<HTMLInputElement>,
  taskId: string
 ) => void;
 changeTaskTitleHandler: (title: string) => void;
 todolistId: string;
}

export const Task = memo((props: PropsType) => {
 const {
  task,
  changeTaskStatusHandler,
  changeTaskTitleHandler,
  removeTask,
  todolistId,
 } = props;
 return (
  <ListItem
   key={task.id}
   sx={{
    p: 0,
    justifyContent: "space-between",
    opacity: task.isDone ? 0.5 : 1,
   }}
  >
   <Checkbox
    checked={task.isDone}
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
     changeTaskStatusHandler(e, task.id)
    }
   />

   <EditableSpan
    onChange={changeTaskTitleHandler}
    value={task.title}
   />

   <IconButton
    onClick={() => removeTask(task.id, todolistId)}
   >
    <DeleteIcon />
   </IconButton>
  </ListItem>
 );
});
