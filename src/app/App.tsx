import { useState } from "react";
import { v1 } from "uuid";
import { Todolist } from "../components/Todolist/Todolist";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import "./App.css";
import { MenuButton } from "../components/Todolist/Todolist.styles";
import {
 createTheme,
 ThemeProvider,
} from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeMode = "dark" | "light";
export interface TodolistType {
 id: string;
 title: string;
 filter: FilterValuesType;
}
export interface TaskType {
 id: string;
 title: string;
 isDone: boolean;
}
export type FilterValuesType =
 | "all"
 | "active"
 | "completed";

export type TasksStateType = {
 [key: string]: TaskType[];
};
function App() {
 const [themeMode, setThemeMode] =
  useState<ThemeMode>("light");
 const theme = createTheme({
  palette: {
   mode: themeMode === "light" ? "light" : "dark",
   primary: {
    main: "#087EA4",
   },
  },
 });
 const changeModeHandler = () => {
  setThemeMode(themeMode == "light" ? "dark" : "light");
 };

 let todolistID1 = v1();
 let todolistID2 = v1();

 let [todolists, setTodolists] = useState<TodolistType[]>([
  {
   id: todolistID1,
   title: "What to learn",
   filter: "all",
  },
  { id: todolistID2, title: "What to buy", filter: "all" },
 ]);

 let [tasks, setTasks] = useState<TasksStateType>({
  [todolistID1]: [
   { id: v1(), title: "HTML&CSS", isDone: true },
   { id: v1(), title: "JS", isDone: true },
   { id: v1(), title: "ReactJS", isDone: false },
  ],
  [todolistID2]: [
   { id: v1(), title: "Rest API", isDone: true },
   { id: v1(), title: "GraphQL", isDone: false },
  ],
  [todolistID2]: [
   { id: v1(), title: "Rest API", isDone: true },
   { id: v1(), title: "GraphQL", isDone: false },
  ],
 });
 const removeTask = (
  taskId: string,
  todolistId: string
 ) => {
  setTasks({
   ...tasks,
   [todolistId]: tasks[todolistId].filter((task) => {
    return task.id !== taskId;
   }),
  });
 };
 const changeFilter = (
  todolistId: string,
  filter: FilterValuesType
 ) => {
  setTodolists([
   ...todolists.map((list) =>
    list.id !== todolistId ? list : { ...list, filter }
   ),
  ]);
 };
 const addTask = (title: string, todolistId: string) => {
  setTasks({
   ...tasks,
   [todolistId]: [
    { id: v1(), title: title, isDone: false },
    ...tasks[todolistId],
   ],
  });
 };
 const changeTaskStatus = (
  taskId: string,
  taskStatus: boolean,
  todolistId: string
 ) => {
  setTasks({
   ...tasks,
   [todolistId]: [
    ...tasks[todolistId].map((t) =>
     t.id !== taskId ? t : { ...t, isDone: taskStatus }
    ),
   ],
  });
 };
 const removeTodolist = (todolistId: string) => {
  setTodolists([
   ...todolists.filter((tl) => tl.id !== todolistId),
  ]);
  setTasks({ ...tasks, [todolistId]: [] });
 };
 const addTodolist = (todolistTitle: string) => {
  const newTodolistId = v1();
  setTodolists([
   ...todolists,
   {
    id: newTodolistId,
    title: todolistTitle,
    filter: "all",
   },
  ]);
  setTasks({ ...tasks, [newTodolistId]: [] });
 };
 const changeTaskTitle = (
  todolistId: string,
  taskId: string,
  title: string
 ) => {
  setTasks({
   ...tasks,
   [todolistId]: [
    ...tasks[todolistId].map((t) =>
     t.id === taskId ? { ...t, title } : t
    ),
   ],
  });
 };
 const changeTodolistTitle = (
  todolistId: string,
  title: string
 ) => {
  const newTodolists = todolists.map((tl) =>
   tl.id === todolistId ? { ...tl, title } : tl
  );
  setTodolists(newTodolists);
 };
 return (
  <div className="App">
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar position="static" sx={{ mb: "30px" }}>
     <Container fixed>
      <Toolbar
       sx={{
        display: "flex",
        justifyContent: "space-between",
       }}
      >
       <IconButton color="inherit">
        <MenuIcon />
       </IconButton>
       <div>
        <MenuButton>Login</MenuButton>
        <MenuButton>Logout</MenuButton>
        <MenuButton background={theme.palette.primary.dark}>
         Faq
        </MenuButton>
        <Switch
         color={"default"}
         onChange={changeModeHandler}
        />
       </div>
      </Toolbar>
     </Container>
    </AppBar>
    <Container fixed>
     <Grid container sx={{ mb: "30px" }}>
      <AddItemForm addItem={addTodolist} />
     </Grid>
     <Grid container spacing={4}>
      {todolists.map((tl: TodolistType) => {
       let tasksForTodolist = tasks[tl.id];
       if (tl.filter === "active") {
        tasksForTodolist = tasks[tl.id].filter(
         (t) => !t.isDone
        );
       }
       if (tl.filter === "completed") {
        tasksForTodolist = tasks[tl.id].filter(
         (t) => t.isDone
        );
       }
       return (
        <Grid key={tl.id}>
         <Paper sx={{ p: "0 20px 20px 20px" }}>
          <Todolist
           todolistId={tl.id}
           key={tl.id}
           title={tl.title}
           tasks={tasksForTodolist}
           removeTask={removeTask}
           changeFilter={changeFilter}
           addTask={addTask}
           changeTaskStatus={changeTaskStatus}
           filter={tl.filter}
           removeTodolist={removeTodolist}
           changeTaskTitle={changeTaskTitle}
           changeTodolistTitle={changeTodolistTitle}
          />
         </Paper>
        </Grid>
       );
      })}
     </Grid>
    </Container>
   </ThemeProvider>
  </div>
 );
}
export default App;
