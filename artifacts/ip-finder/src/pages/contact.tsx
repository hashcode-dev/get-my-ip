import { Globe, Mail, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
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

      <main className="flex-1 mx-auto w-full max-w-2xl px-6 py-12 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Have a question, suggestion, or found something not working? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border rounded-lg p-5 flex flex-col gap-3 bg-card">
            <div className="p-2 bg-primary/10 rounded-lg w-fit text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Email</h2>
            <p className="text-sm text-muted-foreground">For general inquiries and support, drop us an email and we will get back to you within 1–2 business days.</p>
            <a href="mailto:hello@myipaddress.com" className="text-sm text-primary hover:underline font-medium">hello@myipaddress.com</a>
          </div>

          <div className="border rounded-lg p-5 flex flex-col gap-3 bg-card">
            <div className="p-2 bg-primary/10 rounded-lg w-fit text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Feedback</h2>
            <p className="text-sm text-muted-foreground">Spotted inaccurate data, a broken feature, or have an idea to improve the tool? We appreciate every report.</p>
            <a href="mailto:feedback@myipaddress.com" className="text-sm text-primary hover:underline font-medium">feedback@myipaddress.com</a>
          </div>
        </div>

        <div className="border rounded-lg p-5 bg-card space-y-2">
          <h2 className="font-semibold">Frequently Asked Questions</h2>
          <p className="text-sm text-muted-foreground">Before reaching out, you may find an answer in the FAQ section on our <Link href="/" className="text-primary hover:underline">home page</Link>.</p>
        </div>
      </main>

      <footer className="border-t py-5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Get My IP. All rights reserved.</span>
          <nav className="flex items-center gap-5">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About Us</Link>
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
