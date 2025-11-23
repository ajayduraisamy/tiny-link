import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { targetUrl, code } = req.body;

        if (!targetUrl) return res.status(400).json({ error: "targetUrl is required" });

        // Validate URL format and protocol
        try {
            const u = new URL(targetUrl);
            if (!["http:", "https:"].includes(u.protocol)) return res.status(400).json({ error: "URL must use http or https" });
        } catch {
            return res.status(400).json({ error: "Invalid URL format" });
        }

        // Validate code if provided
        if (code) {
            if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
                return res.status(400).json({ error: "Code must be A-Za-z0-9 length 6-8" });
            }
            const exists = await prisma.link.findUnique({ where: { code } });
            if (exists) return res.status(409).json({ error: "Code already exists" });
        }

        const finalCode = code || Math.random().toString(36).substring(2, 8).toLowerCase();

        const link = await prisma.link.create({
            data: { code: finalCode, targetUrl },
        });

        return res.status(201).json(link);
    }

    if (req.method === "GET") {
        const links = await prisma.link.findMany({ orderBy: { createdAt: "desc" } });
        return res.status(200).json(links);
    }

    return res.status(405).json({ error: "Method not allowed" });
}
