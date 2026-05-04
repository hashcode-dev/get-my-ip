import { Globe } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-semibold tracking-tight">Get My IP</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-2xl px-6 py-12 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-muted-foreground leading-relaxed">
          Get My IP is a free, fast, and reliable tool that helps you instantly discover your public IP address along with detailed network information including your location, ISP, timezone, and more.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We built this service because we believe everyone should have quick, no-fuss access to their network information without being bombarded by complex interfaces or paywalls. No account required, no tracking, no hassle — just open the page and your IP is right there.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our data is sourced from publicly available IP geolocation databases and updated regularly to ensure accuracy. While we strive for precision, geolocation data may occasionally differ from your exact physical location due to how ISPs route traffic.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Thank you for using Get My IP. If you have feedback or suggestions, feel free to reach out via our <Link href="/contact" className="text-primary hover:underline">Contact page</Link>.
        </p>
      </main>

      <footer className="border-t py-5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Get My IP. All rights reserved.</span>
          <nav className="flex items-center gap-5">
            <Link href="/about" className="hover:text-foreground transition-colors">About Us</Link>
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
