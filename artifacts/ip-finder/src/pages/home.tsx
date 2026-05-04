import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Copy, RefreshCw, AlertCircle, Globe, ExternalLink, Check } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Fix default leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface IpDetails {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  postal: string;
  latitude: number;
  longitude: number;
  org: string;
  timezone: string;
  utc_offset: string;
  currency: string;
  currency_name: string;
}

export default function Home() {
  const [data, setData] = useState<IpDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedIp, setCopiedIp] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);

  const fetchIpData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      if (!ipRes.ok) throw new Error("Failed to fetch IP address");
      const { ip } = await ipRes.json();

      const detailsRes = await fetch(`https://ipapi.co/${ip}/json/`);
      if (!detailsRes.ok) throw new Error("Failed to fetch IP details");
      const details = await detailsRes.json();

      if (details.error) {
        throw new Error(details.reason || "Failed to fetch IP details");
      }

      setData(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIpData();
  }, [fetchIpData]);

  const handleCopyIp = () => {
    if (data?.ip) {
      navigator.clipboard.writeText(data.ip);
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2000);
    }
  };

  const handleCopyDetails = () => {
    if (!data) return;
    const text = [
      `IP: ${data.ip}`,
      `City: ${data.city}`,
      `State/Region: ${data.region}`,
      `Country: ${data.country_name}`,
      `Postal Code: ${data.postal}`,
      `Time Zone: UTC ${formatOffset(data.utc_offset)}`,
      `ISP: ${data.org}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopiedDetails(true);
    setTimeout(() => setCopiedDetails(false), 2000);
  };

  const formatOffset = (offset: string) => {
    if (!offset) return "";
    const sign = offset.startsWith("-") ? "-" : "+";
    const abs = offset.replace(/[+-]/, "");
    const hours = abs.slice(0, 2);
    const mins = abs.slice(2);
    return `${sign}${hours}:${mins}`;
  };

  const mapsUrl = data
    ? `https://www.google.com/maps?q=${data.latitude},${data.longitude}`
    : "#";

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-semibold tracking-tight">Get My IP</span>
          </div>
          <Button variant="ghost" size="icon" onClick={fetchIpData} data-testid="refresh-button" title="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full px-16 pt-28 pb-28 flex flex-col gap-6 items-center">
        <div className="w-full max-w-3xl flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-foreground">What Is My IP?</h1>

            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-3">
                  {error}
                  <Button variant="outline" size="sm" onClick={fetchIpData} className="w-fit">
                    <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {/* IP rows */}
                <div className="border rounded-lg overflow-hidden divide-y divide-border bg-card">
                  <div className="flex items-center gap-4 px-6 py-3">
                    <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0 w-40">Your IPv4 Address</span>
                    {loading ? (
                      <Skeleton className="h-6 w-48" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span data-testid="ip-display" className="text-xl font-bold font-mono text-primary tracking-tight">
                          {data?.ip}
                        </span>
                        <button onClick={handleCopyIp} data-testid="copy-button" title="Copy IP" className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded">
                          {copiedIp ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 px-6 py-3">
                    <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0 w-40">Your IPv6 Address</span>
                    <span className="text-sm text-muted-foreground italic">IPv6: Not Detected</span>
                  </div>
                </div>

                {/* Details + Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  {/* Details panel */}
                  <div className="border rounded-lg overflow-hidden bg-card flex flex-col">
                    <div className="flex items-center justify-between px-5 py-3 border-b bg-muted/40">
                      <span className="text-sm font-semibold">IPv4 Details</span>
                      <button onClick={handleCopyDetails} title="Copy all details" className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded">
                        {copiedDetails ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 px-5 py-2 bg-red-50 border-b border-red-100">
                      <AlertCircle className="h-3 w-3 text-red-500 shrink-0" />
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider whitespace-nowrap">Visible from your connection</span>
                    </div>

                    <div className="divide-y divide-border">
                      {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="flex items-center gap-4 px-5 py-3">
                            <Skeleton className="h-4 w-24 shrink-0" />
                            <Skeleton className="h-4 w-36" />
                          </div>
                        ))
                      ) : (
                        <>
                          <DetailRow label="City" value={data?.city} testId="detail-card-city" />
                          <DetailRow label="State/Region" value={data?.region} testId="detail-card-region" />
                          <DetailRow label="Country" value={data?.country_name} testId="detail-card-country" />
                          <DetailRow label="Postal Code" value={data?.postal} testId="detail-card-postal" />
                          <DetailRow label="Time Zone" value={data ? `UTC ${formatOffset(data.utc_offset)}` : ""} testId="detail-card-timezone" />
                          <DetailRow label="ISP" value={data?.org} testId="detail-card-isp" />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Map panel */}
                  <div className="border rounded-lg overflow-hidden bg-card flex flex-col" style={{ height: 340 }}>
                    <div className="flex items-center px-4 py-2.5 border-b shrink-0">
                      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                        Open in Maps <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex-1 relative">
                      {loading ? (
                        <Skeleton className="absolute inset-0" />
                      ) : data ? (
                        <MapContainer
                          center={[data.latitude, data.longitude]}
                          zoom={11}
                          style={{ height: "100%", width: "100%" }}
                          zoomControl={true}
                          scrollWheelZoom={false}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker position={[data.latitude, data.longitude]}>
                            <Popup>{data.city}, {data.country_name}</Popup>
                          </Marker>
                        </MapContainer>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="mt-2 space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">About Your IP Address</h2>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium text-foreground">Why do I have an IP address?</span>
                      <p className="mt-1">An IP address is a unique identifier assigned to your device when it connects to the internet, allowing devices to communicate with each other.</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Is my IP address public?</span>
                      <p className="mt-1">Yes — the address shown above is your public IP, visible to websites you visit. Your local network also uses private IPs not visible outside your home.</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Can my IP address change?</span>
                      <p className="mt-1">Most ISPs assign dynamic IPs that can change periodically or when your router restarts.</p>
                    </div>
                  </div>
                </div>

                {/* Understanding Your IP Address */}
                <div className="mt-6 space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">💡 Understanding Your IP Address</h2>
                  <p className="text-sm text-muted-foreground">An IP address (Internet Protocol address) is a unique identifier assigned to your internet connection that allows websites and apps to send information back to you. The address shown at the top of this page is your public IP address, assigned by your Internet Service Provider (ISP). A public IP identifies your network on the internet, while a private IP address is used only within a local network, such as your home or office. In most cases, a public IP address identifies an entire network rather than a single device connected to it.</p>
                </div>

                {/* Why Your IP Changes */}
                <div className="mt-6 space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-2">🔄 Why Your IP Changes</h2>
                  <p className="text-sm text-muted-foreground">Most internet users are assigned a dynamic IP address. This means your IP can change over time rather than remaining permanently fixed. Static IP addresses are available from some Internet Service Providers (ISPs), but they are less common for residential connections.</p>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium text-foreground">Will my IP stay the same?</span>
                      <p className="mt-1">In most cases, no. Residential internet connections typically use dynamic IP addressing, which allows the ISP to rotate or reassign IP addresses as needed.</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Why does my IP change?</span>
                      <p className="mt-1">Your IP address may change when you restart your modem or router, when your ISP refreshes its network assignments, or when you connect to a different network such as Wi-Fi at another location.</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Why does my IP change on mobile?</span>
                      <p className="mt-1">Mobile devices frequently switch between cellular towers, Wi-Fi networks, and carrier routing systems. Each network assigns its own public IP address, which can cause your visible IP to change more often.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
      </main>

      <footer className="border-t py-5 mt-4">
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

function DetailRow({
  label,
  value,
  testId,
}: {
  label: string;
  value?: string;
  testId: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 group" data-testid={testId}>
      <div className="flex items-start gap-2 min-w-0 flex-1">
        <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0 w-[76px]">{label}:</span>
        <span className="text-xs font-semibold text-foreground break-words min-w-0">{value || "-"}</span>
      </div>
      <button
        onClick={handleCopy}
        title={`Copy ${label}`}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all p-1 rounded shrink-0 ml-2"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
