import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(() => {
    const saved = localStorage.getItem("showFinished");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("showFinished", JSON.stringify(showFinished));
  }, [showFinished]);

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.length > 3) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="md:container bg-[#e1e9ea] mx-3 md:mx-auto my-5 py-5 px-6 rounded-xl min-h-[85vh] md:w-1/2">
        <h1 className="taskify text-center text-[27px] mb-[15px] font-bold">
          TASKIFY – Where Todos Turn Into Dones!
        </h1>

        {/* Add Task Section */}
        <div className="addTodo">
          <h1 className="add text-center md:text-start font-bold text-[22px] md:mb-[12px] mt-[12px]">
            Add Task
          </h1>

          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your task"
              className="py-[5px] px-[11px] w-full md:w-[83%] bg-white text-black rounded-full"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="font-sans font-bold w-full md:w-auto rounded-full py-[5px] px-[11px] bg-[#1f5861] text-white hover:bg-[#387984] disabled:bg-[#1f5861] whitespace-nowrap"
            >
              Save Task
            </button>
          </div>

          <div className="check-box flex text-center mt-[25px] mb-[11px] items-center">
            <input
              onChange={toggleFinished}
              className="mr-[5px] w-[15px] h-[15px]"
              type="checkbox"
              checked={showFinished}
            />
            <p>Show Done Tasks</p>
          </div>
          <div className="h-px bg-gray-400 mx-auto w-[91%]"></div>
        </div>

        {/* Task List */}
        <h1 className="font-bold text-[22px] my-[5px]">My Taskboard</h1>
        <div className="todos">
          {todos.length === 0 && (
            <div className="text-[20px] font-medium font-sans">
              THERE IS NO TASK TO BE DONE
            </div>
          )}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo md:w-full flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="w-[15px] h-[15px]"
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="rounded-[5px] bg-[#1f5861] hover:bg-[#387984] text-white mx-[5px] my-1 py-[8px] px-[8px]"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="rounded-[5px] bg-[#1f5861] hover:bg-[#387984] text-white mx-[5px] my-1 py-[3px] px-[5px] text-[25px]"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;