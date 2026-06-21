import NavHeader from "@/components/NavHeader";

const base = import.meta.env.BASE_URL;

export default function About() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <NavHeader />

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
          Thank you for using Get My IP. If you have feedback or suggestions, feel free to reach out via our <a href={`${base}contact/`} className="text-primary hover:underline">Contact page</a>.
        </p>
      </main>

      <footer className="border-t py-5">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Get My IP. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
