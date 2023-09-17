import React from "react";
import { TodoPriority } from "../../../shared/constants";
import { Todo } from "../../../shared/interfaces/todo.interface";
import classNames from "classnames";
import { getLabelLongName, getPriorityLabel } from "../../../shared/utils";

interface TodoItemProps {
  todo: Todo;
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

function TodoItem({
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
}: TodoItemProps) {
  const getPriorityClassName = (priority: TodoPriority) => {
    if (priority === TodoPriority.LOW) return "badge-primary";
    else if (priority === TodoPriority.NORMAL) return "badge-secondary";
    else if (priority === TodoPriority.HIGH) return "badge-error";
    return "";
  };

  return (
    <>
      <div className="card card-padding bg-base-100 shadow-xl mb-3 overflow-hidden cursor-grab active:cursor-grabbing" draggable>
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
              <p className="line-clamp">{todo.name}</p>
              <div className="card-actions justify-end mt-2">
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
                className="select select-accent w-fit"
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

export default TodoItem;
