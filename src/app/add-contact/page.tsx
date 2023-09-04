'use client';
import { Button, HeadingLink } from '@/components/commons';
import { InputText } from '@/components/forms';
import { ADD_CONTACT } from '@/graphql/mutations/contact-mutations';
import { formAddContact } from '@/utils/form-validation';
import { useMutation } from '@apollo/client';
import { useForm, useFieldArray } from 'react-hook-form';

export default function AddContact() {
    const [addContactMutation, { data, loading, error }] = useMutation(ADD_CONTACT);
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
            console.log('Contact added successfully.');
        } catch (e) {
            console.error('Error adding contact:', e);
        }
    };

    return (
        <div className='flex flex-col items-center w-full py--default space-y-8'>
            <HeadingLink title='Add Contact' withBack />
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-6 w-full'>
                <InputText register={register('first_name')} errMessage={errors.first_name?.message} placeholder='Input your first name' label='First Name' />
                <InputText register={register('last_name')} errMessage={errors.last_name?.message} placeholder='Input your last name' label='Last Name' />
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <InputText
                            register={register(`phones.${index}.number`)}
                            errMessage={errors.phones?.[index]?.number?.message}
                            placeholder='Input your phone'
                            label='Phone'
                            type='number'
                        />
                        <button onClick={() => remove(index)}>Remove</button>
                    </div>
                ))}
                <button type='button' onClick={() => append({ number: '' })}>
                    Add Phone
                </button>
                <Button label='Add Contact' type='submit' className='w-full' />
            </form>
        </div>
    );
}
