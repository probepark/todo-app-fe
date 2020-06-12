import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { actions, RootState, selectTodoList, Todo } from "../features";
import React from "react";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector<RootState, Todo[]>((state) =>
    selectTodoList(state.todos)
  );
  const handleCheckbox = useCallback(
    (item: Todo) => {
      dispatch(actions.toggleTodos(item));
    },
    [dispatch]
  );
  return (
    <ul>
      {todoList.map((item: Todo) => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={handleCheckbox.bind({}, item)}
              className="chk-input"
            />
            <span className={item.isDone ? "txt-complete" : ""}>
              {item.title}
              <br />
              {item.description}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
