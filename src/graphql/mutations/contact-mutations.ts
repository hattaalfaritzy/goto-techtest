import { gql } from '@apollo/client';

export const ADD_CONTACT = gql`
    mutation insert_contact($first_name: String!, $last_name: String!, $phones: [phone_insert_input!]!) {
        insert_contact(objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }) {
            returning {
                id
                first_name
                last_name
                phones {
                    number
                }
            }
        }
    }
`;

export const EDIT_CONTACT = gql`
    mutation update_contact_by_pk($id: Int!, $_set: contact_set_input) {
        update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
            id
            first_name
            last_name
            phones {
                number
            }
        }
    }
`;

export const DELETE_CONTACT = gql`
    mutation delete_contact_by_pk($id: Int!) {
        delete_contact_by_pk(id: $id) {
            first_name
            last_name
            id
        }
    }
`;