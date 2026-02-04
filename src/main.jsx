import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import { initPolyfills } from "./utils/browserPolyfills";

import "./index.css";
import Home from "./pages/Home";
import { About } from "./pages/About";
import { Client } from "./pages/Client";
import { Contact } from "./pages/Contact";
import Services from "./pages/Services";
import { Work } from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

// Initialize browser polyfills
initPolyfills();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/client",
        element: <Client />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/works",
        element: <Work />,
      },
      {
        path: "/works/:id",
        element: <ProjectDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);