import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LinkCard from "@/components/LinkCard";

type LinkItem = {
  code: string;
  targetUrl: string;
  totalClicks: number;
  lastClicked: string | null;
};

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [targetUrl, setTargetUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const intervalRef = useRef<NodeJS.Timer | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  // Fetch all links
  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/links");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLinks(data);
    } catch {
      console.error("Failed to load links");
    }
  };

  useEffect(() => {
    fetchLinks();

    // Auto-refresh every 3 seconds
    intervalRef.current = setInterval(() => {
      fetchLinks();
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      
    };
  }, []);

  // URL format validation
  const validateFormat = (u: string) => {
    try {
      const parsed = new URL(u);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const createLink = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateFormat(targetUrl)) {
      setError("Invalid URL format (must include http:// or https://)");
      setLoading(false);
      return;
    }

    if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
      setError("Custom code must be A-Za-z0-9, length 6-8");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl, code }),
      });

      if (!res.ok) {
        const j = await res.json();
        setError(j.error || "Failed to create link");
        setLoading(false);
        return;
      }

      setTargetUrl("");
      setCode("");
      fetchLinks();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (c: string) => {
    if (!confirm(`Delete link /${c}?`)) return;

    try {
      await fetch(`/api/links/${c}`, { method: "DELETE" });
      fetchLinks();
    } catch {
      console.error("delete failed");
    }
  };

  return (
    <>
      <Head>
        <title>TinyLink | Dashboard</title>
      </Head>

      <Navbar />

      <main className="pt-24 pb-16 min-h-screen bg-gray-100 px-4">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">
          <h1 className="text-3xl font-semibold mb-6 text-center">TinyLink Dashboard</h1>

          <form onSubmit={createLink} className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6 space-y-4">
            <input
              type="text"
              placeholder="Enter long URL (https://...)"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Custom code (optional) (A-Za-z0-9 6-8 chars)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-60 hover:bg-blue-700 transition"
            >
              {loading ? "Creating..." : "Create Short Link"}
            </button>
          </form>

          <div className="mb-4 text-sm text-gray-600">Showing {links.length} link(s)</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.length === 0 && (
              <p className="text-center text-gray-500 col-span-full">No links yet.</p>
            )}

            {links.map((l) => (
              <LinkCard
                key={l.code}
                code={l.code}
                targetUrl={l.targetUrl}
                totalClicks={l.totalClicks}
                lastClicked={l.lastClicked}
                onDelete={deleteLink}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
