# GoTo Technical Test: Software Engineer - Web Platform
 This project was created as part of the technical test for GoTo's Software Engineer - Web Platform role. The application was built using the Next.js framework and other modern tools.

## 🚢 Deploy
https://goto-techtest.vercel.app/

## 🚀 Getting Started

1. **Setting up the Environment.**
Before starting the development server, ensure you have set up the necessary environment variables. Create a .env.local file in the root of the project and add:
```
NEXT_PUBLIC_API_URL=https://wpe-hiring.tokopedia.net/graphql
NODE_ENV=development
```

2. **Running the Development Server**
Start the development server using:
```
npm run dev
# or
yarn dev
# or
pnpm dev
```
Once started, open http://localhost:3000 with your browser to see the application.

## 📚 Script
- `yarn dev` - Run development mode
- `yarn build` - Build the application for production
- `yarn start` - Start a Next.js production server (require yarn build first)
- `yarn lint` - Linting the code [ESLint](https://eslint.org/)
- `yarn lint:fix` - Auto-fixing linting issues
- `yarn test` - Running tests

## 🛠 Tools and Libraries
This project uses a range of modern libraries and tools:
- **Next.js**: The core framework.
- **Apollo Client**: For fetching, caching, and state management of GraphQL data.
- **React Hook Form**: Efficient form management
- **TailwindCSS**: Utility-first CSS framework.
- **Jest**: Testing framework.
- **@emotion/react**: Library for writing CSS styles with JavaScript.
- **yup**: Object schema validation.

## File Structure

```raw
.
├── 📂 __test__/                 Tests files.
├── 📂 public/                   Public files (e.g. favicon).
├── 📂 src/
│   ├── ⚛️ app/                   Next.js page components.
│   ├── ⚛️ components/
│   │   ├── ⚛️ commons/           Common components.
│   │   ├── ⚛️ forms/             Common components which is used specifically for user input.
│   │   └── ⚛️ layouts/           Components which has specific location in a page and cannot just be placed anywhere (e.g. header, sidebar, footer).
│   ├── 📂 config/               The configuration for the application.
│   ├── 📂 graphql/              Apollo Client Graphql (e.g. queries n mutations).
│   ├── ⚛️ hooks/                 Custom hooks.
│   ├── 📂 styles/
│   │   ├── 📂 components/       SCSS files for components (e.g. button, table, n input form).
│   │   ├── 📂 layouts/          SCSS files for specific location in a page and cannot just be placed anywhere (e.g. header, sidebar, footer).
│   │   ├── _base.scss           Base styles.
│   │   ├── _utilities.scss      Contains utility classes.
│   │   └── index.scss           Contains @import statements to merge all SCSS files.
│   ├── 📂 types/                Types for data.
│   ├── 📂 utils/                Utility functions.
├── .env.example                 Specify which environment variables are server-only and which should be exposed to the browser.
├── .eslintrc.json               ESLint configuration.
├── .gitignore
├── jest.config.js               Jest configuration.
├── jest.setup.js                Jest Setup.
├── next.config.js               Next configuration.
├── package.json
├── postcss.config.js
├── README.md                    Information about the application.
├── tailwind.config.js           The configuration TailwindCss for the application.
└── tsconfig.json                The configuration Typescript for the application.

Notes:
📂: Folder
⚛️: React-related folder
```