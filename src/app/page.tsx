'use client'
import { HeadingLink, ListForm } from '@/components/commons';
import { GET_CONTACTS } from '@/graphql/queries/contact';
import { useQuery } from "@apollo/client";

export default function Home() {

    const { data: contacts } = useQuery<ContactInterface.ApiResponse>(GET_CONTACTS, {
        variables: {
            limit: 10,
            offset: 0,
        }
    });

    return (
        <main className='flex flex-col items-center w-full py-10 space-y-10'>
            <HeadingLink title='List Contact' />
            <div className='grid grid-cols-2 gap-6 w-full'>
                {contacts?.contact?.map((item, index) => (
                    <ListForm key={index} title={`${item?.first_name} ${item?.last_name}`} />
                ))}
            </div>
        </main>
    );
}
