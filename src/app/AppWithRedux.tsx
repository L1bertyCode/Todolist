import { useCallback, useState } from "react";
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
import {
 addTodolistAC,
 changeTodolistFilterAC,
 changeTodolistTitleAC,
 removeTodolistAC,
 todolistsReducer,
} from "../model/todolists-reducer";
import {
 addTaskAC,
 changeTaskStatusAC,
 changeTaskTitleAC,
 removeTaskAC,
 tasksReducer,
} from "../model/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";

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
function AppWithRedux() {
 const todolists = useSelector<
  AppRootStateType,
  Array<TodolistType>
 >((state) => state.todolists);
 const tasks = useSelector<
  AppRootStateType,
  TasksStateType
 >((state) => state.tasks);
 const dispatch = useDispatch();
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

 //  let todolistID1 = v1();
 //  let todolistID2 = v1();

 //  let [todolists, dispatch] = useReducer(
 //   todolistsReducer,
 //   [
 //    {
 //     id: todolistID1,
 //     title: "What to learn",
 //     filter: "all",
 //    },
 //    { id: todolistID2, title: "What to buy", filter: "all" },
 //   ]
 //  );

 //  let [tasks, dispatch] = useReducer(tasksReducer, {
 //   [todolistID1]: [
 //    { id: v1(), title: "HTML&CSS", isDone: true },
 //    { id: v1(), title: "JS", isDone: true },
 //    { id: v1(), title: "ReactJS", isDone: false },
 //   ],
 //   [todolistID2]: [
 //    { id: v1(), title: "Rest API", isDone: true },
 //    { id: v1(), title: "GraphQL", isDone: false },
 //   ],
 //   [todolistID2]: [
 //    { id: v1(), title: "Rest API", isDone: true },
 //    { id: v1(), title: "GraphQL", isDone: false },
 //   ],
 //  });

 //  Tasks
 const removeTask = useCallback(
  (taskId: string, todolistId: string) => {
   const action = removeTaskAC(taskId, todolistId);
   dispatch(action);
  },
  []
 );

 const addTask = useCallback(
  (title: string, todolistId: string) => {
   const action = addTaskAC(title, todolistId);
   dispatch(action);
  },
  []
 );

 const changeTaskStatus = useCallback(
  (
   taskId: string,
   taskStatus: boolean,
   todolistId: string
  ) => {
   const action = changeTaskStatusAC(
    taskId,
    taskStatus,
    todolistId
   );
   dispatch(action);
  },
  []
 );

 const changeTaskTitle = useCallback(
  (todolistId: string, taskId: string, title: string) => {
   const action = changeTaskTitleAC(
    taskId,
    title,
    todolistId
   );
   dispatch(action);
  },
  []
 );
 //  Todolist
 const changeFilter = useCallback(
  (todolistId: string, filter: FilterValuesType) => {
   const action = changeTodolistFilterAC(
    todolistId,
    filter
   );
   dispatch(action);
  },
  []
 );
 const removeTodolist = useCallback(
  (todolistId: string) => {
   const action = removeTodolistAC(todolistId);
   dispatch(action);
  },
  []
 );

 const addTodolist = useCallback(
  (todolistTitle: string) => {
   const action = addTodolistAC(todolistTitle);
   dispatch(action);
  },
  []
 );
 const changeTodolistTitle = useCallback(
  (id: string, title: string) => {
   const action = changeTodolistTitleAC(id, title);
   dispatch(action);
  },
  []
 );
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
      {todolists.map((tl) => {
       return (
        <Grid key={tl.id}>
         <Paper sx={{ p: "0 20px 20px 20px" }}>
          <Todolist
           todolistId={tl.id}
           key={tl.id}
           title={tl.title}
           tasks={tasks[tl.id]}
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
export default AppWithRedux;
