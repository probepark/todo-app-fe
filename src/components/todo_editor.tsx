import { useDispatch } from "react-redux";
import { ChangeEvent, useCallback, useState } from "react";
import { actions } from "../features";
import React from "react";
import axios from "axios";
const TodoEditor = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState<string>("");
  const handleText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);
  const handleEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (inputText && e.keyCode === 13) {
        const todo = {
          title: inputText,
          description: `${inputText} description`,
          isDone: false,
        };
        axios.post("http://localhost:8080/api/todos", todo).then(() => {
          dispatch(actions.addTodos(todo));
          setInputText("");
        });
      }
    },
    [dispatch, inputText]
  );
  return (
    <div>
      <input
        type="text"
        onChange={handleText}
        onKeyDown={handleEnter}
        value={inputText}
        className="txt-input"
        placeholder="write something here..."
      />
    </div>
  );
};

export default TodoEditor;
