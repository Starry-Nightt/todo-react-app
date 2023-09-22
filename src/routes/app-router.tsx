import { Navigate, Route, Routes } from "react-router-dom";
import TodoApp from "../modules/todo/todo";
import NotFound from "../modules/not-found/not-found";
import { Auth } from "../modules/auth";
import PrivateRoute from "./private-route";
import RequireNotAuth from "./require-not-auth";

function Router() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/" element={<Navigate to="/todo" />} />
        </Route>
        <Route element={<RequireNotAuth />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
