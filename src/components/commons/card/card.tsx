import clsx from 'clsx';
import { css } from '@emotion/react';

export default function Card({
    className,
    withShadow,
    rounded = true,
    children,
    onClick,
}: Props) {
    if (!children) return null;

    const cardStyles = css`flex p-3 ${withShadow && 'shadow-md'} ${rounded && 'rounded-lg'}`;

    return (
        <div
            aria-hidden="true"
            className={clsx(cardStyles.styles, className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

interface Props {
    className?: string;
    withShadow?: boolean;
    rounded?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}
