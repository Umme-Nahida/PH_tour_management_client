import App from "@/App";
import AdminLayout from "@/components/Layouts/AdminLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <div>Not found || 404</div>,
    children:[
        {
            Component: About,
            path: "/about"
        }
    ]
  },
  {
    Component: Register,
    path: "/register"
  },
  {
    Component: Login,
    path: "/login"
  },
  {
    Component: Verify,
    path: "/verify"
  },
  {
    Component: AdminLayout,
    path: "/admin",
    errorElement: <div>Not found || 404</div>,
    children:[
        {
            Component: Analytics,
            path: "analytics"
        }
    ]
  },
]);

export default router;