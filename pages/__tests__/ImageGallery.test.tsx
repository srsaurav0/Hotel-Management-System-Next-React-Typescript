import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from '../../components/ImageGallery';
import { useRouter } from 'next/router';

// Mock the next/router module
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ImageGallery Component', () => {
  const mockImages = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image5.jpg'];

  it('renders the main image correctly', () => {
    render(<ImageGallery images={mockImages} totalImageCount={mockImages.length} />);
    expect(screen.getByAltText('Main image')).toBeInTheDocument();
  });

  it('renders side images correctly', () => {
    render(<ImageGallery images={mockImages} totalImageCount={mockImages.length} />);
    for (let i = 1; i < 4; i++) {
      expect(screen.getByAltText(`Side image ${i}`)).toBeInTheDocument();
    }
  });

  it('displays an additional image count button when totalImageCount > 4', () => {
    render(<ImageGallery images={mockImages} totalImageCount={mockImages.length} />);
    expect(screen.getByText(mockImages.length.toString())).toBeInTheDocument();
  });

  it('calls the router push function when the image count button is clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<ImageGallery images={mockImages} totalImageCount={mockImages.length} />);

    fireEvent.click(screen.getByText(mockImages.length.toString()));

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/ExpandedImageGallery',
      query: {
        images: JSON.stringify(
          mockImages.map((image, index) => ({
            src: image,
            alt: `Image ${index + 1}`,
          }))
        ),
      },
    });
  });

  it('displays "No main image available" if there is no main image', () => {
    render(<ImageGallery images={[]} totalImageCount={0} />);
    expect(screen.getByText('No main image available')).toBeInTheDocument();
  });
});
