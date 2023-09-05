import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Message } from '../../commons';
import { css } from '@emotion/react';

const InputText = forwardRef(
    ({
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
        disabled = false,
        ...props
    }: Props, ref) => {
        const wrapperInput = css`flex flex-col w-full`;
        const labelStyles = css`form-label pb-1.5 ${important && 'required-form'}`;
        const containerInput = css`form-control-default border border-[#D9DDE2] ${rounded && 'rounded-full'} ${errMessage && 'form-error'} ${disabled && 'form-disabled'}`;
        const inputStyles = css`input-form-default ${disabled ? 'cursor-default' : 'cursor-pointer'}`

        return (
            <div className={clsx(wrapperInput.styles, className)}>
                {label && <div className={clsx(replaceClassNameLabel || labelStyles.styles)}>{label}</div>}
                <div className={clsx(containerInput.styles)}>
                    {iconLeft && <div>{iconLeft}</div>}
                    <input className={clsx(inputStyles.styles)} {...register} {...props} disabled={disabled} />
                    {iconRight && <div>{iconRight}</div>}
                </div>
                {errMessage && <Message className='mt-2' label={errMessage} />}
            </div>
        );
    }
);

InputText.displayName = 'InputText';

export default InputText;

type Props = {
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
} & React.ComponentPropsWithoutRef<'input'>;
