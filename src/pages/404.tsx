export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
            <h1 className="text-7xl font-bold text-blue-600">404</h1>
            <p className="mt-4 text-xl text-gray-700">The page you’re looking for doesn’t exist.</p>
            <a
                href="/"
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
                Go Back to Dashboard
            </a>
        </div>
    );
}
