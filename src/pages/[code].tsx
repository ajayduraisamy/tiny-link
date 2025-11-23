import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";

function isSafeUrl(url: string) {
    try {
        const u = new URL(url);
        return ["http:", "https:"].includes(u.protocol);
    } catch {
        return false;
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const code = context.params?.code as string;

    const link = await prisma.link.findUnique({ where: { code } });
    if (!link || !isSafeUrl(link.targetUrl)) {
        return { notFound: true };
    }

    await prisma.link.update({
        where: { code },
        data: { totalClicks: { increment: 1 }, lastClicked: new Date() },
    });

    return { redirect: { destination: link.targetUrl, permanent: false } };
};

export default function RedirectPage() {
    return null;
}
