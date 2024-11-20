import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage, { getServerSideProps } from '../../pages/index';
import path from 'path';
import fs from 'fs';
import { Hotel } from '../../types/types';
import { GetServerSidePropsContext } from 'next';

jest.mock('fs');
jest.mock('path');

// Define the mockHotels variable
const mockHotels: Hotel[] = [
  {
    id: '1',
    title: 'Mock Hotel 1',
    description: 'This is a description for Mock Hotel 1.',
    guestCount: 2,
    bedroomCount: 1,
    bathroomCount: 1,
    amenities: ['WiFi', 'Pool'],
    images: ['/images/hotel1.jpg'],
    hostInformation: {
      name: 'Host 1',
      contact: 'host1@example.com',
    },
    address: '123 Mock Street, Mock City',
    latitude: 40.7128,
    longitude: -74.0060,
    rooms: [],
  },
  {
    id: '2',
    title: 'Mock Hotel 2',
    description: 'This is a description for Mock Hotel 2.',
    guestCount: 4,
    bedroomCount: 2,
    bathroomCount: 1,
    amenities: ['Parking', 'Air conditioning'],
    images: ['/images/hotel2.jpg'],
    hostInformation: {
      name: 'Host 2',
      contact: 'host2@example.com',
    },
    address: '456 Another Street, Mock City',
    latitude: 34.0522,
    longitude: -118.2437,
    rooms: [],
  },
];

describe('HomePage Component', () => {
  it('renders hotel cards correctly', () => {
    render(<HomePage hotels={mockHotels} />);

    // Check if each hotel card is rendered with the correct information
    mockHotels.forEach((hotel) => {
      expect(screen.getByText(hotel.title)).toBeInTheDocument();
      expect(screen.getByText(`${hotel.description.slice(0, 100)}...`)).toBeInTheDocument();
    });
  });

  it('displays a fallback image if no image is provided', () => {
    const hotelsWithoutImages: Hotel[] = [
      {
        ...mockHotels[0],
        images: undefined,
      },
    ];

    render(<HomePage hotels={hotelsWithoutImages} />);
    const imageElements = screen.getAllByRole('img');
    expect(imageElements[0]).toHaveAttribute('src', '/images/h1.png');
  });
});

describe('getServerSideProps', () => {
  it('fetches hotel data and returns it as props', async () => {
    const mockFileNames = ['1.json', '2.json'];
    const mockFileContent = JSON.stringify(mockHotels[0]);

    // Mock the fs methods
    (fs.readdirSync as jest.Mock).mockReturnValue(mockFileNames);
    (fs.readFileSync as jest.Mock).mockImplementation(() => mockFileContent);

    const context = {} as GetServerSidePropsContext;
    const result = await getServerSideProps(context);

    expect(result).toEqual(
      expect.objectContaining({
        props: {
          hotels: expect.arrayContaining([
            expect.objectContaining({
              id: '1',
              title: 'Mock Hotel 1',
            }),
          ]),
        },
      })
    );
  });

  it('handles errors gracefully and returns an empty hotels array', async () => {
    (fs.readdirSync as jest.Mock).mockImplementation(() => {
      throw new Error('Error reading directory');
    });

    const context = {} as GetServerSidePropsContext;
    const result = await getServerSideProps(context);

    expect(result).toEqual(
      expect.objectContaining({
        props: {
          hotels: [],
        },
      })
    );
  });
});
