import { FeatureCard } from "./featureCard";
import { faChartLine, faWallet } from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

export function Features() {
    return (
        <div className="about flex flex-col mt-[10rem] text-center scroll-mt-[6rem]" id="features">
            <span className="text-3xl">Powerful Features at Your Disposal</span>

            <div className="flex flex-row gap-6 mt-10 justify-evenly">
                <FeatureCard title="Money Pocket" description="Divide your money into different pockets and manage them easily" icon={faWallet} />
                <FeatureCard title="Transaction Stats" description="See your transaction history and stats in one place" icon={faChartLine} />
                <FeatureCard title={<span>Telegram Bot <span className="text-red-500">*</span></span>} description={<span><span>Manage your money with DuitRapi's telegram bot for further convenience</span><br /><span className="text-red-400 text-xs">*Coming Soon</span></span>} icon={faTelegram} />
            </div>
        </div>
    );
}