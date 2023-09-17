import useTodo from "./use-todo";
import { useState, useContext } from "react";
import { Todo } from "../../shared/interfaces/todo.interface";
import TodoInput from "./components/todo-input";
import TodoList from "./components/todo-list";
import { Theme, TodoStatus } from "../../shared/constants";
import { ThemeContext } from "../../shared/providers/theme-provider";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { ThemeToggle } from "../../shared/components";

function TodoApp() {
  const {
    todoList,
    todoName,
    setTodoName,
    todoPriority,
    setTodoPriority,
    createTodo,
    deleteTodo,
    updateTodo,
    updatedTodoName,
    setUpdatedTodoName,
    updatedTodoPriority,
    setUpdatedTodoPriority,
  } = useTodo();

  const [canUpdate, setCanUpdate] = useState<string>("");
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === Theme.DARK) setTheme(Theme.LIGHT);
    else setTheme(Theme.DARK);
  };

  const handleUpdateTodo = (todo: Todo) => {
    setUpdatedTodoName(todo.name);
    setCanUpdate(todo.id);
  };

  const handleCancelUpdateTodo = () => {
    setCanUpdate("");
  };

  const handleSave = async (id: string) => {
    await updateTodo(id, {
      name: updatedTodoName,
      priority: updatedTodoPriority,
    });
    setCanUpdate("");
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 pt-10 w-full">
      <div className="flex items-center mb-20 justify-between w-full max-w-2xl">
        <h2 className="text-5xl uppercase font-semibold text-white tracking-widest font-sans text-center">
          Todo Task
        </h2>
        <ThemeToggle value={theme} onClick={toggleTheme} />
      </div>
      <TodoInput
        todoName={todoName}
        todoPriority={todoPriority}
        setTodoName={setTodoName}
        setTodoPriority={setTodoPriority}
        createTodo={createTodo}
      />
      <div className="bg-neutral-100 rounded-lg p-5 flex gap-5">
        <TodoList
          status={TodoStatus.NEW}
          todoList={todoList}
          canUpdate={canUpdate}
          updatedTodoName={updatedTodoName}
          updatedTodoPriority={updatedTodoPriority}
          setCanUpdate={setCanUpdate}
          setUpdatedTodoName={setUpdatedTodoName}
          setUpdatedTodoPriority={setUpdatedTodoPriority}
          onSave={handleSave}
          onCancelUpdateTodo={handleCancelUpdateTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={handleUpdateTodo}
        />
        <TodoList
          status={TodoStatus.IN_PROGRESS}
          todoList={todoList}
          canUpdate={canUpdate}
          updatedTodoName={updatedTodoName}
          updatedTodoPriority={updatedTodoPriority}
          setCanUpdate={setCanUpdate}
          setUpdatedTodoName={setUpdatedTodoName}
          setUpdatedTodoPriority={setUpdatedTodoPriority}
          onSave={handleSave}
          onCancelUpdateTodo={handleCancelUpdateTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={handleUpdateTodo}
        />
        <TodoList
          status={TodoStatus.COMPLETED}
          todoList={todoList}
          canUpdate={canUpdate}
          updatedTodoName={updatedTodoName}
          updatedTodoPriority={updatedTodoPriority}
          setCanUpdate={setCanUpdate}
          setUpdatedTodoName={setUpdatedTodoName}
          setUpdatedTodoPriority={setUpdatedTodoPriority}
          onSave={handleSave}
          onCancelUpdateTodo={handleCancelUpdateTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={handleUpdateTodo}
        />
      </div>
    </div>
  );
}

export default TodoApp;
