declare namespace ContactInterface {

    export interface Phone {
        number: number;
    }

    export interface Contact {
        created_at: Date,
        first_name: string,
        id: number,
        last_name: string,
        phones: Phone[];
    }

    export interface ApiResponse {
        contact: Contact[];
    }

    export interface ApiResponseDetail {
        contact_by_pk: Contact;
    }
}