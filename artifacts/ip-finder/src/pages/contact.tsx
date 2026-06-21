import { Mail, MessageSquare } from "lucide-react";
import NavHeader from "@/components/NavHeader";

export default function Contact() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <NavHeader />

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
            <a href="mailto:hashcode.dev@gmail.com" className="text-sm text-primary hover:underline font-medium">hashcode.dev@gmail.com</a>
          </div>

          <div className="border rounded-lg p-5 flex flex-col gap-3 bg-card">
            <div className="p-2 bg-primary/10 rounded-lg w-fit text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Feedback</h2>
            <p className="text-sm text-muted-foreground">Spotted inaccurate data, a broken feature, or have an idea to improve the tool? We appreciate every report.</p>
            <a href="mailto:hashcode.dev@gmail.com" className="text-sm text-primary hover:underline font-medium">hashcode.dev@gmail.com</a>
          </div>
        </div>
      </main>

      <footer className="border-t py-5">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Get My IP. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
