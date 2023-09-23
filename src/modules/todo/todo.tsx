import useTodo from "./use-todo";
import { useState, useContext, useCallback } from "react";
import { Todo } from "../../shared/interfaces/todo.interface";
import TodoInput from "./components/todo-input";
import TodoList from "./components/todo-list";
import { Theme, TodoStatus } from "../../shared/constants";
import { ThemeContext } from "../../shared/providers/theme-provider";
import { ThemeToggle } from "../../shared/components";
import { getStatusLabel } from "../../shared/utils";
import classNames from "classnames";

function TodoApp() {
  const {
    todoList,
    setTodoList,
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
    tab,
    setTab,
    setDraggingTodo,
    setDragoverTodo,
    setDragoverList,
    handleDragEnd,
    draggingTodo,
  } = useTodo();

  const [canUpdate, setCanUpdate] = useState<string>("");
  const { isDarkTheme } = useContext(ThemeContext);

  const handleUpdateTodo = useCallback((todo: Todo) => {
    setUpdatedTodoName(todo.name);
    setCanUpdate(todo.id);
  }, []);

  const handleCancelUpdateTodo = useCallback(() => {
    setCanUpdate("");
  }, []);

  const handleSave = useCallback(
    async (id: string) => {
      await updateTodo(id, {
        name: updatedTodoName,
        priority: updatedTodoPriority,
      });
      setCanUpdate("");
    },
    [updatedTodoName, updatedTodoPriority]
  );

  const handleUpdateStatus = useCallback(
    async (id: string, status: TodoStatus) => {
      await updateTodo(id, {
        status,
      });
      const _todoList = todoList.map((todo) => {
        if (todo.id === id) todo.status = status;
        return todo;
      });
      setTodoList(_todoList);
    },
    [todoList]
  );

  const isActiveTab = useCallback(
    (currentTab: TodoStatus) => {
      return currentTab === tab;
    },
    [tab]
  );

  return (
    <div className="flex flex-col justify-center items-center p-4 pt-10 w-full">
      <div className="flex items-center mb-10 justify-between w-full max-w-2xl md:mb-20">
        <h2 className="text-3xl uppercase font-semibold text-white tracking-wide md:tracking-widest font-sans text-center md:text-5xl select-none">
          Task Manager
        </h2>
        <ThemeToggle size={40} />
      </div>
      <TodoInput
        todoName={todoName}
        todoPriority={todoPriority}
        setTodoName={setTodoName}
        setTodoPriority={setTodoPriority}
        createTodo={createTodo}
      />
      <div
        className={classNames(
          "bg-neutral-100 rounded-lg p-5 md:hidden w-full",
          {
            "bg-slate-700": isDarkTheme,
          }
        )}
      >
        <div className="tabs w-full mb-3">
          <button
            className={classNames("tab tab-md tab-lifted font-semibold", {
              "tab-active": isActiveTab(TodoStatus.NEW),
              "text-white": isDarkTheme && !isActiveTab(TodoStatus.NEW),
            })}
            onClick={() => setTab(TodoStatus.NEW)}
          >
            {getStatusLabel(TodoStatus.NEW)}
          </button>
          <button
            className={classNames("tab tab-md tab-lifted font-semibold", {
              "tab-active": isActiveTab(TodoStatus.IN_PROGRESS),
              "text-white": isDarkTheme && !isActiveTab(TodoStatus.IN_PROGRESS),
            })}
            onClick={() => setTab(TodoStatus.IN_PROGRESS)}
          >
            {getStatusLabel(TodoStatus.IN_PROGRESS)}
          </button>
          <button
            className={classNames("tab tab-md tab-lifted font-semibold", {
              "tab-active": isActiveTab(TodoStatus.COMPLETED),
              "text-white ": isDarkTheme && !isActiveTab(TodoStatus.COMPLETED),
            })}
            onClick={() => setTab(TodoStatus.COMPLETED)}
          >
            {getStatusLabel(TodoStatus.COMPLETED)}
          </button>
        </div>
        <TodoList
          status={tab}
          todoList={todoList}
          canUpdate={canUpdate}
          updatedTodoName={updatedTodoName}
          updatedTodoPriority={updatedTodoPriority}
          setUpdatedTodoName={setUpdatedTodoName}
          setUpdatedTodoPriority={setUpdatedTodoPriority}
          onSave={handleSave}
          onCancelUpdateTodo={handleCancelUpdateTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={handleUpdateTodo}
          onUpdateStatus={handleUpdateStatus}
          setDraggingTodo={setDraggingTodo}
          setDragoverTodo={setDragoverTodo}
          setDragoverList={setDragoverList}
          handleDragEnd={handleDragEnd}
        />
      </div>

      <div
        className={classNames(
          "bg-neutral-100 rounded-lg p-5 hidden md:flex w-full max-w-6xl gap-5",
          {
            "bg-slate-700": isDarkTheme,
          }
        )}
      >
        <div className="w-1/3 ">
          <TodoList
            status={TodoStatus.NEW}
            todoList={todoList}
            canUpdate={canUpdate}
            updatedTodoName={updatedTodoName}
            updatedTodoPriority={updatedTodoPriority}
            setUpdatedTodoName={setUpdatedTodoName}
            setUpdatedTodoPriority={setUpdatedTodoPriority}
            onSave={handleSave}
            onCancelUpdateTodo={handleCancelUpdateTodo}
            onDeleteTodo={deleteTodo}
            onUpdateTodo={handleUpdateTodo}
            onUpdateStatus={handleUpdateStatus}
            setDraggingTodo={setDraggingTodo}
            setDragoverTodo={setDragoverTodo}
            setDragoverList={setDragoverList}
            handleDragEnd={handleDragEnd}
            draggingTodo={draggingTodo}
          />
        </div>
        <div className="w-1/3 ">
          <TodoList
            status={TodoStatus.IN_PROGRESS}
            todoList={todoList}
            canUpdate={canUpdate}
            updatedTodoName={updatedTodoName}
            updatedTodoPriority={updatedTodoPriority}
            setUpdatedTodoName={setUpdatedTodoName}
            setUpdatedTodoPriority={setUpdatedTodoPriority}
            onSave={handleSave}
            onCancelUpdateTodo={handleCancelUpdateTodo}
            onDeleteTodo={deleteTodo}
            onUpdateTodo={handleUpdateTodo}
            onUpdateStatus={handleUpdateStatus}
            setDraggingTodo={setDraggingTodo}
            setDragoverTodo={setDragoverTodo}
            setDragoverList={setDragoverList}
            handleDragEnd={handleDragEnd}
            draggingTodo={draggingTodo}
          />
        </div>
        <div className="w-1/3 ">
          <TodoList
            status={TodoStatus.COMPLETED}
            todoList={todoList}
            canUpdate={canUpdate}
            updatedTodoName={updatedTodoName}
            updatedTodoPriority={updatedTodoPriority}
            setUpdatedTodoName={setUpdatedTodoName}
            setUpdatedTodoPriority={setUpdatedTodoPriority}
            onSave={handleSave}
            onCancelUpdateTodo={handleCancelUpdateTodo}
            onDeleteTodo={deleteTodo}
            onUpdateTodo={handleUpdateTodo}
            onUpdateStatus={handleUpdateStatus}
            setDraggingTodo={setDraggingTodo}
            setDragoverTodo={setDragoverTodo}
            setDragoverList={setDragoverList}
            handleDragEnd={handleDragEnd}
            draggingTodo={draggingTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
