'use client'
import clsx from 'clsx';
import ImageWithFallback from '../commons/image-with-fallback/image-with-fallback';
import { css } from '@emotion/react';

export default function Header() {

    const headerStyles = css`fixed z-50 top-0 flex w-full bg-white shadow-md`;
    const navStyles = css`flex justify-between items-center max-w-screen-xl mx-auto w-full py--default px--default`;

    return (
        <header className={clsx(headerStyles.styles)}>
            <nav className={clsx(navStyles.styles)}>
                <div className='flex flex-row justify-start items-end space-x-1'>
                    <ImageWithFallback alt='Logo GoTo' src='/images/logo.png' className='w-24 h-auto'  />
                    <span className='text-sm leading-none pb-2'>Technical Test</span>
                </div>
            </nav>
        </header>
    )
}