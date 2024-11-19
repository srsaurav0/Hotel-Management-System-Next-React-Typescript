import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface ImageData {
  src: string;
  alt: string;
}

const ImageDetails: React.FC = () => {
  const router = useRouter();
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load image data from router query on mount
  useEffect(() => {
    if (router.query.images) {
      try {
        const parsedImages = JSON.parse(router.query.images as string);
        setImages(parsedImages);
      } catch (error) {
        console.error('Error parsing images data:', error);
      }
    }
  }, [router.query.images]);

  // Update the document title with the current image title (optional)
  useEffect(() => {
    if (images.length > 0) {
      document.title = images[currentIndex].alt;
    }
  }, [currentIndex, images]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleClose = () => {
    window.history.back(); // Navigate back to the previous page
  };

  // Display a message if no images are available
  if (images.length === 0) {
    return <p>Loading images...</p>;
  }

  return (
    <div className="gallery-body">
      <button className="close-button-2" onClick={handleClose}>✕</button>

      <div className="viewer-container">
        <div className="image-container">
          <img
            className="main-image"
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
          />
        </div>
      </div>

      <div className="navigation-controls">
        <div style={{ flex: 1 }}>
          <h2 className="image-title">{images[currentIndex].alt}</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="nav-button" id="prevButton" onClick={handlePrevClick}>‹</button>
          <span className="image-counter">{currentIndex + 1}/{images.length}</span>
          <button className="nav-button" id="nextButton" onClick={handleNextClick}>›</button>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
