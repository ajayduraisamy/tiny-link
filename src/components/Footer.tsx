import Link from "next/link";

const navigation = {
    tech: [
        { name: "Next.js", href: "https://nextjs.org" },
        { name: "TailwindCSS", href: "https://tailwindcss.com" },
        { name: "Prisma", href: "https://prisma.io" },
        { name: "PostgreSQL", href: "https://www.postgresql.org/" },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 ">
        
            <div className="relative max-w-7xl mx-auto px-3 py-6">
        
            
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                        
                        <div className="text-gray-600">
                            <p className="font-medium">
                                © {currentYear} TinyLink — URL Shortener
                            </p>
                        </div>

                    
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <span className="font-medium">Built with</span>
                            <div className="flex items-center space-x-4">
                                {navigation.tech.map((tech) => (
                                    <a
                                        key={tech.name}
                                        href={tech.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all duration-200 group"
                                    >
                                        <span className="text-xs font-medium group-hover:scale-105 transition-transform">
                                            {tech.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>All systems operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
