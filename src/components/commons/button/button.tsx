'use client';
import clsx from 'clsx';
import { css } from '@emotion/react';

export default function Button({ className, classNameLabel, label, variant = 'primary', rounded = false, iconLeft, iconRight, children, onClick }: Props) {

    const buttonStyles = css`p-4 ${rounded && 'rounded-full'}`;

    const buttonVariant = {
        primary: css`
          bg-primary hover:bg-blue-600 text-white
        `,
        secondary: css`
          bg-gray-300 hover:bg-gray-400 text-black
        `,
    }[variant];

    const labelStyles = css`text-base text-black ${iconLeft && 'pl-2'} ${iconRight && 'pr-2'}`;

    return children ? (
        <button className={clsx(buttonStyles.styles, buttonVariant.styles, className)} onClick={onClick}>
            {children}
        </button>
    ) : (
        <button className={clsx(buttonStyles.styles, buttonVariant.styles, className)} onClick={onClick}>
            {iconLeft && iconLeft}
            {label && <span className={clsx(labelStyles.styles, classNameLabel)}>{label}</span>}
            {iconRight && iconRight}
        </button>
    );
}

interface Props {
    className?: string;
    classNameLabel?: string;
    label?: string;
    variant?: ButtonVariant;
    rounded?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    children?: React.ReactNode;
    onClick?: () => void;
}

type ButtonVariant = 'primary' | 'secondary';
