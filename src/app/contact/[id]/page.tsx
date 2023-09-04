'use client';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { HeadingLink, ListForm } from '@/components/commons';
import { GET_CONTACT_DETAIL } from '@/graphql/queries/contact';

export default function DetailContact() {
    const { id } = useParams();
    const id_detail = parseInt(id.toString(), 10);
    const { data: detail_contact, loading } = useQuery<ContactInterface.ApiResponseDetail>(GET_CONTACT_DETAIL, {
        variables: { id: id_detail },
    });

    return (
        <div className='flex flex-col justify-start items-start w-full py--default space-y-4'>
            <HeadingLink title='Detail Contact' label={`${detail_contact?.contact_by_pk?.first_name} ${detail_contact?.contact_by_pk?.last_name}`} withBack />
            <ListForm title='First Name' value={detail_contact?.contact_by_pk?.first_name} loading={loading} />
            <ListForm title='Last Name' value={detail_contact?.contact_by_pk?.last_name} loading={loading} />
            <ListForm
                title='Phone'
                loading={loading}
                renderValue={detail_contact?.contact_by_pk?.phones?.map((phone, idx) => (
                    <span key={idx} className='text-black text-xs capitalize'>
                        {phone.number}
                    </span>
                ))}
            />
        </div>
    );
}
