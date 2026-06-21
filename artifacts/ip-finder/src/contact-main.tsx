import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Contact from "./pages/contact";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <TooltipProvider>
    <Contact />
    <Toaster />
  </TooltipProvider>
);
