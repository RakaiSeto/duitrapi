import Image from "next/image";

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="py-3">
                <Image src="/images/DuitRapi.png" alt="DuitRapi Logo" width={95} height={95} priority />
            </div>
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md">Go to Home</button>
            
        </div>
    )
}