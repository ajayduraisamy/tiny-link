import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const code = context.params?.code as string;

    const link = await prisma.link.findUnique({ where: { code } });
    if (!link) return { notFound: true };

    return {
        props: { link: JSON.parse(JSON.stringify(link)) },
    };
};

// Safe date formatter
function formatDate(date: string | null) {
    if (!date) return "Never";
    return new Date(date).toISOString().replace("T", " ").substring(0, 19);
}

export default function StatsPage({ link: initialLink }: any) {
    const linkRef = useRef(initialLink);

    useEffect(() => {
        const update = async () => {
            const res = await fetch(`/api/links/${initialLink.code}`);
            if (res.ok) linkRef.current = await res.json();
        };

        const interval = setInterval(update, 2000);
        return () => clearInterval(interval);
    }, [initialLink.code]);

    const link = linkRef.current;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Stats for <span className="text-blue-600">/{link.code}</span>
                </h1>

                <div className="space-y-4 text-gray-700">
                    <div>
                        <p className="font-semibold">Target URL:</p>
                        <a
                            href={link.targetUrl}
                            target="_blank"
                            className="block bg-gray-50 p-3 rounded border text-blue-600 break-all"
                        >
                            {link.targetUrl}
                        </a>
                    </div>

                    <div>
                        <p className="font-semibold">Total Clicks:</p>
                        <p className="bg-gray-50 p-3 rounded border">{link.totalClicks}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Last Clicked:</p>
                        <p className="bg-gray-50 p-3 rounded border">
                            {formatDate(link.lastClicked)}
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
