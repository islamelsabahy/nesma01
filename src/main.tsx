import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize language from localStorage
document.addEventListener("DOMContentLoaded", () => {
  try {
    const stored = localStorage.getItem("nesma-language");
    if (stored) {
      const data = JSON.parse(stored);
      const lang = data.state?.lang || "ar";
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  } catch {
    // keep defaults
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
