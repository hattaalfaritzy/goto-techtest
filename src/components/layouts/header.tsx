'use client'
import clsx from 'clsx';
import ImageWithFallback from '../commons/image-with-fallback/image-with-fallback';
import Button from '../commons/button/button';

export default function Header() {
    return (
        <header className={clsx('flex')}>
            <nav className='flex flex-row justify-between items-center w-full'>
                <ImageWithFallback alt='Logo GoTo' src='/images/logo.png' />
                <Button onClick={() => console.log('Button clicked!')}>Click Me</Button>
            </nav>
        </header>
    )
}