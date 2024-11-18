import React from 'react';
import { GetServerSideProps } from 'next';
import path from 'path';
import fs from 'fs';
import Header from '../../../components/Header';
import ImageGallery from '../../../components/ImageGallery';
import PropertyDetails from '../../../components/PropertyDetails';

interface HotelProps {
    hotelData: {
        id: string;
        title: string;
        description: string;
        rating: number;
        reviewsCount: number;
        bedrooms: number;
        bathrooms: number;
        sleeps: number;
        size: string;
        address: string;
        images: string[];
        popularAmenities: string[];
    } | null;
}

const HotelPage: React.FC<HotelProps> = ({ hotelData }) => {
    if (!hotelData) {
        return <p>Loading hotel data...</p>;
    }

    const { title, description, rating, reviewsCount, bedrooms, bathrooms, sleeps, size, address, images, popularAmenities } = hotelData;

    return (
        <div>
            <Header images={images} title={title} address={address}/>

            <div className='container'>
                <ImageGallery images={images} totalImageCount={images.length} />
                <PropertyDetails
                    title={title}
                    description={description}
                    rating={rating}
                    reviewsCount={reviewsCount}
                    bedrooms={bedrooms}
                    bathrooms={bathrooms}
                    sleeps={sleeps}
                    size={size}
                    popularAmenities={popularAmenities}
                />
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

        return {
            props: {
                hotelData,
            },
        };
    } catch (error) {
        console.error('Error loading hotel data:', error);
        return {
            props: {
                hotelData: null,
            },
        };
    }
};

export default HotelPage;
