import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const phoneSchema = Yup.object().shape({
    number: Yup.string().required('Phone is required'),
});

const addContactSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required')
        .matches(/^[a-zA-Z\s]+$/, 'First name should not contain special characters'),
    last_name: Yup.string()
        .required('Last name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Last name should not contain special characters'),
    phones: Yup.array().of(phoneSchema).min(1, 'At least one phone is required'),
});

export const formAddContact = { resolver: yupResolver(addContactSchema) };
