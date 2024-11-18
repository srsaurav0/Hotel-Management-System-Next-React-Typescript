// pages/hotels/[hotel-slug]/[hotel-id].tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import path from 'path';
import fs from 'fs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../../../components/ImageGallery.css';

interface HotelProps {
    hotelData: {
        id: string;
        title: string;
        images: string[];
    } | null;
}

const HotelPage: React.FC<HotelProps> = ({ hotelData }) => {
    console.log('Hotel data in component:', hotelData); // Log to verify data

    if (!hotelData) {
        return <p>Loading hotel data...</p>;
    }

    const { images } = hotelData;
    const router = useRouter();

    if (images.length === 0) {
        return <p>No images available for this hotel.</p>;
    }

    // Create image paths pointing to public directory
    const mainImage = images[0] ? `${images[0]}` : null;
    const sideImages = images.slice(1, 4).map(image => `${image}`);
    const totalImageCount = images.length;

    const handleImageCountButtonClick = () => {
        console.log('Image count button clicked');
        router.push('/image-details');
    };

    return (
        <div className='container'>
            <div className="gallery">
                <div className="gallery-main">
                    {mainImage ? (
                        <Image src={mainImage} alt="Lake view with deck and red chairs" width={600} height={400} />
                    ) : (
                        <p>No main image available</p>
                    )}
                </div>
                <div className="gallery-side">
                    {sideImages.map((image, index) => (
                        image ? (
                            <Image key={index} src={image} alt={`Side image ${index + 1}`} width={200} height={150} />
                        ) : null
                    ))}
                    {totalImageCount > 4 && (
                        <div className="gallery-image-container">
                            {images[4] ? (
                                <Image src={`${images[4]}`} alt="Bedroom with windows" width={200} height={150} />
                            ) : null}
                            <a onClick={handleImageCountButtonClick} className="image-count-btn">
                                <span className="gallery-icon">📸</span>
                                <span className="image-count">{totalImageCount}</span>
                                <span className="plus-icon">+</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { 'hotel-id': hotelId } = context.params!;
    const filePath = path.join(process.cwd(), `backend/data/hotels/${hotelId}.json`);

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const hotelData = JSON.parse(data);

        console.log('Hotel data fetched:', hotelData); // Log fetched data for verification

        return {
            props: {
                hotelData,
            },
        };
    } catch (error) {
        console.error('Error loading hotel data:', error);
        return {
            props: {
                hotelData: null, // Pass null if an error occurs or data is not found
            },
        };
    }
};

export default HotelPage;
