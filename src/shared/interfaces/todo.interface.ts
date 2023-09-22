import { TodoPriority, TodoStatus } from "../constants";

export interface Todo {
  id: string;
  name: string;
  status: TodoStatus;
  priority: TodoPriority;
  email: string;
}

export interface TodoPayload {
  name?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
}
