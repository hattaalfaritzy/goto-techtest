import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1ACB3C',
                    50: '#A9F4B7',
                    100: '#97F2A8',
                    200: '#72ED8A',
                    300: '#4EE86C',
                    400: '#2AE44E',
                    500: '#1ACB3C',
                    600: '#14992D',
                    700: '#0D681F',
                    800: '#073610',
                    900: '#010401',
                    950: '#000000'
                },
                dark: {
                    DEFAULT: '#1C1C28',
                    100: '#28293D',
                    200: '#555770',
                    300: '#8F90A6',
                    400: '#C7C9D9',
                },
                light: {
                    DEFAULT: '#E4E4EB',
                    100: '#EBEBF0',
                    200: '#F2F2F5',
                    300: '#FAFAFC',
                    400: '#FFFFFF',
                },
                success: {
                    DEFAULT: '#239A2F',
                    100: '#2CD03D',
                    200: '#80E38B',
                    300: '#C0F1C5',
                    400: '#F4FDF5',
                },
                informative: {
                    DEFAULT: '#1659BD',
                    100: '#2270E4',
                    200: '#7BA9EF',
                    300: '#BDD4F7',
                    400: '#F4F8FE',
                },
                warning: {
                    DEFAULT: '#C2A613',
                    100: '#EDCE2C',
                    200: '#F4E281',
                    300: '#FAF0C0',
                    400: '#FEFDF4',
                },
                error: {
                    DEFAULT: '#B21E13',
                    100: '#E91F10',
                    200: '#F27970',
                    300: '#F8BCB7',
                    400: '#FEF4F3',
                },
            },
            fontFamily: {
                sans: ['var(--font-poppins)', ..._fontFamily.sans],
                mono: ['var(--font-roboto-mono)', ..._fontFamily.mono],
            },
            fontSize: {
                xxxs: '.5rem',
                xxs: '.625rem',
            },
            screens: {
                xsm: '360px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
        },
    },
    plugins: [],
};
export default config;
