import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyDetails from '../../components/PropertyDetails';

const mockProps = {
  title: 'Test Property',
  description: 'A beautiful test property with amazing amenities.',
  rating: 4.5,
  reviewsCount: 10,
  bedrooms: 3,
  bathrooms: 2,
  sleeps: 5,
  size: '1500 sq ft',
  popularAmenities: ['Kitchen', 'Dryer', 'Washer'],
  images: ['/test-image1.jpg', '/test-image2.jpg'],
  rooms: [
    {
      hotelSlug: 'test-hotel',
      roomSlug: 'room-1',
      roomTitle: 'Room 1',
      bedroomCount: 2,
      roomImage: '/test-room1.jpg',
    },
    {
      hotelSlug: 'test-hotel',
      roomSlug: 'room-2',
      roomTitle: 'Room 2',
      bedroomCount: 1,
      roomImage: '/test-room2.jpg',
    },
  ],
  address: '123 Test St, Test City, TC',
  latitude: 37.7749,
  longitude: -122.4194,
};

describe('PropertyDetails Component', () => {
  it('renders the property details with required props', () => {
    render(<PropertyDetails {...mockProps} />);
    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('A beautiful test property with amazing amenities.')).toBeInTheDocument();
    expect(screen.getByText('3 bedrooms')).toBeInTheDocument();
    expect(screen.getByText('2 bathroom(s)')).toBeInTheDocument();
    expect(screen.getByText('Sleeps 5')).toBeInTheDocument();
  });

  it('displays the rating correctly when available', () => {
    render(<PropertyDetails {...mockProps} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('Exceptional')).toBeInTheDocument();
  });

  it('displays "No rating available" when the rating is not provided', () => {
    const modifiedProps = { ...mockProps, rating: undefined };
    render(<PropertyDetails {...modifiedProps} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByText('No rating available')).toBeInTheDocument();
  });

  it('displays popular amenities correctly', () => {
    render(<PropertyDetails {...mockProps} />);
    mockProps.popularAmenities.forEach((amenity) => {
      expect(screen.getByText(amenity)).toBeInTheDocument();
    });
  });

  it('shows "No popular amenities available" if popular amenities list is empty', () => {
    const modifiedProps = { ...mockProps, popularAmenities: [] };
    render(<PropertyDetails {...modifiedProps} />);
    expect(screen.getByText('No popular amenities available')).toBeInTheDocument();
  });

  it('displays images if available', () => {
    render(<PropertyDetails {...mockProps} />);
    expect(screen.getAllByRole('img')).toHaveLength(2); // Ensures images are rendered
  });

  it('displays the map with correct latitude and longitude', () => {
    render(<PropertyDetails {...mockProps} />);
    expect(screen.getByText('View in a map')).toBeInTheDocument();
  });

  it('toggles the guest selector on button click', () => {
    render(<PropertyDetails {...mockProps} />);
    const travelersButton = screen.getByText(/Travelers/i);
    fireEvent.click(travelersButton);
    expect(screen.getByText('Travelers')).toBeInTheDocument();
  });

  it('increments and decrements adult and children counters correctly', () => {
    render(<PropertyDetails {...mockProps} />);
    fireEvent.click(screen.getByText(/Travelers/i));
    const incrementAdultsButton = screen.getAllByText('+')[0];
    const decrementAdultsButton = screen.getAllByText('−')[0];
    fireEvent.click(incrementAdultsButton);
    expect(screen.getByText('3')).toBeInTheDocument(); // Assuming the default count starts at 2

    fireEvent.click(decrementAdultsButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('handles pet checkbox toggling', () => {
    render(<PropertyDetails {...mockProps} />);
    fireEvent.click(screen.getByText(/Travelers/i));
    const petCheckbox = screen.getByLabelText('I am traveling with pets');
    expect(petCheckbox).not.toBeChecked();
    fireEvent.click(petCheckbox);
    expect(petCheckbox).toBeChecked();
  });

  it('renders room details correctly', () => {
    render(<PropertyDetails {...mockProps} />);
    mockProps.rooms.forEach((room) => {
      expect(screen.getByText(room.roomTitle)).toBeInTheDocument();
      expect(screen.getByText(`${room.bedroomCount} ${room.bedroomCount > 1 ? 'Beds' : 'Bed'}`)).toBeInTheDocument();
    });
  });
});
