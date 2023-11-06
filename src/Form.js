import { useState } from "react";
import { useTodo } from "./Context/context.js";
import { v4 as uuidv4 } from "uuid";
const Form = () => {
  const { onAddNewTask } = useTodo();
  const [inputText, setInputText] = useState("");

  const onChangeInputText = (e) => {
    setInputText(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      title: inputText,
      isDone: false,
      createAt: new Date(),
      updataAt: new Date(),
    };
    onAddNewTask(newTask);
    setInputText("");
  };
  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <input
        value={inputText}
        placeholder="Enter task ..."
        onChange={onChangeInputText}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
