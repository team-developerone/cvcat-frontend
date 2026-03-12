import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics, logAnalyticsEvent } from "@/lib/firebase";

initAnalytics().then((a) => {
  if (a) logAnalyticsEvent("app_open");
});

createRoot(document.getElementById("root")!).render(
  <App />
);
