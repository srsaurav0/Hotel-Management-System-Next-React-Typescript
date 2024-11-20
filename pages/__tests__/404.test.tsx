import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Custom404 from '../../pages/404';

// Mock the `next/link` component to avoid issues during testing
jest.mock('next/link', () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Custom404 Page', () => {
  it('renders the 404 heading', () => {
    render(<Custom404 />);
    const heading = screen.getByText('404');
    expect(heading).toBeInTheDocument();
  });

  it('renders the "Page Not Found" message', () => {
    render(<Custom404 />);
    const message = screen.getByText('Page Not Found');
    expect(message).toBeInTheDocument();
  });

  it('renders the "Go Home" link', () => {
    render(<Custom404 />);
    const goHomeLink = screen.getByRole('link', { name: /go home/i });
    expect(goHomeLink).toBeInTheDocument();
    expect(goHomeLink).toHaveAttribute('href', '/');
  });
});
