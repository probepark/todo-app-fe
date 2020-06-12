import React, { useEffect } from "react";
import "./App.css";
import TodoEditor from "./components/todo_editor";
import TodoList from "./components/todo_list";
import { useDispatch } from "react-redux";
import { actions, Todo } from "./features";
import axios from "axios";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get<Todo>("http://localhost:8080/api/todos").then((response) => {
      dispatch(actions.fetchTodos(response.data));
    });
  }, []);
  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <TodoEditor />
      <TodoList />
    </div>
  );
};

export default App;
