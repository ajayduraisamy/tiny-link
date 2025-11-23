export default function VideoDemo() {
    return (
        <div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Project Demo</h2>

            <video controls className="w-full rounded-lg shadow">
                <source src="/demo/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <p className="mt-4 text-gray-600 text-center">
                This is a complete walkthrough of the TinyLink URL Shortener.
            </p>

            
            <div className="mt-8 flex justify-center">
                <a
                    href="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Go Back to Dashboard
                </a>
            </div>
        </div>
    );
}
