import React, { useState, useEffect } from 'react';
import '../components/ImageGallery.css'; // Include this CSS file for relevant styles

const ImageDetails: React.FC = () => {
  // Image data
  const images = [
    { src: '/images/h1.png', title: 'Juneau Vacation Rental | 2BR | 1BA | 1,115 Sq Ft | Stairs Required' },
    { src: '/images/h2.png', title: 'Lakeside Haven | Living Room | Modern Decor | Fireplace' },
    { src: '/images/h3.png', title: 'Urban Loft | Kitchen | Fully Equipped | Stainless Appliances' },
    { src: '/images/h4.png', title: 'Seaside Cottage | Dining Room | Seats 8 | Open Concept' },
    { src: '/images/h5.jpg', title: 'Mountain Vista Cabin | Guest Bedroom | Queen Bed | Cozy Linens' },
    { src: '/images/h6.jpg', title: 'Cityscape Flat | Home Office | High-Speed Internet | Library' },
    { src: '/images/h7.jpg', title: 'Country Manor | Children\'s Playroom | Safe & Spacious' },
    { src: '/images/h8.jpg', title: 'Beachfront Bungalow | Outdoor Patio | BBQ Grill | Lake Views' },
    // Add more images as needed
  ];

  // State for the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update the main image when the component mounts or currentIndex changes
  useEffect(() => {
    document.title = images[currentIndex].title; // Update the document title with the current image title (optional)
  }, [currentIndex]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleClose = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <div className="gallery-body">
      <button className="close-button-2" onClick={handleClose}>✕</button>

      <div className="viewer-container">
        <div className="image-container">
          <img
            className="main-image"
            src={images[currentIndex].src}
            alt={`Image ${currentIndex + 1}`}
          />
        </div>
      </div>

      <div className="navigation-controls">
        <div style={{ flex: 1 }}>
          <h2 className="image-title">{images[currentIndex].title}</h2>
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
