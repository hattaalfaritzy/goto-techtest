import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Message } from '../../commons';

const InputText = forwardRef(({
    className,
    replaceClassNameLabel,
    label,
    register,
    errMessage,
    rounded = false,
    iconLeft,
    iconRight,
    variant = 'default',
    important = false,
    ...props
}: Props, ref) => {
    switch (variant) {
        case 'default':
            return (
                <div className={clsx('flex flex-col w-full', className)}>
                    {label && <div className={clsx(replaceClassNameLabel || 'form-label pb-1.5')}>{label} {important && <span className='text-error'>*</span>}</div>}
                    <div className={clsx('form-control-default border border-[#D9DDE2]', rounded && 'rounded-full', errMessage && 'form-error')}>
                        {iconLeft && <div>{iconLeft}</div>}
                        <input className={clsx('input-form-default')} {...register} {...props} />
                        {iconRight && <div>{iconRight}</div>}
                    </div>
                    {errMessage && <Message className='mt-2' label={errMessage} />}
                </div>
            );
        case 'animation':
            return (
                <div className={clsx('flex flex-col w-full', className)}>
                    {label && <div className={clsx(replaceClassNameLabel || 'form-label')}>{label} {important && <span className='text-error'>*</span>}</div>}
                    <div className='relative flex justify-between items-center w-full'>
                        {iconLeft && <div className='px-2.5 z-10'>{iconLeft}</div>}
                        <input className={clsx('form-control-title-animation')} {...props} />
                        {iconRight && (
                            <div className={clsx('px-2.5 z-10 text-lg cursor-pointer', errMessage ? 'text-error' : 'text-primary')}>{iconRight}</div>
                        )}
                    </div>
                    <div className='bg-primary h-0.5 relative'>
                        <div
                            className={clsx(
                                'bg-error absolute flex h-full',
                                errMessage ? 'left-0 transition-[width] duration-1000 w-full' : 'right-0 transition-[width] duration-1000 w-0'
                            )}
                        />
                    </div>
                    {errMessage && <Message className='mt-2' label={errMessage} />}
                </div>
            );
        default:
            return <div />;
    }
});

InputText.displayName = 'InputText';

export default InputText;

type Props = JSX.IntrinsicElements['input'] & {
    className?: string;
    replaceClassNameLabel?: string;
    label?: string;
    register?: any;
    errors?: any;
    rounded?: boolean;
    iconLeft?: any;
    iconRight?: any;
    errMessage?: any;
    variant?: 'default' | 'animation';
    important?: boolean;
};