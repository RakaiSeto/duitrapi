'use client';

import DuitRapiLogo from "../logo/DuitRapiLogo";

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0 flex items-start gap-2">
                        <DuitRapiLogo width={40} height={40} />
                        <span className="text-2xl pt-1">
                            <span className="text-[#4E72FF]">Duit</span>
                            <span className="text-[#8EBDFF]">Rapi</span>
                        </span> 
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-800 dark:text-gray-400 uppercase">Resources</h2>
                            <ul className="text-gray-700 dark:text-gray-300 space-y-4">
                                <li>
                                    <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=rakaiseto@gmail.com&su=DuitRapi%20Problem%20[Insert%20Your%20Issue%20Here]" className="hover:underline">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://github.com/rakaiseto/DuitRapi" className="hover:underline">
                                        Project Github
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-800 dark:text-gray-400 uppercase">Follow me</h2>
                            <ul className="text-gray-700 dark:text-gray-300 space-y-4">
                                <li>
                                    <a target="_blank" href="https://www.linkedin.com/in/rakai-seto-sembodo/" className="hover:underline">
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://github.com/rakaiseto" className="hover:underline">
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://instagram.com/rakss101" className="hover:underline">
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
                <div className="text-center text-gray-500">&copy; {year} Rakai Seto Sembodo. All Rights Reserved.</div>
            </div>
        </footer>
    );
}
