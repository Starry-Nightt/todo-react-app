import React from "react";
import { TodoPriority, TodoStatus } from "../../../shared/constants";
import { Todo } from "../../../shared/interfaces/todo.interface";
import TodoItem from "./todo-item";
import { getStatusLabel } from "../../../shared/utils";
import { TbMoodEmpty } from "react-icons/tb";

interface TodoListProps {
  status: TodoStatus;
  todoList: Todo[];
  canUpdate: string;
  updatedTodoName: string;
  updatedTodoPriority: TodoPriority;
  draggingTodo?: Todo;
  dragoverTodo?: Todo;
  dragoverList?: TodoStatus;
  setCanUpdate: any;
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
}

function TodoList({
  status,
  todoList,
  canUpdate,
  updatedTodoName,
  updatedTodoPriority,
  dragoverList,
  setCanUpdate,
  setUpdatedTodoName,
  setUpdatedTodoPriority,
  onSave,
  onCancelUpdateTodo,
  onUpdateTodo,
  onDeleteTodo,
  onUpdateStatus,
  draggingTodo,
  dragoverTodo,
  setDraggingTodo,
  setDragoverTodo,
  setDragoverList
}: TodoListProps) {
  const _todoList = todoList.filter((todo) => todo.status === status);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('over list')
    setDragoverList(status)
  }

  return (
    <div className="w-full h-full" onDragOver={onDragOver} >
      <h2 className="text-lg font-semibold text-neutral-600 text-center hidden md:block">
        {getStatusLabel(status)} ({todoList.length})
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
              setCanUpdate={setCanUpdate}
              setUpdatedTodoName={setUpdatedTodoName}
              setUpdatedTodoPriority={setUpdatedTodoPriority}
              onSave={onSave}
              onCancelUpdateTodo={onCancelUpdateTodo}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodo={onUpdateTodo}
              onUpdateStatus={onUpdateStatus}
              draggingTodo={draggingTodo}
              dragoverTodo={dragoverTodo}
              setDraggingTodo={setDraggingTodo}
              setDragoverTodo={setDragoverTodo}
              dragoverList={dragoverList}
              setDragoverList={setDragoverList}
            />
          ))
        ) : (
          <div className="card md:hidden">
            <div className="card-body">
              <p className="card-title">
                Empty <TbMoodEmpty size={40}></TbMoodEmpty>
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

export default TodoList;
