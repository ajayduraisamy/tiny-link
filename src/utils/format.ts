// Format date like: Jan 12, 2025  3:45 PM
export function formatDate(date: string | Date | null) {
    if (!date) return "-";

    const d = new Date(date);
    return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Show "5 minutes ago", "2 days ago"
export function timeAgo(date: string | Date | null) {
    if (!date) return "-";

    const now = new Date();
    const past = new Date(date);
    const diff = (now.getTime() - past.getTime()) / 1000;

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

// Truncate long URLs for table display
export function truncate(str: string, max = 40) {
    if (str.length <= max) return str;
    return str.substring(0, max) + "...";
}
