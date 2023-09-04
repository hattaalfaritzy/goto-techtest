import clsx from 'clsx';
import { css } from '@emotion/react';

export default function ListForm({ className, classNameValue, title, value, loading, important, renderValue }: Props) {

    const containerListForm = css`flex flex-col justify-start items-start ${loading && 'space-y-1'}`;
    const titleStyles = css`text-black text-sm font-semibold ${important && 'required-form'}`;
    const valueStyles = css`text-black text-xs capitalize`;

    return (
        <div className={clsx(containerListForm.styles, className)}>
            {title && <span className={clsx(titleStyles.styles)}>{title}</span>}
            {loading ? (
                <span className='rounded-full bg-light-700 h-4 w-2/3 animate-pulse' />
            ) : renderValue || <span className={clsx(valueStyles.styles, classNameValue)}>{value ? value : '-'}</span>}
        </div>
    );
}

interface Props {
    className?: string;
    classNameValue?: string;
    title?: string;
    value?: string | number;
    loading?: boolean;
    important?: boolean;
    renderValue?: React.ReactNode;
}
