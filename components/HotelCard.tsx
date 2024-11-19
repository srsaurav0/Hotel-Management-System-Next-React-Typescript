import React from 'react';
import Link from 'next/link';

const HotelCard: React.FC<{ id: string; slug: string; image: string; title: string; description: string }> = ({ id, slug, image, title, description }) => {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img src={image} alt={`${title} image`} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h6>
        <p className="text-slate-600 leading-normal font-light">{description}</p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        <Link href={`/hotel-details/${slug}/${id}`} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;

