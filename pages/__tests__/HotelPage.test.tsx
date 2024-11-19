import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelPage, { getServerSideProps } from '../../../pages/hotels/[hotel-id]';
import { Hotel } from '../../../types/types';

// Mock hotel data
const mockHotelData: Hotel = {
    id: '1',
    title: 'Mock Hotel',
    description: 'A beautiful hotel with scenic views.',
    guestCount: 4,
    bedroomCount: 2,
    bathroomCount: 1,
    amenities: ['Free WiFi', 'Pool', 'Air conditioning'],
    images: ['/image1.jpg', '/image2.jpg'],
    hostInformation: {
        name: 'Host Name',
        contact: 'contact@mockhotel.com'
    },
    address: '123 Mock Street, Mock City',
    latitude: 40.7128,
    longitude: -74.0060,
    rooms: [
        {
            hotelSlug: 'mock-hotel',
            roomSlug: 'mock-room-1',
            roomTitle: 'Deluxe Suite',
            bedroomCount: 1,
            roomImage: '/room1.jpg'
        }
    ]
};

describe('HotelPage Component', () => {
    it('renders the hotel details correctly when hotel data is provided', () => {
        render(<HotelPage hotelData={mockHotelData} />);

        expect(screen.getByText('Mock Hotel')).toBeInTheDocument();
        expect(screen.getByText('A beautiful hotel with scenic views.')).toBeInTheDocument();
        expect(screen.getByText('2 bedrooms')).toBeInTheDocument();
        expect(screen.getByText('1 bathroom')).toBeInTheDocument();
        expect(screen.getByText('123 Mock Street, Mock City')).toBeInTheDocument();
        expect(screen.getByText('Free WiFi')).toBeInTheDocument();
        expect(screen.getByText('Pool')).toBeInTheDocument();
    });

    it('renders a loading message when hotelData is null', () => {
        render(<HotelPage hotelData={null} />);
        expect(screen.getByText('Loading hotel data...')).toBeInTheDocument();
    });
});

// Test for getServerSideProps function
describe('getServerSideProps', () => {
    it('fetches hotel data and returns it as props', async () => {
        jest.spyOn(global, 'readFileSync').mockImplementation(() => JSON.stringify(mockHotelData));

        const context = {
            params: {
                'hotel-id': '1',
            },
        };

        const response = await getServerSideProps(context as any);
        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    hotelData: mockHotelData,
                },
            })
        );
    });

    it('returns null when there is an error loading hotel data', async () => {
        jest.spyOn(global, 'readFileSync').mockImplementation(() => {
            throw new Error('File not found');
        });

        const context = {
            params: {
                'hotel-id': '9999',
            },
        };

        const response = await getServerSideProps(context as any);
        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    hotelData: null,
                },
            })
        );
    });
});
