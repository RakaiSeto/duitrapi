export function Pricing() {
    return (
        <div className="flex flex-col gap-[2rem] mt-[8rem] text-center items-center scroll-mt-[6rem]" id="pricing">
            <span className="text-3xl">
                <span className="text-[#4E72FF]">Duit</span>
                <span className="text-[#8EBDFF]">Rapi</span> is Completely Cost-Free!
            </span>

            <div className="flex flex-col text-center rounded-lg p-[2rem] bg-gray-700/50 gap-2 w-[25rem]" id="pricing-card">
                <div className="flex flex-col gap-0 mb-4">
                    <span className="text-start text-2xl">Free</span>
                    <span className="text-start text-md text-gray-400 pt-0">All your finance tracker needs in one place</span>
                </div>
                <span className="text-start">
                    <span className="text-5xl font-bold">Rp. 0</span>
                    <span className="text-md text-gray-400"> / month</span>
                </span>
                <ul className="flex flex-col gap-2 mt-4">
                    <li className="flex items-center">
                        <svg className="h-6 w-6 text-teal-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Access to all web features
                    </li>
                    <li className="flex items-center">
                        <svg className="h-6 w-6 text-teal-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Access to telegram bot
                    </li>
                    <li className="flex items-center">
                        <svg className="h-6 w-6 text-teal-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Free Forever
                    </li>
                </ul>
                <a href="/login" className="bg-gray-700/50 hover:bg-gray-700/70 transition-all duration-300 text-white px-[2rem] py-[1rem] rounded-[0.8rem] mt-4">Start Now</a>
            </div>
        </div>
    );
}
