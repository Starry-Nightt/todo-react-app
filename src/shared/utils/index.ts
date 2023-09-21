import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Todo } from "../interfaces/todo.interface";
import { TodoPriority, TodoStatus } from "../constants";

export const parseResponse = (
  res: QuerySnapshot<DocumentData, DocumentData>
) => {
  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Todo[];
};

export const getPriorityLabel = (priority: TodoPriority) => {
  if (priority === TodoPriority.LOW) return "Low";
  else if (priority === TodoPriority.NORMAL) return "Normal";
  else if (priority === TodoPriority.HIGH) return "High";
};

export const getStatusLabel = (status: TodoStatus) => {
  if (status === TodoStatus.NEW) return "New";
  else if (status === TodoStatus.IN_PROGRESS) return "In Progress";
  else return "Completed";
};

export const getLabelLongName = (label: string) => {
  if (label.length <= 25) return label;
  return label.slice(0, 25) + "...";
};

export const getKey = (key: string) => {
  const val = localStorage.getItem(key);
  if (val) {
    return JSON.parse(val);
  } else return null;
};

export const setKey = (key: string, val: any) => {
  if (val) localStorage.setItem(key, JSON.stringify(val));
};
