import { useState, useEffect, useCallback } from "react";
import { Copy, RefreshCw, AlertCircle, Globe, MapPin, Building, Clock, Coins, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  languages: string;
  calling_code: string;
  is_eu: boolean;
}

export default function Home() {
  const [data, setData] = useState<IpDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    if (data?.ip) {
      navigator.clipboard.writeText(data.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const AdPlaceholder = ({ title, width, height, className = "", testId }: { title: string, width: string, height: string, className?: string, testId: string }) => (
    <div 
      data-testid={testId}
      className={`bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 p-4 ${className}`}
      style={{ width: width === 'full' ? '100%' : width, height, maxWidth: '100%' }}
    >
      <span className="text-xs uppercase tracking-widest font-medium mb-1">Advertisement</span>
      <span className="text-sm">{title}</span>
    </div>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-semibold tracking-tight">MyIPAddress</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline-block">Fast, focused, trustworthy</span>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        
        {/* Top Ad */}
        <div className="w-full flex justify-center">
          <AdPlaceholder title="728x90 (Desktop) / 320x50 (Mobile)" width="728px" height="90px" className="hidden md:flex" testId="ad-top" />
          <AdPlaceholder title="320x50" width="320px" height="50px" className="flex md:hidden" testId="ad-top-mobile" />
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8 items-start">
          
          {/* Left Ad Sidebar */}
          <div className="hidden lg:block sticky top-24">
            <AdPlaceholder title="300x250 Rectangle" width="300px" height="250px" testId="ad-left" />
          </div>

          {/* Main Content */}
          <div className="w-full flex flex-col gap-8 max-w-2xl mx-auto">
            
            <section className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Your Public IP Address</h1>
              
              {loading ? (
                <Skeleton className="h-16 md:h-24 w-64 md:w-96 rounded-xl" />
              ) : error ? (
                <Alert variant="destructive" className="text-left w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="flex flex-col gap-3">
                    {error}
                    <Button variant="outline" size="sm" onClick={fetchIpData} className="w-fit">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div 
                    data-testid="ip-display"
                    className="text-4xl md:text-6xl font-bold font-mono tracking-tighter text-primary break-all"
                  >
                    {data?.ip}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleCopy} 
                      data-testid="copy-button"
                      className="min-w-[120px]"
                    >
                      {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "Copied!" : "Copy IP"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={fetchIpData} 
                      data-testid="refresh-button"
                      title="Refresh"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </section>

            {/* Details Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailCard loading={loading} icon={MapPin} label="Location" value={data ? `${data.city}, ${data.region}` : ''} testId="detail-card-location" />
              <DetailCard loading={loading} icon={Globe} label="Country" value={data ? `${data.country_name} (${data.country_code})` : ''} testId="detail-card-country" />
              <DetailCard loading={loading} icon={Building} label="ISP / Organization" value={data?.org || ''} testId="detail-card-isp" />
              <DetailCard loading={loading} icon={Clock} label="Timezone" value={data ? `${data.timezone} (UTC${data.utc_offset})` : ''} testId="detail-card-timezone" nowrap />
              <DetailCard loading={loading} icon={MapPin} label="Coordinates" value={data ? `${data.latitude}, ${data.longitude}` : ''} testId="detail-card-coordinates" />
              <DetailCard loading={loading} icon={Coins} label="Currency" value={data ? `${data.currency_name} (${data.currency})` : ''} testId="detail-card-currency" />
            </section>

            <section className="mt-8 space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">What is my IP?</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-foreground">Why do I have an IP address?</h3>
                  <p className="text-sm text-muted-foreground mt-1">An IP (Internet Protocol) address is a unique identifier assigned to your device when it connects to the internet. It allows devices to communicate with each other.</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">Is my IP address public?</h3>
                  <p className="text-sm text-muted-foreground mt-1">Yes, the IP address shown above is your public IP. It is visible to the websites and services you visit. Your local network also uses private IP addresses that are not visible outside your home.</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">Can my IP address change?</h3>
                  <p className="text-sm text-muted-foreground mt-1">Yes, most internet service providers assign dynamic IP addresses which can change periodically or when your router restarts.</p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Ad Sidebar */}
          <div className="hidden lg:block sticky top-24">
            <AdPlaceholder title="300x250 Rectangle" width="300px" height="250px" testId="ad-right" />
          </div>

        </div>

        {/* Bottom Ad */}
        <div className="w-full flex justify-center mt-8">
          <AdPlaceholder title="728x90 (Desktop) / 320x50 (Mobile)" width="728px" height="90px" className="hidden md:flex" testId="ad-bottom" />
          <AdPlaceholder title="320x50" width="320px" height="50px" className="flex md:hidden" testId="ad-bottom-mobile" />
        </div>

      </main>

      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MyIPAddress. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function DetailCard({ loading, icon: Icon, label, value, testId, nowrap }: { loading: boolean, icon: any, label: string, value: string, testId: string, nowrap?: boolean }) {
  if (loading) {
    return <Skeleton className="h-[88px] rounded-xl" />;
  }

  return (
    <Card className="overflow-hidden bg-card" data-testid={testId}>
      <CardContent className="p-4 flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
          <span className={`text-sm font-semibold ${nowrap ? 'truncate' : 'break-words'}`} title={nowrap ? value : undefined}>{value || '-'}</span>
        </div>
      </CardContent>
    </Card>
  );
}