import { waitFor, screen } from '@testing-library/react';
import { GET_CONTACTS } from '@/graphql/queries/contact';
import Home from '@/app/contact/page';
import { render } from '@/utils/test-utils';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Home Component Tests', () => {
  // Mock Local Storage
  let mockLocalStorage: any;
  beforeEach(() => {
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display favorite contacts correctly', async () => {
    const mocks = [
      {
        request: {
          query: GET_CONTACTS,
          variables: { where: {} },
        },
        result: {
          data: {
            contact: [
              { id: 1, first_name: 'John', last_name: 'Doe', phones: [{ number: '1234567890' }] },
              { id: 2, first_name: 'Jane', last_name: 'Smith', phones: [{ number: '9876543210' }] },
            ],
          },
        },
        delay: 10  // Add a slight delay
      },
    ];

    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([
      { id: 1, first_name: 'John', last_name: 'Doe', phones: [{ number: '1234567890' }] },
      { id: 2, first_name: 'Jane', last_name: 'Smith', phones: [{ number: '9876543210' }] },
    ]));

    render(<Home />, { mocks });

    const johnDoe = await screen?.findByText('John Doe');
    const janeSmith = await screen?.findByText('Jane Smith');

    expect(johnDoe).toBeInTheDocument();
    expect(janeSmith).toBeInTheDocument();

  });
});
