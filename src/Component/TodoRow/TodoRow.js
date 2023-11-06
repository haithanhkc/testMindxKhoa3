import React, { useState } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { useTodo } from "../../Context/context";

const TodoRow = (props) => {
  const { todoList, setTodoList } = useTodo();
  const { title, isDone, id } = props;
  const [checkBox, setCheckBox] = useState(isDone);
  const [unDoneTaskList, setunDoneTaskList] = useState([]);
  const onCheck = (id) => {
    setCheckBox(!checkBox);
    const getSingleTask = todoList.find((task) => task.id === id);
    getSingleTask.isDone = true;
    const doneTaskList = [...unDoneTaskList, getSingleTask];
    // const undoneTask = todoList.map((task) =>
    //   task.id === id ? { ...task, isDone: !task.isDone } : task
    // );
    const undoneTask = todoList.filter((task) => task.isDone === false);
    console.log("undone", undoneTask);
    // getUnDoneTasklist(id);
  };
  return (
    <>
      <div className="todo-item-container" key={id}>
        {checkBox ? (
          <div className="todo-item-container done">
            <FaRegCheckCircle
              onClick={() => onCheck(id)}
              className="item-done-button"
              color="#9a9a9a"
            />
            <div className="item-title">{title}</div>
          </div>
        ) : (
          <>
            <FaRegCircle
              onClick={() => onCheck(id)}
              className="item-done-button"
              color="#9a9a9a"
            />
            <div className="item-title">{title}</div>
          </>
        )}
      </div>
    </>
  );
};

export default TodoRow;
