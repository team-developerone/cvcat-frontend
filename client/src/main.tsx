import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CVProvider } from "./lib/context";

createRoot(document.getElementById("root")!).render(
  <CVProvider>
    <App />
  </CVProvider>
);
