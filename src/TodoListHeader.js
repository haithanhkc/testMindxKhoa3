import { useTodo } from "./Context/context";

const Header = () => {
  const { taskLength } = useTodo();

  return <div className="header">You have {taskLength} tasks left!</div>;
};

export default Header;
