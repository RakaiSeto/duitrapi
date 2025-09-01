import Image from 'next/image';

export function Hero() {
    return (
        <div className="hero flex-col gap-[2rem] mt-[7.5rem] scroll-mt-[6rem]" id="hero">
            <div className="text-center">
                <span className="text-5xl font-bold"><span>Better Financial Tracker</span> <br></br> <span className="bg-gradient-to-r text-transparent bg-clip-text inline-block from-[#4E72FF] to-[#8EBDFF]">For Better Financial Health</span></span>

                <h2 className="mt-[3rem] text-xl">Had enough with your standard sheets ? <br></br> Track your money on the go with <span className="text-[#4E72FF]">Duit</span><span className="text-[#8EBDFF]">Rapi</span></h2>
            </div>

            <div className="flex gap-[2rem] mt-[3.5rem] justify-center items-center">
                <a href="/login" className="bg-gradient-to-r from-[#4E72FF] to-[#65A5FF] text-white px-[2rem] ms-[-0.5rem] py-[1rem] rounded-[0.8rem]">Start Now</a>
                
                {/* <a href="#about" className="text-lg">Learn More About <span className="text-[#4E72FF]">Duit</span><span className="text-[#8EBDFF]">Rapi</span><span aria-hidden="true">→</span></a>  */}
            </div>

            <div className="flex flex-col gap-[2rem]">
                <Image src="https://placehold.co/640x360" className="justify-self-center mx-auto mt-[5rem] rounded-[1rem] shadow-gray-300 dark:shadow-nav-shadow shadow-md" alt="Hero" width={640} height={360} />
            </div>
        </div>
    );
}
