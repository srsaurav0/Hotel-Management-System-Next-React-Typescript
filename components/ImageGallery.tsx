import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../components/ImageGallery.css'; // Ensure the CSS path is correct

interface ImageGalleryProps {
  images: string[];
  totalImageCount: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, totalImageCount }) => {
  const router = useRouter();

  // Get main image and next 4 images for the 2x2 grid
  const mainImage = images[0] ? `${images[0]}` : null;
  const rightGridImages = images.slice(1, 5).map(image => `${image}`);

  const handleImageCountButtonClick = () => {
    console.log('Image count button clicked');
    router.push('/image-details');
  };

  return (
    <div className="custom-grid">
      {/* Left Image */}
      <div className="left-image">
        {mainImage ? (
          <Image src={mainImage} alt="Main image" width={600} height={400} />
        ) : (
          <p>No main image available</p>
        )}
      </div>

      {/* Right 2x2 Grid of Images */}
      <div className="right-grid">
        {rightGridImages.map((image, index) => (
          image ? (
            <Image key={index} src={image} alt={`Grid image ${index + 1}`} width={200} height={150} />
          ) : null
        ))}
        {totalImageCount > 5 && (
          <div className="gallery-image-container">
            <a onClick={handleImageCountButtonClick} className="image-count-btn">
              <span className="gallery-icon">📸</span>
              <span className="image-count">{totalImageCount}</span>
              <span className="plus-icon">+</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
