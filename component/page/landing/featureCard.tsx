import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconAttribute } from '@/models/iconAttribute';
import { ReactNode } from 'react';

interface CardProperties {
    title: ReactNode;
    description: ReactNode;
}

export function FeatureCard({
    title,
    description,
    icon,
    spin,
    pulse,
    bounce,
    shake,
    beat,
    fade,
    flip,
    rotation,
    size,
    classes,
}: IconAttribute & CardProperties) {
    return (
        <div className="flex flex-col items-start rounded-lg p-4 bg-neutral-100 shadow-gray-300 shadow-md dark:shadow-none dark:bg-gray-700/50 gap-2 flex-1 ">
            <div className="flex flex-row items-center text-white justify-center w-[3.5rem] h-[3.5rem] bg-gradient-to-r from-[#4E72FF] to-[#65A5FF] rounded-lg">
                <FontAwesomeIcon
                    icon={icon}
                    spin={spin}
                    pulse={pulse}
                    bounce={bounce}
                    shake={shake}
                    beat={beat}
                    fade={fade}
                    flip={flip}
                    rotation={rotation}
                    size={size}
                    className={classes}
                />
            </div>
            <h1 className="text-2xl mt-3">{title}</h1>
            <p className="text-start text-gray-400">{description}</p>
        </div>
    );
}
