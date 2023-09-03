'use client'
import clsx from 'clsx';
import ImageWithFallback from '../commons/image-with-fallback/image-with-fallback';
import Button from '../commons/button/button';
import { css } from '@emotion/react';

export default function Header() {

    const headerStyles = css`fixed top-0 flex w-full py-[30px] bg-white shadow-md`;
    const navStyles = css`flex justify-between items-center max-w-screen-xl mx-auto w-full`;

    return (
        <header className={clsx(headerStyles.styles)}>
            <nav className={clsx(navStyles.styles)}>
                <ImageWithFallback alt='Logo GoTo' src='/images/logo.png' className='w-24 h-auto'  />
                <Button onClick={() => console.log('Button clicked!')} className='flex justify-center items-center w-12 h-12' rounded>D</Button>
            </nav>
        </header>
    )
}