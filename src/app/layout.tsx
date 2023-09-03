import clsx from 'clsx';
import type { Metadata } from 'next';
import { POPPINS, ROBOTO_MONO } from '@/config/fonts';
import ApolloWrapper from '@/utils/apollo-wrapper';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import '@/styles/index.scss';

export const metadata: Metadata = {
    title: 'Tech Test GoTo',
    description: 'Technical Test GoTo by hattaalfaritzy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={clsx('scroll-smooth', POPPINS.variable, ROBOTO_MONO.variable)}>
            <body className='flex flex-col w-screen h-auto min-h-screen'>
                <ApolloWrapper>
                    <div id='layout-default'>
                        <Header /> 
                        <main className='main'>{children}</main>
                        <Footer />
                    </div>
                </ApolloWrapper>
            </body>
        </html>
    );
}
