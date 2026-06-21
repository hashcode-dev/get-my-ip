import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import About from "./pages/about";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <TooltipProvider>
    <About />
    <Toaster />
  </TooltipProvider>
);
