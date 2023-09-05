import { css } from '@emotion/react';
import clsx from 'clsx';

export default function Message({ type = 'error', label, className, onClick = () => {} }: Props) {
    if (!label) return null;

    const tagStyles = css`flex justify-center items-center rounded-lg px-3 py-1.5 bg-opacity-20 w-full`;

    const tagTypes = {
        primary: css`bg-primary text-primary`,
        success: css`bg-success text-success`,
        informative: css`bg-informative text-informative`,
        warning: css`bg-warning text-warning`,
        error: css`bg-error text-error`,
    }[type];

    return (
        <div className={clsx(tagStyles.styles, tagTypes.styles, className)} onClick={onClick}>
            <div className='flex-1 px-1 text-xs'>{label}</div>
        </div>
    );
}

interface Props {
    className?: string,
    label?: string,
    type?: 'primary' | 'informative' | 'success' | 'warning' | 'error',
    onClick?: () => void;
}
