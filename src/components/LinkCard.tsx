import Link from "next/link";
import { useState } from "react";

// Hydration-safe date formatter
function formatDate(date: string | null) {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatRelativeTime(date: string | null) {
    if (!date) return "Never clicked";

    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(date);
}

export default function LinkCard({ code, targetUrl, totalClicks, lastClicked, onDelete }: any) {
    const [isCopied, setIsCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const short = typeof window !== "undefined" ? `${location.origin}/${code}` : `/${code}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(short);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
            alert("Copy failed");
        }
    };

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete "${code}"?`)) {
            setIsDeleting(true);
            try {
                await onDelete(code);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const getClickColor = (clicks: number) => {
        if (clicks === 0) return "text-gray-400";
        if (clicks < 10) return "text-green-600";
        if (clicks < 50) return "text-blue-600";
        return "text-purple-600";
    };

    return (
        <div className="group relative p-6 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:bg-white/90">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex justify-between items-start">
                {/* Left Content */}
                <div className="flex-1 min-w-0 pr-4">
                    {/* Code with Tag */}
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-900 truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {code}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                            Active
                        </span>
                    </div>

                    {/* Target URL */}
                    <a
                        href={targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 truncate mb-4"
                        title={targetUrl}
                    >
                        {targetUrl}
                    </a>

                    {/* Short URL */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-sm font-mono text-gray-800 flex-1 truncate">
                            {short}
                        </span>
                        <button
                            onClick={handleCopy}
                            disabled={isCopied}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${isCopied
                                    ? "bg-green-100 text-green-700 border border-green-200"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 active:scale-95"
                                }`}
                        >
                            {isCopied ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-gray-500">Total Clicks</span>
                                <p className={`font-semibold ${getClickColor(totalClicks ?? 0)}`}>
                                    {totalClicks ?? 0}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-green-100 rounded-lg">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-gray-500">Last Click</span>
                                <p className="font-medium text-gray-700" title={formatDate(lastClicked)}>
                                    {formatRelativeTime(lastClicked)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-col gap-2">
                    {/* Stats Link */}
                    <Link
                        href={`/code/${code}`}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 group/stats active:scale-95"
                    >
                        <svg className="w-4 h-4 group-hover/stats:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Analytics
                    </Link>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 active:scale-95 ${isDeleting
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300 hover:text-red-800"
                            }`}
                    >
                        {isDeleting ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Progress bar for clicks (visual indicator) */}
            {(totalClicks ?? 0) > 0 && (
                <div className="relative mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-500"
                            style={{
                                width: `${Math.min(100, ((totalClicks ?? 0) / 100) * 100)}%`
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}