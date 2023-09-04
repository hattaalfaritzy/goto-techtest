import clsx from 'clsx';

export default function TableHeader({ className, label, headerIcons }: Props) {
    return (
        <th className={clsx(className)}>
            <div className="flex">
                {headerIcons && headerIcons}
                <span className="text-sm text-primary-900 font-normal">
                    {label}
                </span>
            </div>
        </th>
    );
}

interface Props {
    className?: string;
    label?: string;
    headerIcons?: any;
}
