import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layout";
import Error from "@/pages/error";
import Dashboard from "@/pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        errorElement: <Error />
      }
    ]
  },
]);