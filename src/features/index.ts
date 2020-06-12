import {
  combineReducers,
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { generate as generateRandomStr } from "randomstring";

export interface Todo {
  id?: string;
  title: string;
  description?: string;
  isDone?: boolean;
}

export interface TodoList {
  list: Todo[];
}

const initialState: TodoList = {
  list: [],
};
const actionPrefix = "TODOS";
const addTodos = createAction<object>(`${actionPrefix}/add`);
const toggleTodos = createAction<object>(`${actionPrefix}/toggle`);
const fetchTodos = createAction<object>(`${actionPrefix}/fetch`);
const reducers = {
  add: (
    { list }: TodoList,
    { payload: { title, description, isDone } }: PayloadAction<Todo>
  ) => {
    console.log(title);
    const newTodo: Todo = {
      title: title.toString(),
      description: description,
      isDone,
    };
    list.push(newTodo);
  },
  toggle: (
    { list }: TodoList,
    { payload: { id, isDone } }: PayloadAction<Todo>
  ) => {
    const targetIndex = list.findIndex((item: Todo) => item.id === id);
    list[targetIndex].isDone = !isDone;
  },
  fetch: ({ list }: TodoList, { payload }: PayloadAction<Todo[]>) => {
    list.push(...payload);
  },
};
const todoSlice = createSlice({
  reducers,
  initialState,
  name: actionPrefix,
});
export const selectTodoList = createSelector(
  (state: TodoList) => state.list,
  (list: Todo[]) => list
);
export const actions = {
  addTodos,
  toggleTodos,
  fetchTodos,
};
export const rootReducer = combineReducers({
  todos: todoSlice.reducer,
});
console.log(todoSlice);
export type RootState = ReturnType<typeof rootReducer>;
