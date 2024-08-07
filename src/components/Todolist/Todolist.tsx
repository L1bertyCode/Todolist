import { ChangeEvent, memo, useCallback } from "react";
import { FilterValuesType, TaskType } from "../../app/App";
import Button from "@mui/material/Button";
import AddItemForm from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box, Checkbox } from "@mui/material";
import { Task } from "../Task/Task";

interface PropsType {
 todolistId: string;
 title: string;
 tasks: TaskType[];
 date?: string;
 removeTask: (id: string, todolistId: string) => void;
 filter: FilterValuesType;
 changeFilter: (
  todolistId: string,
  filter: FilterValuesType
 ) => void;
 addTask: (title: string, todolistId: string) => void;
 changeTaskStatus: (
  taskId: string,
  taskStatus: boolean,
  todolistId: string
 ) => void;
 removeTodolist: (todolistId: string) => void;
 changeTaskTitle: (
  todolistId: string,
  taskId: string,
  title: string
 ) => void;
 changeTodolistTitle: (
  todolistId: string,
  title: string
 ) => void;
}

export const Todolist = memo(
 ({
  todolistId,
  title,
  tasks,
  removeTask,
  filter,
  changeFilter,
  addTask,
  changeTaskStatus,
  removeTodolist,
  changeTaskTitle,
  changeTodolistTitle,
 }: PropsType) => {
  console.log("Todolist called", todolistId);

  let tasksForTodolist = tasks;
  if (filter === "active") {
   tasksForTodolist = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
   tasksForTodolist = tasks.filter((t) => t.isDone);
  }

  const addTaskHandler = useCallback(
   (title: string) => {
    addTask(title, todolistId);
   },
   [addTask, todolistId]
  );
  const changeTaskStatusHandler = (
   e: ChangeEvent<HTMLInputElement>,
   taskId: string
  ) => {
   const newStatus = e.currentTarget.checked;
   changeTaskStatus(taskId, newStatus, todolistId);
  };
  const removeTodolistHandler = () => {
   removeTodolist(todolistId);
  };
  const changeTodolistTitleHandler = (title: string) => {
   changeTodolistTitle(todolistId, title);
  };
  const onAllClickHandler = useCallback(
   () => changeFilter(todolistId, "all"),
   []
  );
  const onActiveClickHandler = useCallback(
   () => changeFilter(todolistId, "active"),
   []
  );
  const onCompletedClickHandler = useCallback(
   () => changeFilter(todolistId, "completed"),
   []
  );

  return (
   <div>
    <EditableSpan
     onChange={changeTodolistTitleHandler}
     value={title}
    />

    <IconButton onClick={removeTodolistHandler}>
     <DeleteIcon />
    </IconButton>
    <div>
     <AddItemForm addItem={addTaskHandler} />
    </div>
    {tasksForTodolist.length === 0 ? (
     <p>Тасок нет</p>
    ) : (
     <List>
      {tasksForTodolist.map((task) => {
       const changeTaskTitleHandler = (title: string) => {
        changeTaskTitle(todolistId, task.id, title);
       };
       return (
        <Task
         key={task.id}
         task={task}
         changeTaskStatusHandler={changeTaskStatusHandler}
         changeTaskTitleHandler={changeTaskTitleHandler}
         removeTask={removeTask}
         todolistId={todolistId}
        />
       );
      })}
     </List>
    )}
    <Box
     sx={{
      display: "flex",
      justifyContent: "space-between",
     }}
    >
     <Button
      variant={filter === "all" ? "outlined" : "text"}
      color={"inherit"}
      onClick={onAllClickHandler}
     >
      All
     </Button>
     <Button
      variant={filter === "active" ? "outlined" : "text"}
      color={"primary"}
      onClick={onActiveClickHandler}
     >
      Active
     </Button>
     <Button
      variant={filter === "completed" ? "outlined" : "text"}
      color={"secondary"}
      onClick={onCompletedClickHandler}
     >
      Completed
     </Button>
    </Box>
   </div>
  );
 }
);
