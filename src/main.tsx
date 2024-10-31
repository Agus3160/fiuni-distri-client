import { createRoot } from "react-dom/client";

// Context
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext.tsx";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css"

import App from "./App.tsx"; // Main App


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
