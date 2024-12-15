import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../style/App.scss";
import FAQRouter from "../router/FAQRouter.tsx";

/**
 * MSW mock engin start
 */
const { worker } = await import("../mock/MSWBrowser.ts");
await worker.start();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FAQRouter />
  </StrictMode>
);
