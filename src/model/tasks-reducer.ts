import { v1 } from "uuid";
import { TasksStateType } from "../app/App";
import {
 addTodolistACtionType,
 RemoveTodolistActionType,
} from "./todolists-reducer";
export type RemoveTaskActionType = {
 type: "REMOVE-TASK";
 payload: {
  taskId: string;
  todolistId: string;
 };
};
export type AddTaskActionType = {
 type: "ADD-TASK";
 payload: {
  title: string;
  todolistId: string;
 };
};

export type ChangeTaskStatus = {
 type: "CHANGE-TASK-STATUS";
 payload: {
  taskId: string;
  taskStatus: boolean;
  todolistId: string;
 };
};
export type ChangeTaskTitle = {
 type: "CHANGE-TASK-TITLE";
 payload: {
  taskId: string;
  taskTitle: string;
  todolistId: string;
 };
};

type ActionsType =
 | RemoveTaskActionType
 | AddTaskActionType
 | ChangeTaskStatus
 | ChangeTaskTitle
 | addTodolistACtionType
 | RemoveTodolistActionType;
const initialState = {
 todolistId1: [
  { id: "1", title: "CSS", isDone: false },
  { id: "2", title: "JS", isDone: true },
  { id: "3", title: "React", isDone: false },
 ],
 todolistId2: [
  { id: "1", title: "bread", isDone: false },
  { id: "2", title: "milk", isDone: true },
  { id: "3", title: "tea", isDone: false },
 ],
};

export const tasksReducer = (
 state: TasksStateType = initialState,
 action: ActionsType
) => {
 switch (action.type) {
  case "REMOVE-TASK": {
   return {
    ...state,
    [action.payload.todolistId]: state[
     action.payload.todolistId
    ].filter((t) => t.id !== action.payload.taskId),
   };
  }
  case "ADD-TASK": {
   return {
    ...state,
    [action.payload.todolistId]: [
     {
      id: v1(),
      title: action.payload.title,
      isDone: false,
     },
     ...state[action.payload.todolistId],
    ],
   };
  }

  case "CHANGE-TASK-STATUS": {
   return {
    ...state,
    [action.payload.todolistId]: [
     ...state[action.payload.todolistId].map((t) =>
      t.id !== action.payload.taskId
       ? t
       : { ...t, isDone: action.payload.taskStatus }
     ),
    ],
   };
  }
  case "CHANGE-TASK-TITLE": {
   return {
    ...state,
    [action.payload.todolistId]: [
     ...state[action.payload.todolistId].map((t) =>
      t.id !== action.payload.taskId
       ? t
       : { ...t, title: action.payload.taskTitle }
     ),
    ],
   };
  }
  case "ADD-TODOLIST": {
   return { ...state, [action.payload.todolistId]: [] };
  }
  case "REMOVE-TODOLIST": {
   delete state[action.payload.todolistId];
   return state;
  }
  default:
   return state;
 }
};
export const removeTaskAC = (
 taskId: string,
 todolistId: string
): RemoveTaskActionType => {
 return {
  type: "REMOVE-TASK",
  payload: { taskId, todolistId },
 } as const;
};
export const addTaskAC = (
 title: string,
 todolistId: string
): AddTaskActionType => {
 return {
  type: "ADD-TASK",
  payload: { title, todolistId },
 } as const;
};
export const changeTaskStatusAC = (
 taskId: string,
 taskStatus: boolean,
 todolistId: string
): ChangeTaskStatus => {
 return {
  type: "CHANGE-TASK-STATUS",
  payload: {
   taskId,
   taskStatus,
   todolistId,
  },
 } as const;
};
export const changeTaskTitleAC = (
 taskId: string,
 taskTitle: string,
 todolistId: string
): ChangeTaskTitle => {
 return {
  type: "CHANGE-TASK-TITLE",
  payload: {
   taskId,
   taskTitle,
   todolistId,
  },
 } as const;
};
