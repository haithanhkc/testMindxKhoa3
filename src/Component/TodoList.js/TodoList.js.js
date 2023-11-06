import React from "react";
import { useTodo } from "../../Context/context.js";
import TodoRow from "../TodoRow/TodoRow.js";

const TodoList = () => {
  const { todoList = [] } = useTodo();
  const renderTodoList =
    todoList && todoList.map((task) => <TodoRow {...task} />);

  return <div className="todo-list-container">{renderTodoList}</div>;
};

export default TodoList;
