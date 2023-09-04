import clsx from 'clsx';
import Card from '../card/card';
import { css } from '@emotion/react';
import { useRouter } from 'next/navigation';
import { Icon } from '..';

export default function HeadingLink({ className, classNameTitle, classNameLabel, title, label, withBack = false, renderActions, loading }: Props) {
    const router = useRouter();

    const containerHeading = css`flex flex-row justify-between items-center w-full py-4 px-0`;
    const rowHeading = css`flex flex-row justify-start items-center ${withBack && 'space-x-4'}`;
    const titleStyles = css`text-base lg:text-xl text-black font-semibold`;
    const valueStyles = css`text-black text-sm`;

    return (
        <Card className={clsx(containerHeading.styles, className)}>
            <div className={clsx(rowHeading.styles)}>
                {withBack && <div className='cursor-pointer' onClick={() => router.back()}>
                    <Icon name='chevron-left' className='fill-black' />
                </div>}
                <div className={clsx('flex flex-col justify-start items-start w-full bg-transparent', label && 'space-y-1')}>
                    <span className={clsx(titleStyles.styles, classNameTitle)}>{title}</span>
                    {label && loading ? (
                        <span className='rounded-full bg-light-700 h-4 w-2/3 animate-pulse' />
                    ) : (
                        <span className={clsx(valueStyles.styles, classNameLabel)}>{label}</span>
                    )}
                </div>
            </div>
            {renderActions && renderActions}
        </Card>
    );
}

interface Props {
    className?: string;
    classNameTitle?: string;
    classNameLabel?: string;
    title?: string;
    label?: React.ReactNode;
    withBack?: boolean;
    renderActions?: React.ReactNode;
    loading?: boolean;
}
