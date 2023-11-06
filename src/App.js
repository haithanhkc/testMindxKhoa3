import "./styles.css";
// import TodoList from "./TodoList";
import TodoList from "./Component/TodoList.js/TodoList.js";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { TodoProvider } from "./Context/context.js";
function App() {
  return (
    <div className="App">
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </TodoProvider>
    </div>
  );
}

const Home = () => {
  return (
    <div className="App">
      <div className="container">
        <TodoListHeader />
        <TodoList />
        <Form />
      </div>
      <Footer />
    </div>
  );
};

export default App;
