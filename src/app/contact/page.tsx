'use client';
import { useState, useEffect } from 'react';
import { InputText } from '@/components/forms';
import { Button, Card, HeadingLink, Icon, ListForm, Pagination, Table } from '@/components/commons';
import { GET_CONTACTS } from '@/graphql/queries/contact';
import { useMutation, useQuery } from '@apollo/client';
import useStorage from '@/hooks/use-storage';
import { useRouter } from 'next/navigation';
import { DELETE_CONTACT } from '@/graphql/mutations/contact-mutations';

export default function Home() {
    const router = useRouter();
    const { setLocalStorageItem, getLocalStorageItem } = useStorage();
    const [contactsData, setContactsData] = useState<ContactInterface.Contact[]>([]);
    const [favoriteContacts, setFavoriteContacts] = useState<ContactInterface.Contact[]>([]);
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const limitPage = 10;

    const [graphqlVariables, setGraphqlVariables] = useState({
        where: {},
    });

    const {
        data: contacts,
        loading,
        refetch,
    } = useQuery<ContactInterface.ApiResponse>(GET_CONTACTS, {
        variables: graphqlVariables,
    });

    const [deleteContactMutation] = useMutation(DELETE_CONTACT);

    const onDelete = async (id: number) => {
        try {
            await deleteContactMutation({
                variables: {
                    id: id,
                },
            });
            refetch();
        } catch (e) {
            console.error('Error delete contact:', e);
        }
    };

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

    useEffect(() => {
        if (shouldRefetch) {
            refetch().then(({ data: newData }) => {
                const updatedContacts = newData.contact.filter((contact) => !favoriteContacts.find((fav) => fav.id === contact.id));
                setContactsData(updatedContacts);
                setLocalStorageItem('contact', updatedContacts);
                setShouldRefetch(false);
            });
        }
    }, [shouldRefetch]);

    const addToFavorites = (contact: ContactInterface.Contact) => {
        setFavoriteContacts([...favoriteContacts, contact]);
        const updatedContacts = contactsData.filter((item) => item.id !== contact.id);
        setContactsData(updatedContacts);
        setLocalStorageItem('favorites', [...favoriteContacts, contact]);
        setLocalStorageItem('contact', updatedContacts);
    };

    const removeFromFavorites = (contact: ContactInterface.Contact) => {
        setFavoriteContacts(favoriteContacts.filter((item) => item.id !== contact.id));
        const updatedContacts = [...contactsData, contact];
        setContactsData(updatedContacts);
        setLocalStorageItem('contact', updatedContacts);
        setLocalStorageItem(
            'favorites',
            favoriteContacts.filter((item) => item.id !== contact.id)
        );
    };

    const handleSearchChange = (search: string) => {
        setCurrentPage(1);
        if (search.trim() === '') {
            setGraphqlVariables({ where: {} });
        } else {
            setGraphqlVariables({
                where: {
                    _or: [{ first_name: { _ilike: `%${search}%` } }, { last_name: { _ilike: `%${search}%` } }],
                },
            });
        }
    };

    const startIndex = (currentPage - 1) * limitPage;
    const endIndex = startIndex + limitPage;
    const contactsToDisplay = contactsData?.slice(startIndex, endIndex);
    const columns: string[] = ['No.', 'First Name', 'Last Name', 'Phone', 'Action'];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='flex flex-col items-center w-full py--default space-y-8'>
            <div className='flex flex-col w-full'>
                <HeadingLink title='List Favorite Contacts' />
                <div className='grid grid-cols-1 gap-4 w-full'>
                    {favoriteContacts.length > 0 ? (
                        favoriteContacts.map((item, index) => (
                            <Card key={index} className='flex flex-row justify-between items-start space-y-1' withShadow>
                                <div className='flex flex-col w-full justify-start items-start'>
                                    <ListForm title='Name' loading={loading} value={`${item?.first_name} ${item?.last_name}`} />
                                    <ListForm
                                        title='Phone'
                                        loading={loading}
                                        renderValue={item?.phones.map((phone, idx) => (
                                            <span key={idx} className='text-black text-xs capitalize'>
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
                        <div className='flex justify-center items-center w-full'>Favorite Contact Empty</div>
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
                        <Button
                            label='Add Contact'
                            className='py-2 px-4 bg-primary-700 hover:bg-opacity-70'
                            onClick={() => {
                                router.push('/add-contact');
                            }}
                        />
                    </div>
                    <Table columns={columns} loading={loading}>
                        {contactsToDisplay.length > 0 ? (
                            contactsToDisplay.map((value, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value?.first_name ?? '-'}</td>
                                    <td>{value?.last_name ?? '-'}</td>
                                    <td>
                                        <span className='text-black text-xs capitalize'>{value?.phones[0]?.number}</span>
                                        {value?.phones.length > 1 && (
                                            <span className='text-black text-xs capitalize mx-1'>({value.phones.length - 1} more)</span>
                                        )}
                                    </td>
                                    <td className='flex flex-row space-x-1 justify-center items-center'>
                                        <Button
                                            variant='transparent'
                                            className='group p-1.5 border border-warning hover:border-warning hover:bg-warning'
                                            rounded
                                            onClick={() => addToFavorites(value)}
                                        >
                                            <Icon name='favorite' width={14} className='fill-warning group-hover:fill-white' />
                                        </Button>
                                        <Button
                                            variant='transparent'
                                            className='group p-1.5 border border-primary-700 hover:border-primary-700 hover:bg-primary-700'
                                            rounded
                                            onClick={() => {
                                                router.push(`/contact/${value.id}`);
                                            }}
                                        >
                                            <Icon name='menu' width={16} className='fill-primary-700 group-hover:fill-white' />
                                        </Button>
                                        <Button
                                            variant='transparent'
                                            className='group p-1.5 border border-error hover:border-error hover:bg-error'
                                            rounded
                                            onClick={() => onDelete(value?.id)}
                                        >
                                            <Icon name='trash' width={16} className='fill-error group-hover:fill-white' />
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
                    <Pagination total={contacts?.contact.length} itemsPerPage={limitPage} currentPage={currentPage} onClickPage={handlePageChange} />
                </div>
            </div>
        </div>
    );
}
