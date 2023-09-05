'use client';
import { Button, Card, HeadingLink, Icon } from '@/components/commons';
import { InputText } from '@/components/forms';
import { ADD_CONTACT } from '@/graphql/mutations/contact-mutations';
import { GET_CONTACTS } from '@/graphql/queries/contact';
import { formAddContact } from '@/utils/form-validation';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';

export default function AddContact() {
    const router = useRouter();
    const [addContactMutation, { loading }] = useMutation(ADD_CONTACT, {
        refetchQueries: [{ query: GET_CONTACTS }],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm(formAddContact);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'phones',
    });

    const onSubmit = async (formData: any) => {
        try {
            await addContactMutation({
                variables: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phones: formData.phones,
                },
            });
            router.push('/');
        } catch (e) {
            console.error('Error adding contact:', e);
        }
    };

    return (
        <div className='flex flex-col items-center w-full py--default space-y-8'>
            <HeadingLink title='Add Contact' withBack />
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-end items-end space-y-6 w-full'>
                <Card className='flex flex-col space-y-6 w-full bg-primary/10'>
                    <InputText
                        disabled={loading}
                        register={register('first_name')}
                        errMessage={errors.first_name?.message}
                        placeholder='Input your first name'
                        label='First Name'
                        important
                    />
                    <InputText
                        disabled={loading}
                        register={register('last_name')}
                        errMessage={errors.last_name?.message}
                        placeholder='Input your last name'
                        label='Last Name'
                        important
                    />
                    {fields.map((field, index) => (
                        <div className='flex flex-row justify-between items-end w-full space-x-6' key={field.id}>
                            <InputText
                                disabled={loading}
                                register={register(`phones.${index}.number`)}
                                errMessage={errors.phones?.[index]?.number?.message}
                                placeholder='Input your phone'
                                label={`Phone ${index + 1}`}
                                type='number'
                                important
                            />
                            <Button
                                variant='transparent'
                                className='group p-1.5 border border-error hover:border-error hover:bg-error'
                                rounded
                                onClick={() => remove(index)}
                            >
                                <Icon name='trash' width={16} className='fill-error group-hover:fill-white' />
                            </Button>
                        </div>
                    ))}
                    <Button
                        type='button'
                        label='Add Phone Number'
                        className='py-2 px-4 bg-primary-700 hover:bg-opacity-70'
                        onClick={() => append({ number: '' })}
                    />
                </Card>
                <Button disabled={loading} label='Add Contact' type='submit' className='w-full max-w-fit' />
            </form>
        </div>
    );
}
