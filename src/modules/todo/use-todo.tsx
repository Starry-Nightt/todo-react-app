import { useEffect, useMemo, useRef, useState } from "react";
import { Todo, TodoPayload } from "../../shared/interfaces/todo.interface";
import { db } from "../../configs/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { parseResponse } from "../../shared/utils";
import { TodoPriority, TodoStatus } from "../../shared/constants";

const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState<string>("");
  const [todoPriority, setTodoPriority] = useState<TodoPriority>(
    TodoPriority.NORMAL
  );
  const [updatedTodoName, setUpdatedTodoName] = useState<string>("");
  const [updatedTodoPriority, setUpdatedTodoPriority] = useState<TodoPriority>(TodoPriority.LOW);

  const todoCollectionRef = useMemo(() => {
    return collection(db, "todos");
  }, [db]);

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    try {
      const response = await getDocs(todoCollectionRef);
      const data = parseResponse(response);
      setTodoList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTodo = async () => {
    const newTodo = {
      name: todoName,
      status: TodoStatus.NEW,
      priority: todoPriority,
    };
    const response = await addDoc(todoCollectionRef, newTodo);
    setTodoList((prev) => [{ ...newTodo, id: response.id }, ...prev]);
  };

  const deleteTodo = async (id: string) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    setTodoList((prev) => [...prev.filter((todo) => todo.id !== id)]);
  };

  const updateTodo = async (id: string, data: TodoPayload) => {
    const todoDoc = doc(db, "todos", id)
    await updateDoc(todoDoc, {...data})
    setTodoList(prev => prev.map(item => {
        if (item.id === id) return {...item, ...data}
        return item
    }))
  };

  return {
    todoList,
    setTodoList,
    todoName,
    setTodoName,
    todoPriority,
    setTodoPriority,
    createTodo,
    deleteTodo,
    updatedTodoName,
    setUpdatedTodoName,
    updateTodo,
    updatedTodoPriority,
    setUpdatedTodoPriority
  };
};

export default useTodo;
