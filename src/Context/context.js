import { createContext, useContext, useState } from "react";

export const TodoContext = createContext();

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const GetTaskTitle = JSON.parse(localStorage.getItem("Title"));
  const [todoList, setTodoList] = useState(GetTaskTitle || []);

  const onAddNewTask = (newTask) => {
    const newTaskList = [...todoList, newTask];
    const StrSaveNewTask = JSON.stringify(newTaskList);
    localStorage.setItem("Title", StrSaveNewTask);
    setTodoList(newTaskList);
  };
  const taskLength = todoList.length;

  //   const getUnDoneTasklist = (id) => {
  //     const unDoneList = todoList.sort((task) =>  )
  //   }
  const value = {
    todoList,
    setTodoList,
    onAddNewTask,
    taskLength,
    // getUnDoneTasklist,
  };

  return (
    <TodoContext.Provider value={value}> {children} </TodoContext.Provider>
  );
};
