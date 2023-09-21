import React, { memo, useContext } from "react";
import { TodoPriority, TodoStatus } from "../../../shared/constants";
import { Todo } from "../../../shared/interfaces/todo.interface";
import TodoItem from "./todo-item";
import { getStatusLabel } from "../../../shared/utils";
import { TbMoodEmpty } from "react-icons/tb";
import classNames from "classnames";
import { ThemeContext } from "../../../shared/providers/theme-provider";

interface TodoListProps {
  status: TodoStatus;
  todoList: Todo[];
  canUpdate: string;
  updatedTodoName: string;
  updatedTodoPriority: TodoPriority;
  setUpdatedTodoName: any;
  setUpdatedTodoPriority: any;
  onSave: any;
  onCancelUpdateTodo: any;
  onUpdateTodo: any;
  onDeleteTodo: any;
  onUpdateStatus: any;
  setDraggingTodo: any;
  setDragoverTodo: any;
  setDragoverList: any;
  handleDragEnd: any;
}

function TodoList({
  status,
  todoList,
  canUpdate,
  updatedTodoName,
  updatedTodoPriority,
  setUpdatedTodoName,
  setUpdatedTodoPriority,
  onSave,
  onCancelUpdateTodo,
  onUpdateTodo,
  onDeleteTodo,
  onUpdateStatus,
  setDraggingTodo,
  setDragoverTodo,
  setDragoverList,
  handleDragEnd,
}: TodoListProps) {
  const _todoList = todoList.filter((todo) => todo.status === status);
  const { isDarkTheme } = useContext(ThemeContext);
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    setDragoverList(status);
  };
  return (
    <div className="w-full h-full" onDragOver={onDragOver}>
      <h2
        className={classNames(
          "text-lg font-semibold text-neutral-600 text-center hidden md:block",
          {
            "text-gray-300": isDarkTheme,
          }
        )}
      >
        {getStatusLabel(status)}{" "}
        {_todoList.length ? `(${_todoList.length})` : null}
      </h2>
      <div className="divider hidden md:flex"></div>
      {!!_todoList.length ? (
        _todoList.map((todo) => (
          <TodoItem
            status={status}
            key={todo.id}
            todo={todo}
            canUpdate={canUpdate}
            updatedTodoName={updatedTodoName}
            updatedTodoPriority={updatedTodoPriority}
            setUpdatedTodoName={setUpdatedTodoName}
            setUpdatedTodoPriority={setUpdatedTodoPriority}
            onSave={onSave}
            onCancelUpdateTodo={onCancelUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
            onUpdateStatus={onUpdateStatus}
            setDraggingTodo={setDraggingTodo}
            setDragoverTodo={setDragoverTodo}
            setDragoverList={setDragoverList}
            handleDragEnd={handleDragEnd}
          />
        ))
      ) : (
        <div className="card md:hidden">
          <div
            className={classNames("card-body", {
              "text-white": isDarkTheme,
            })}
          >
            <p className="card-title">
              Empty <TbMoodEmpty size={40}></TbMoodEmpty>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(TodoList);
