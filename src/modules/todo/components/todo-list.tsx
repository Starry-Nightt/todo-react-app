import React from "react";
import { TodoPriority, TodoStatus } from "../../../shared/constants";
import { Todo } from "../../../shared/interfaces/todo.interface";
import TodoItem from "./todo-item";
import { getStatusLabel } from "../../../shared/utils";

interface TodoListProps {
  status: TodoStatus;
  todoList: Todo[];
  canUpdate: string;
  updatedTodoName: string;
  updatedTodoPriority: TodoPriority;
  setCanUpdate: any;
  setUpdatedTodoName: any;
  setUpdatedTodoPriority: any;
  onSave: any;
  onCancelUpdateTodo: any;
  onUpdateTodo: any;
  onDeleteTodo: any;
}

function TodoList({
  status,
  todoList,
  canUpdate,
  updatedTodoName,
  updatedTodoPriority,
  setCanUpdate,
  setUpdatedTodoName,
  setUpdatedTodoPriority,
  onSave,
  onCancelUpdateTodo,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListProps) {
  return (
      <ul className="w-1/3 max-w-xs">
        <h2 className="text-lg font-semibold text-neutral-600 text-center">{getStatusLabel(status)} ({todoList.length})</h2>
        <div className="divider"></div>
        {!!todoList.length &&
          todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              canUpdate={canUpdate}
              updatedTodoName={updatedTodoName}
              updatedTodoPriority={updatedTodoPriority}
              setCanUpdate={setCanUpdate}
              setUpdatedTodoName={setUpdatedTodoName}
              setUpdatedTodoPriority={setUpdatedTodoPriority}
              onSave={onSave}
              onCancelUpdateTodo={onCancelUpdateTodo}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
      </ul>
  );
}

export default TodoList;
