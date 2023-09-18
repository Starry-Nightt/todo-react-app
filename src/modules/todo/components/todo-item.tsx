import React, { memo } from "react";
import { TodoPriority, TodoStatus } from "../../../shared/constants";
import { Todo } from "../../../shared/interfaces/todo.interface";
import classNames from "classnames";
import {  getPriorityLabel } from "../../../shared/utils";
import { BsSendCheck } from "react-icons/bs";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";

interface TodoItemProps {
  status: TodoStatus;
  todo: Todo;
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
  setDragoverTodo: any;
  setDraggingTodo: any;
  setDragoverList: any;
  handleDragEnd: any;
}

function TodoItem({
  status,
  todo,
  canUpdate,
  updatedTodoName,
  setUpdatedTodoName,
  updatedTodoPriority,
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
}: TodoItemProps) {
  const getPriorityClassName = (priority: TodoPriority) => {
    if (priority === TodoPriority.LOW) return "badge-primary";
    else if (priority === TodoPriority.NORMAL) return "badge-secondary";
    else if (priority === TodoPriority.HIGH) return "badge-error";
    return "";
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDraggingTodo(todo);
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEnd();
    setDraggingTodo(null);
    setDragoverTodo(null);
    setDragoverList(null)
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDragoverTodo(todo);
  };


  return (
    <>
      <div
        className="card card-padding bg-base-100 shadow-xl mb-3 overflow-hidden md:cursor-grab md:active:cursor-grabbing"
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragEnter={onDragOver}
      >
        <div className="bg-neutral-300 top-0 left-0 bottom-0 w-2 absolute"></div>
        <div className="card-body">
          {canUpdate !== todo.id ? (
            <>
              <span
                className={classNames(
                  "uppercase text-xs badge -translate-x-1 font-medium",
                  {
                    [getPriorityClassName(todo.priority)]: true,
                  }
                )}
              >
                {getPriorityLabel(todo.priority)}
              </span>
              <div className="flex">
                <p className="line-clamp">{todo.name}</p>
                {status === TodoStatus.NEW ? (
                  <button
                    className="btn btn-success btn-square btn-outline md:hidden"
                    onClick={() =>
                      onUpdateStatus(todo.id, TodoStatus.IN_PROGRESS)
                    }
                  >
                    <BsSendCheck />
                  </button>
                ) : status === TodoStatus.IN_PROGRESS ? (
                  <button
                    className="btn btn-success btn-square btn-outline md:hidden"
                    onClick={() =>
                      onUpdateStatus(todo.id, TodoStatus.COMPLETED)
                    }
                  >
                    <AiOutlineCheck />
                  </button>
                ) : null}
              </div>
              <div className="card-actions justify-end mt-2">
                {status === TodoStatus.IN_PROGRESS && <button
                  className="btn btn-warning btn-square btn-outline mr-auto md:hidden"
                  onClick={() => onUpdateStatus(todo.id, TodoStatus.NEW)}
                >
                  <IoReturnDownBackOutline />
                </button>}
                <button
                  className="btn btn-warning"
                  onClick={() => onUpdateTodo(todo)}
                >
                  Update
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <select
                className="select select-accent w-fit select-sm"
                value={updatedTodoPriority}
                onChange={(e) => setUpdatedTodoPriority(Number(e.target.value))}
              >
                <option value={TodoPriority.LOW}>Low</option>
                <option value={TodoPriority.NORMAL}>Normal</option>
                <option value={TodoPriority.HIGH}>High</option>
              </select>
              <input
                className="input input-accent"
                value={updatedTodoName}
                onChange={(e) => setUpdatedTodoName(e.target.value)}
              />
              <div className="card-actions justify-end mt-2">
                <button
                  className="btn btn-success"
                  onClick={() => onSave(todo.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={onCancelUpdateTodo}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(TodoItem);
