import React, { LegacyRef, MutableRefObject, memo, useRef } from "react";
import { TodoPriority } from "../../../shared/constants";

interface TodoInputProps {
  todoName: string;
  todoPriority: TodoPriority;
  setTodoName: any;
  setTodoPriority: any;
  createTodo: () => {};
}

function TodoInput({
  todoName,
  setTodoName,
  createTodo,
  todoPriority,
  setTodoPriority,
}: TodoInputProps) {
  const inputRef = useRef<any>();

  const handleCreateTodo = () => {
    if (!todoName.trim().length) return;
    setTodoName("");
    inputRef.current.focus();
    createTodo();
  };

  const onKeyUpCreateTodo = (e: any) => {
    const enter = "Enter";
    if (e.key === enter) handleCreateTodo();
  };

  return (
    <>
      <div className="w-full pb-3  md:hidden">
        <select
          className="select select-sm font-semibold"
          value={todoPriority}
          onChange={(e) => setTodoPriority(Number(e.target.value))}
        >
          <option className="py-2" value={TodoPriority.LOW}>
            Low
          </option>
          <option className="py-2" value={TodoPriority.NORMAL}>
            Normal
          </option>
          <option className="py-2" value={TodoPriority.HIGH}>
            High
          </option>
        </select>
      </div>
      <div className="flex w-full bg-neutral-100 rounded-lg mb-4 max-w-2xl overflow-hidden md:mb-6">
        <select
          className="select font-semibold text-lg hidden md:block"
          value={todoPriority}
          onChange={(e) => setTodoPriority(Number(e.target.value))}
        >
          <option className="py-2" value={TodoPriority.LOW}>
            Low
          </option>
          <option className="py-2" value={TodoPriority.NORMAL}>
            Normal
          </option>
          <option className="py-2" value={TodoPriority.HIGH}>
            High
          </option>
        </select>
        <input
          className="flex-1 outline-none border-none px-2 tracking-wider text-sm md:text-lg"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          onKeyUp={onKeyUpCreateTodo}
          ref={inputRef}
          placeholder="Add a new task..."
        />
        <button className="btn bg-white border-none" onClick={handleCreateTodo}>
          Add
        </button>
      </div>
    </>
  );
}

export default memo(TodoInput);
