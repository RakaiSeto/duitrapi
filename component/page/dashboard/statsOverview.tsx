'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function StatsOverview({color, icon, title, description, value}: {color: string, icon: string, title: string, description: string, value: string}) {
    return (
        <div className="flex flex-col gap-y-2 border border-gray-700 rounded-lg p-3" style={{backgroundColor: `${color}`}}>
            <div className="flex justify-between gap-x-2" style={{color: `#ffffff`}}>
                <span className="text-sm">{title}</span>
                <FontAwesomeIcon icon={`fa-solid ${icon}`} />
            </div>
            <div className={`text-2xl p-3 rounded-lg text-white`}>
                {value}
            </div>
            <span className="text-sm text-white">
                {description}
            </span>
        </div>
    );
}
