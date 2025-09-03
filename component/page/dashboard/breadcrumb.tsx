import { BreadcrumbType } from '@/models/breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Breadcrumb({ current, prev }: { current: string; prev: BreadcrumbType[] }) {
    const breadcrumbItems = prev.map((breadcrumb) => (
        <div>
            <a href={breadcrumb.link} className="text-gray-500" key={breadcrumb.name}>
                {breadcrumb.name}
            </a>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    ));

    return (
        <div className="flex gap-y-2">
            {breadcrumbItems}
            <span className="">{current}</span>
        </div>
    );
}
