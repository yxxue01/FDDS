import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ContextProvider } from "./contexts/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />
        <ToastContainer/>
      </ContextProvider>
    </React.StrictMode>
);
