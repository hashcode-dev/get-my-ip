import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import PrivacyPolicy from "./pages/privacy-policy";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <TooltipProvider>
    <PrivacyPolicy />
    <Toaster />
  </TooltipProvider>
);
