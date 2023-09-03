'use client';
import clsx from 'clsx';
import { css } from '@emotion/react';

export default function Button({ children, variant = 'primary', className, onClick, iconLeft, iconRight }: Props) {
    const buttonStyles = {
        primary: css`
          bg-primary hover:bg-blue-600 text-red-200
        `,
        secondary: css`
          bg-gray-300 hover:bg-gray-400 text-black
        `,
    }[variant];

    return (
        <button className={clsx('p-4', buttonStyles.styles, className)} onClick={onClick}>
            {iconLeft && <span className='mr-2'>{iconLeft}</span>}
            {children}
            {iconRight && <span className='ml-2'>{iconRight}</span>}
        </button>
    );
}

interface Props {
    className?: string;
    children: React.ReactNode;
    variant?: ButtonVariant;
    onClick?: () => void;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

type ButtonVariant = 'primary' | 'secondary';
