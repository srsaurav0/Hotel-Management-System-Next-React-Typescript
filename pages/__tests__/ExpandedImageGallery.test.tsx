import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageDetails from '../../pages/ExpandedImageGallery';
import { useRouter } from 'next/router';

// Mocking the next/router module
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ImageDetails Component', () => {
  const mockImages = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
  ];

  beforeEach(() => {
    // Mock the useRouter hook return value
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        images: JSON.stringify(mockImages),
      },
      push: jest.fn(),
      back: jest.fn(),
    });
  });

  it('renders a loading message when no images are available', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({ query: {} });

    render(<ImageDetails />);
    expect(screen.getByText('Loading images...')).toBeInTheDocument();
  });

  it('renders the first image correctly on mount', () => {
    render(<ImageDetails />);
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });

  it('navigates to the next image when the "Next" button is clicked', () => {
    render(<ImageDetails />);
    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
  });

  it('navigates to the previous image when the "Previous" button is clicked', () => {
    render(<ImageDetails />);
    const prevButton = screen.getByText('‹');
    fireEvent.click(prevButton); // Should go to the last image when starting from the first
    expect(screen.getByAltText('Image 3')).toBeInTheDocument();
  });

  it('updates the image counter correctly', () => {
    render(<ImageDetails />);
    expect(screen.getByText('1/3')).toBeInTheDocument();

    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton);
    expect(screen.getByText('2/3')).toBeInTheDocument();
  });

  it('navigates back when the close button is clicked', () => {
    const backMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        images: JSON.stringify(mockImages),
      },
      back: backMock,
    });

    render(<ImageDetails />);
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);
    expect(backMock).toHaveBeenCalled();
  });

  it('handles JSON parsing errors gracefully', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        images: 'invalid JSON',
      },
    });

    render(<ImageDetails />);
    expect(screen.getByText('Loading images...')).toBeInTheDocument();
  });
});
