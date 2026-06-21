import { Globe, RefreshCw } from "lucide-react";

const base = import.meta.env.BASE_URL;

interface NavHeaderProps {
  onRefresh?: () => void;
}

export default function NavHeader({ onRefresh }: NavHeaderProps) {
  return (
    <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <a href={base} className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <Globe className="h-5 w-5 text-primary" />
          <span className="font-semibold tracking-tight">Get My IP</span>
        </a>

        <nav className="flex items-center gap-1 text-sm">
          <a href={base} className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors whitespace-nowrap">Home</a>
          <a href={`${base}about/`} className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors whitespace-nowrap">About Us</a>
          <a href={`${base}privacy-policy/`} className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors whitespace-nowrap">Privacy Policy</a>
          <a href={`${base}contact/`} className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors whitespace-nowrap">Contact Us</a>
          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Refresh"
              className="ml-1 p-1.5 rounded-md hover:bg-accent transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
