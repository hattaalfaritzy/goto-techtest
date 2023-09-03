'use client'
import { ApolloProvider } from '@apollo/client';
import { client } from '@/graphql/apollo';

export default function ApolloWrapper({ children }: Props) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

interface Props {
    children: React.ReactNode;
}