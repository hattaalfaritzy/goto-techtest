import clsx from 'clsx';
import { css } from '@emotion/react';

export default function TableHeader({ className, label }: Props) {

    const headerTableStyles = css`text-sm text-primary-900 font-normal`;

    return (
        <th className={clsx(className)}>
            <span className={clsx(headerTableStyles.styles)}>
                {label}
            </span>
        </th>
    );
}

interface Props {
    className?: string;
    label?: string;
}
