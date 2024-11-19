import React from 'react';
import { GetServerSideProps } from 'next';
import path from 'path';
import fs from 'fs';
import Header from '../../../components/Header';
import ImageGallery from '../../../components/ImageGallery';
import PropertyDetails from '../../../components/PropertyDetails';
import { Hotel } from '../../../types/types';
import Footer from '../../../components/Footer';
import FAQ from '../../../components/FAQ';

interface HotelProps {
    hotelData: Hotel | null;
}

const HotelPage: React.FC<HotelProps> = ({ hotelData }) => {
    if (!hotelData) {
        return <p>Loading hotel data...</p>;
    }

    const {
        title,
        description,
        guestCount: sleeps,
        bedroomCount: bedrooms,
        bathroomCount: bathrooms,
        address,
        images = [],
        amenities,
        rooms = [],
        latitude,
        longitude
    } = hotelData;

    const rating = 9.5; // Placeholder for rating
    const reviewsCount = 24; // Placeholder for number of reviews
    const size = '1155 sq ft'; // Placeholder for size, adjust as needed

    // console.log('title:', title, 'Desc:', description, 'Rating:', rating, 'Reviews:', reviewsCount, 'Bedrooms:', bedrooms, 'Bathrooms:', bathrooms, 'Sleeps:', sleeps, 'Size:', size, 'Address:', address, images, 'Amenities:', amenities, 'Rooms:', rooms);

    return (
        <div>
            <Header images={images} title={title} address={address} />

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
                    popularAmenities={amenities}
                    images={images}
                    rooms={rooms} // Pass the rooms to the PropertyDetails component
                    address={address}
                    latitude={latitude}
                    longitude={longitude}
                />
                <FAQ />
                <Footer />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { 'hotel-id': hotelId } = context.params!;
    const filePath = path.join(process.cwd(), `backend/data/hotels/${hotelId}.json`);

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const hotelData: Hotel = JSON.parse(data);
        console.log('HotelData successfully parsed');
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
