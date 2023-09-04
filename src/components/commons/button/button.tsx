'use client';
import clsx from 'clsx';
import { css } from '@emotion/react';

export default function Button({ className, classNameLabel, label, variant = 'primary', rounded = false, iconLeft, iconRight, children, onClick, ...props }: Props) {

    const buttonStyles = css`p-4 cursor-pointer on-hover ${rounded && 'rounded-full'}`;

    const buttonVariant = {
        primary: css`
          bg-primary hover:bg-primary-700 text-white
        `,
        secondary: css`
          bg-gray-300 hover:bg-gray-400 text-black
        `,
        transparent: css`
            bg-transparent text-black hover:text-white
        `,
    }[variant];

    const labelStyles = css`text-sm ${iconLeft && 'pl-2'} ${iconRight && 'pr-2'}`;

    return children ? (
        <button className={clsx(buttonStyles.styles, buttonVariant.styles, className)} onClick={onClick} {...props}>
            {children}
        </button>
    ) : (
        <button className={clsx(buttonStyles.styles, buttonVariant.styles, className)} onClick={onClick} {...props}>
            {iconLeft && iconLeft}
            {label && <span className={clsx(labelStyles.styles, classNameLabel)}>{label}</span>}
            {iconRight && iconRight}
        </button>
    );
}

type Props = {
    className?: string;
    classNameLabel?: string;
    label?: string;
    variant?: ButtonVariant;
    rounded?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    children?: React.ReactNode;
    onClick?: () => void;
} & React.ComponentPropsWithoutRef<'button'>;

type ButtonVariant = 'primary' | 'secondary' | 'transparent';
