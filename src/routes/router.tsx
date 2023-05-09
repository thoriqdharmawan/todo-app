import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layout";

import Error from "@/pages/error";
import Dashboard from "@/pages/dashboard";
import DetailActivity from "@/pages/detail-activity";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: 'detail-activity/:id',
        element: <DetailActivity />,
        errorElement: <Error />
      }
    ]
  },
]);