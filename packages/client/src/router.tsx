import { createBrowserRouter, RouteObject } from "react-router-dom";
import Welcome from "./components/welcome/welcome";
import { PrivateRoute } from "./components/private/private";
import { Dashboard } from "./pages/dashboard/dashboard";

const routes: RouteObject[] = [
  // test
  { path: "/welcome", element: <Welcome /> },

  // Public route to Authentication page
  // { path: "/auth", element: <Authentication /> },

  // Private route for Dashboard under the base path
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { index: true, element: <Dashboard /> }, // Dashboard as the base route
    ],
  },
];
export const router = createBrowserRouter(routes);
