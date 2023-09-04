'use client';
import { useState, useEffect } from 'react';
import { InputText } from '@/components/forms';
import { Button, Card, HeadingLink, Icon, ListForm, Table } from '@/components/commons';
import { GET_CONTACTS } from '@/graphql/queries/contact';
import { useQuery } from '@apollo/client';
import useStorage from '@/hooks/use-storage';

export default function Home() {
    const { setLocalStorageItem, getLocalStorageItem } = useStorage();
    const [contactsData, setContactsData] = useState<ContactInterface.Contact[]>([]);
    const [favoriteContacts, setFavoriteContacts] = useState<ContactInterface.Contact[]>([]);

    const [graphqlVariables, setGraphqlVariables] = useState({
        limit: 10,
        offset: 0,
        where: {},
    });

    const { data: contacts, loading } = useQuery<ContactInterface.ApiResponse>(GET_CONTACTS, {
        variables: graphqlVariables,
    });

    console.log(contacts, 'contacts search');

    useEffect(() => {
        const storedContacts = getLocalStorageItem('contact');
        const storedFavorites = getLocalStorageItem('favorites');
        if (storedContacts) {
            setContactsData(storedContacts);
        }
        if (storedFavorites) {
            setFavoriteContacts(storedFavorites);
        }
    }, []);

    useEffect(() => {
        if (contacts?.contact) {
            const updatedContacts = contacts.contact.filter((contact) => !favoriteContacts.find((fav) => fav.id === contact.id));
            setContactsData(updatedContacts);
            setLocalStorageItem('contact', updatedContacts);
        }
    }, [contacts?.contact]);

    const addToFavorites = (contact: ContactInterface.Contact) => {
        setFavoriteContacts([...favoriteContacts, contact]);
        setContactsData(contactsData.filter((item) => item.id !== contact.id));
        setLocalStorageItem('favorites', [...favoriteContacts, contact]);
        setLocalStorageItem(
            'contact',
            contactsData.filter((item) => item.id !== contact.id)
        );
    };

    const removeFromFavorites = (contact: ContactInterface.Contact) => {
        setFavoriteContacts(favoriteContacts.filter((item) => item.id !== contact.id));
        setContactsData([...contactsData, contact]);
        setLocalStorageItem('contact', [...contactsData, contact]);
        setLocalStorageItem(
            'favorites',
            favoriteContacts.filter((item) => item.id !== contact.id)
        );
    };

    const handleSearchChange = (search: string) => {
        if (search.trim() === '') {
            setGraphqlVariables({
                limit: 10,
                offset: 0,
                where: {},
            });
        } else {
            setGraphqlVariables((prev) => ({
                ...prev,
                where: {
                    _or: [{ first_name: { _ilike: `%${search}%` } }, { last_name: { _ilike: `%${search}%` } }],
                },
            }));
        }
    };

    const columns: string[] = ['No.', 'First Name', 'Last Name', 'Phone', 'Action'];

    return (
        <main className='flex flex-col items-center w-full py--default space-y-8'>
            <div className='flex flex-col w-full'>
                <HeadingLink title='List Favorite Contacts' />
                <div className='grid grid-cols-1 gap-4 w-full'>
                    {favoriteContacts && favoriteContacts.length > 0 ? (
                        favoriteContacts.map((item, index) => (
                            <Card className='flex flex-row justify-between items-start space-y-1' withShadow key={index}>
                                <div className='flex flex-col w-full justify-start items-start'>
                                    <ListForm title='Name' loading={loading} value={`${item?.first_name} ${item?.last_name}`} />
                                    <ListForm
                                        title='Phone'
                                        loading={loading}
                                        renderValue={item?.phones.map((phone, idx) => (
                                            <span className='text-black text-xs capitalize' key={idx}>
                                                {phone.number}
                                            </span>
                                        ))}
                                    />
                                </div>
                                <div className='flex flex-row justify-start items-center space-x-2'>
                                    <Button
                                        variant='transparent'
                                        className='group p-1.5 border border-error hover:border-error hover:bg-error'
                                        rounded
                                        onClick={() => removeFromFavorites(item)}
                                    >
                                        <Icon name='trash' width={16} className='fill-error group-hover:fill-white' />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className='flex justify-center items-center w-full'>Favorite Contact not found</div>
                    )}
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <HeadingLink title='List Contacts' />
                <div className='flex flex-col w-full space-y-6'>
                    <div className='flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0 w-full'>
                        <form className='flex flex-row justify-start items-center space-x-6 w-full lg:w-auto'>
                            <InputText
                                placeholder='Search First or Last Name'
                                iconRight={<Icon name='search' />}
                                rounded
                                className='w-full lg:w-[445px]'
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                        </form>
                        <Button label='Add Contact' className='py-2 px-4' />
                    </div>
                    <Table columns={columns} loading={loading}>
                        {contactsData && contactsData.length > 0 ? (
                            contactsData.map((value, index) => (
                                <tr key={index} className='cursor-pointer'>
                                    <td>{index + 1}</td>
                                    <td>{value?.first_name ?? '-'}</td>
                                    <td>{value?.last_name ?? '-'}</td>
                                    <td>
                                        <span className='text-black text-xs capitalize'>{value?.phones[0]?.number}</span>
                                        {value?.phones.length > 1 && (
                                            <span className='text-black text-xs capitalize mx-1'>({value.phones.length - 1} more)</span>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant='transparent'
                                            className='group p-1.5 border border-error hover:border-error hover:bg-error'
                                            rounded
                                            onClick={() => addToFavorites(value)}
                                        >
                                            <Icon name='favorite' width={14} className='fill-error group-hover:fill-white' />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className='text-center'>
                                    Contacts not found
                                </td>
                            </tr>
                        )}
                    </Table>
                </div>
            </div>
        </main>
    );
}
