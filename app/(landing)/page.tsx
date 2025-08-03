import { Navbar } from '@/component/shared/navbar/navbar';
import { Hero } from '@/component/page/landing/hero';
import { Features } from '@/component/page/landing/features';
import { Pricing } from '@/component/page/landing/pricing';
import { Footer } from '@/component/shared/footer';

export default function landingPage() {
    return (
        <div>
            <Navbar />
            <div className="mt-[4rem] pb-[5rem] flex flex-col gap-[2rem] px-[5rem] w-[90vw] mx-auto">
                <Hero />
                <Features />
                <Pricing />
            </div>
            <Footer />
        </div>
    );
}
