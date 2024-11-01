import { createBrowserRouter, RouteObject } from "react-router-dom";
import Welcome from "./components/welcome/welcome";
import { PrivateRoute } from "./components/private/private";
import { Dashboard } from "./pages/dashboard/dashboard";
import { AuthForm } from "./pages/auth/auth";

const routes: RouteObject[] = [
  { path: "/welcome", element: <Welcome /> },

  { path: "/auth/login", element: <AuthForm isRegister={false} /> },
  { path: "/auth/register", element: <AuthForm isRegister={true} /> },

  {
    path: "/",
    element: <PrivateRoute />,
    children: [{ index: true, element: <Dashboard /> }],
  },
];

export const router = createBrowserRouter(routes);
