import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelPage, { getServerSideProps } from '../../pages/hotels/[hotel-slug]/[hotel-id]';
import { Hotel } from '../../types/types';
import fs from 'fs';
import { useRouter } from 'next/router';

// Mock next/router to avoid the "NextRouter not mounted" error
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

// Mock hotel data for testing
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
    beforeEach(() => {
        // Mock the useRouter hook to return default values for your tests
        (useRouter as jest.Mock).mockReturnValue({
            query: {},
            pathname: '/',
            route: '/',
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn().mockResolvedValue(undefined),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
            isFallback: false,
        });
    });

    it('renders the hotel details correctly when hotel data is provided', () => {
        act(() => {
            render(<HotelPage hotelData={mockHotelData} />);
        });

        // Use `getAllByRole` if multiple matching elements are expected and check the length
        const headings = screen.getAllByRole('heading', { name: /Mock Hotel/i });
        expect(headings.length).toBeGreaterThan(0);

        // If you want to assert the main title, narrow down by the container or use `screen.getByText`
        expect(screen.getByText('Mock Hotel')).toBeInTheDocument();

        expect(screen.getByText('A beautiful hotel with scenic views.')).toBeInTheDocument();
        expect(screen.getByText('2 bedrooms')).toBeInTheDocument();
        expect(screen.getByText('1 bathroom')).toBeInTheDocument();
        expect(screen.getByText('123 Mock Street, Mock City')).toBeInTheDocument();
        expect(screen.getByText('Free WiFi')).toBeInTheDocument();
        expect(screen.getByText('Pool')).toBeInTheDocument();
        expect(screen.getByText('Air conditioning')).toBeInTheDocument();
    });

    it('renders a loading message when hotelData is null', () => {
        render(<HotelPage hotelData={null} />);
        expect(screen.getByText('Loading hotel data...')).toBeInTheDocument();
    });
});

describe('getServerSideProps', () => {
    beforeEach(() => {
        jest.restoreAllMocks(); // Reset any mocked functions before each test
    });

    it('fetches hotel data and returns it as props', async () => {
        // Mock `readFileSync` to return mock hotel data
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(mockHotelData));

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
        // Mock `readFileSync` to throw an error to simulate a file not found scenario
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
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
