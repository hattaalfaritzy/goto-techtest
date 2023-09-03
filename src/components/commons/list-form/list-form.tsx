import clsx from 'clsx';
import Card from '../card/card';
import { css } from '@emotion/react';

export default function ListForm({ className, classNameValue, title, value, loading, important, renderValue }: Props) {

    const containerListForm = css`flex flex-col justify-start items-start ${loading && 'space-y-1'}`;
    const titleStyles = css`text-base text-[#687488] ${important && 'required-form'}`;
    const valueStyles = css`text-base text-[#3C434E] font-bold capitalize`;

    return (
        <Card className={clsx(containerListForm.styles, className)} withShadow>
            {title && <span className={clsx(titleStyles.styles)}>{title}</span>}
            {loading ? (
                <span className='rounded-full bg-light-700 h-4 w-2/3 animate-pulse' />
            ) : renderValue || <span className={clsx(valueStyles.styles, classNameValue)}>{value ? value : '-'}</span>}
        </Card>
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
