import { useEffect, useMemo, useState, useCallback, useContext } from "react";
import { Todo, TodoPayload } from "../../shared/interfaces/todo.interface";
import { db } from "../../configs/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { parseResponse } from "../../shared/utils";
import { TodoPriority, TodoStatus } from "../../shared/constants";
import { AuthContext } from "../../shared/providers/auth-provider";

const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState<string>("");
  const [todoPriority, setTodoPriority] = useState<TodoPriority>(
    TodoPriority.NORMAL
  );
  const [updatedTodoName, setUpdatedTodoName] = useState<string>("");
  const [updatedTodoPriority, setUpdatedTodoPriority] = useState<TodoPriority>(
    TodoPriority.LOW
  );
  const [tab, setTab] = useState<TodoStatus>(TodoStatus.NEW);
  const [draggingTodo, setDraggingTodo] = useState<Todo>();
  const [dragoverTodo, setDragoverTodo] = useState<Todo>();
  const [dragoverList, setDragoverList] = useState<TodoStatus>();
  const { user } = useContext(AuthContext);

  const todoCollectionRef = useMemo(() => {
    return collection(db, "todos");
  }, []);

  const getTodoList = useCallback(async () => {
    try {
      const q = query(todoCollectionRef, where('email', '==', user?.email))
      const response = await getDocs(q);
      const data = parseResponse(response);
      setTodoList(data);
    } catch (err) {}
  }, [todoCollectionRef]);

  useEffect(() => {
    getTodoList();
  }, []);

  const createTodo = useCallback(async () => {
    const newTodo = {
      name: todoName,
      status: TodoStatus.NEW,
      priority: todoPriority,
      email: user?.email || ''
    };
    const response = await addDoc(todoCollectionRef, newTodo);
    setTodoList((prev) => [{ ...newTodo, id: response.id, email: user?.email || '' }, ...prev]);
  }, [todoCollectionRef, todoName, todoPriority]);

  const deleteTodo = useCallback(async (id: string) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    setTodoList((prev) => [...prev.filter((todo) => todo.id !== id)]);
  }, []);

  const updateTodo = useCallback(async (id: string, data: TodoPayload) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { ...data });
    setTodoList((prev) =>
      prev.map((item) => {
        if (item.id === id) return { ...item, ...data };
        return item;
      })
    );
  }, []);

  const handleDragEnd = useCallback(async () => {
    if (!draggingTodo || !dragoverTodo) return;
    if (draggingTodo.id === dragoverTodo.id) {
      if (draggingTodo.status === dragoverList) return;
      await updateTodo(draggingTodo.id, { status: dragoverList });
    } else {
      const newStatus = dragoverTodo.status;
      await updateTodo(draggingTodo.id, { status: newStatus });
      const newTodo = { ...draggingTodo, status: newStatus };
      const newTodoList = todoList.filter(
        (todo) => todo.id !== draggingTodo.id
      );
      const idx = todoList.findIndex((todo) => todo.id === dragoverTodo.id);
      newTodoList.splice(idx, 0, newTodo);
      setTodoList((prev) => newTodoList);
    }
  }, [draggingTodo, dragoverTodo, dragoverList, todoList]);

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
    setUpdatedTodoPriority,
    tab,
    setTab,
    draggingTodo,
    setDraggingTodo,
    dragoverTodo,
    setDragoverTodo,
    dragoverList,
    setDragoverList,
    handleDragEnd,
  };
};

export default useTodo;
