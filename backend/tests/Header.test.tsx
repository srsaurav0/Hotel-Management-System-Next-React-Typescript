import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/Header'; // Adjust the import path to where your Header component is located

describe('Header Component', () => {
  const mockImages = ['/images/sample1.jpg'];
  const mockTitle = 'Test Property Title';
  const mockAddress = '123 Test Street, Test City';

  it('renders the Header component with title and address', () => {
    render(<Header images={mockImages} title={mockTitle} address={mockAddress} />);
    expect(screen.getByText('Test Property Title')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street, Test City')).toBeInTheDocument();
  });

  it('should toggle the popup visibility when clicking the region link', () => {
    render(<Header images={mockImages} title={mockTitle} address={mockAddress} />);
    const regionLink = screen.getByText('🌐 Portugal');
    fireEvent.click(regionLink);
    expect(screen.getByText('Display settings')).toBeInTheDocument();

    fireEvent.click(screen.getByText('✕'));
    expect(screen.queryByText('Display settings')).not.toBeInTheDocument();
  });

  it('should display the share popup when clicking the share button', () => {
    render(<Header images={mockImages} title={mockTitle} address={mockAddress} />);
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);
    expect(screen.getByText('Copy link')).toBeInTheDocument();
  });

  it('should toggle the heart icon state and persist it to localStorage', () => {
    render(<Header images={mockImages} title={mockTitle} address={mockAddress} />);
    const saveButton = screen.getByText('Save');

    // Initial state should be unfilled heart
    expect(screen.getByText('🤍')).toBeInTheDocument();

    // Click to toggle heart state
    fireEvent.click(saveButton);
    expect(screen.getByText('❤️')).toBeInTheDocument();
    expect(localStorage.getItem('isHeartRed')).toBe('true');

    // Click again to toggle heart state back
    fireEvent.click(saveButton);
    expect(screen.getByText('🤍')).toBeInTheDocument();
    expect(localStorage.getItem('isHeartRed')).toBe('false');
  });

  it('should copy the link to the clipboard when clicking "Copy link"', () => {
    render(<Header images={mockImages} title={mockTitle} address={mockAddress} />);
    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);

    const copyLink = screen.getByText('Copy link');
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValueOnce(undefined),
      },
    });

    fireEvent.click(copyLink);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
  });
});
