'use client';
import { Button, Card, HeadingLink, Icon } from '@/components/commons';
import { InputText } from '@/components/forms';
import { EDIT_CONTACT } from '@/graphql/mutations/contact-mutations';
import { GET_CONTACT_DETAIL } from '@/graphql/queries/contact';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export default function EditContact() {
    const router = useRouter();
    const { id } = useParams();
    const id_detail = parseInt(id.toString(), 10);

    const [editContactMutation, { loading }] = useMutation(EDIT_CONTACT);
    const { data: detail_contact, loading: loading_detail } = useQuery<ContactInterface.ApiResponseDetail>(GET_CONTACT_DETAIL, {
        variables: { id: id_detail },
    });

    const defaultValues = {
        first_name: detail_contact?.contact_by_pk?.first_name || '',
        last_name: detail_contact?.contact_by_pk?.last_name || '',
        phones: detail_contact?.contact_by_pk?.phones || []
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
    } = useForm({
        defaultValues
    });
    
    const { fields } = useFieldArray({
        control,
        name: 'phones',
    });

    useEffect(() => {
        if (detail_contact && !loading_detail) {
            setValue('first_name', detail_contact.contact_by_pk.first_name);
            setValue('last_name', detail_contact.contact_by_pk.last_name);
            setValue('phones', detail_contact.contact_by_pk.phones);
        }
    }, [detail_contact, loading_detail, setValue]);

    const onSubmit = async (value: any) => {
        console.log(value, 'value');    
        try {
            await editContactMutation({
                variables: {
                    id: id_detail,
                    _set: {
                        first_name: value.first_name,
                        last_name: value.last_name,
                        phones: value.phones.map((phone: any) => ({ number: phone.number.toString() }))
                    },
                },
            });
            router.push('/');
        } catch (e) {
            console.error('Error editing contact:', e);
        }
    };
    
    if (loading_detail) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col items-center w-full py--default space-y-8'>
            <HeadingLink title='Edit Contact' label={`${detail_contact?.contact_by_pk?.first_name} ${detail_contact?.contact_by_pk?.last_name}`} withBack />
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-6 w-full'>
                <Card className='flex flex-col space-y-6 w-full bg-primary/10'>
                    <InputText defaultValue={defaultValues.first_name} disabled={loading} register={register('first_name')} errMessage={errors.first_name?.message} placeholder='Input your first name' label='First Name' />
                    <InputText defaultValue={defaultValues.last_name} disabled={loading} register={register('last_name')} errMessage={errors.last_name?.message} placeholder='Input your last name' label='Last Name' />
                    {fields.map((field, index) => (
                        <div className='flex flex-row justify-between items-end w-full space-x-6' key={field.id}>
                            <InputText
                                defaultValue={field.number}
                                disabled={true}
                                register={register(`phones.${index}.number`)}
                                errMessage={errors.phones?.[index]?.number?.message}
                                placeholder='Input your phone'
                                label={`Phone ${index + 1}`}
                                type='number'
                            />
                        </div>
                    ))}
                </Card>
                <Button disabled={loading} label='Edit Contact' type='submit' className='w-full max-w-fit' />
            </form>
        </div>
    );
}
