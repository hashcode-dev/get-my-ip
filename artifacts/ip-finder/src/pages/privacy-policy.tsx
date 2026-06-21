import NavHeader from "@/components/NavHeader";

const base = import.meta.env.BASE_URL;

export default function PrivacyPolicy() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <NavHeader />

      <main className="flex-1 mx-auto w-full max-w-2xl px-6 py-12 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            When you visit Get My IP, your IP address is automatically used to retrieve geolocation and network information via third-party IP lookup APIs. We do not store your IP address on our servers. The lookup is performed in real time and the result is displayed only to you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Cookies and Analytics</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may use anonymous analytics to understand how visitors use our site (e.g., page views, session duration). No personally identifiable information is collected for analytics purposes. We may serve ads via Google AdSense, which uses cookies to serve relevant advertisements. You can opt out of personalized advertising via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the following third-party services to power this site: ipify.org (IP detection), ipapi.co (IP geolocation), and OpenStreetMap (map tiles). Each of these services has their own privacy policies governing how they handle data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            Get My IP does not maintain a database of user IP addresses or browsing history. All IP lookups are ephemeral and discarded after the response is returned to your browser.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of the site after changes constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this policy, please visit our <a href={`${base}contact/`} className="text-primary hover:underline">Contact page</a>.
          </p>
        </section>
      </main>

      <footer className="border-t py-5">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Get My IP. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
