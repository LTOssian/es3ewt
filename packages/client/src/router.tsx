import { createBrowserRouter, RouteObject } from "react-router-dom";
import Welcome from "./components/welcome/welcome";
import { PrivateRoute } from "./components/private/private";
import { Dashboard } from "./pages/dashboard/dashboard";
import { LoginForm } from "./pages/auth/login";
// import RegisterForm from "./pages/auth/register";

const routes: RouteObject[] = [
  { path: "/welcome", element: <Welcome /> },

  { path: "/auth/login", element: <LoginForm /> },
  // { path: "/auth/register", element: <RegisterForm /> },

  {
    path: "/",
    element: <PrivateRoute />,
    children: [{ index: true, element: <Dashboard /> }],
  },
];

export const router = createBrowserRouter(routes);
