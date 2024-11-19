import React from 'react';
import { GetServerSideProps } from 'next';
import path from 'path';
import fs from 'fs';
import HotelCard from '../components/HotelCard';
import { Hotel } from '../types/types';

interface HomePageProps {
  hotels: Hotel[];
}

const HomePage: React.FC<HomePageProps> = ({ hotels }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          id={hotel.id}
          slug={hotel.slug || ''}
          image={hotel.images?.[0] || '/images/h1.png'}
          title={hotel.title}
          description={hotel.description.slice(0, 100) + '...'}
        />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const directoryPath = path.join(process.cwd(), 'backend/data/hotels');
  let hotels: Hotel[] = [];

  try {
    const files = fs.readdirSync(directoryPath);

    hotels = files.map((file) => {
      const filePath = path.join(directoryPath, file);
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as Hotel;
    });
  } catch (error) {
    console.error('Error fetching hotel data:', error);
  }

  return {
    props: {
      hotels,
    },
  };
};

export default HomePage;
