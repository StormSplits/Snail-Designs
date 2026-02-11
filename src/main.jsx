import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
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
import { Cancellation } from "./pages/Cancellation";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

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
        path: "/cancellation",
        element: <Cancellation />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
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
    <Analytics />
  </HelmetProvider>
);