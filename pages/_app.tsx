import '../components/ImageGallery.css';
import '../components/PropertyDetails.css';
import '../components/Header.css';
import '../components/ExpandedImageGallery.css';
import type { AppProps } from 'next/app';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;