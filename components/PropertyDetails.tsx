import React from 'react';
import '../components/ImageGallery.css'; // Adjust path as necessary

interface PropertyDetailsProps {
  title: string;
  description: string;
  rating?: number;
  reviewsCount?: number;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  size: string;
  popularAmenities?: string[]; // Make sure this is optional if needed
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  title,
  description,
  rating,
  reviewsCount,
  bedrooms,
  bathrooms,
  sleeps,
  size,
  popularAmenities = [], // Default to an empty array if `undefined`
}) => {
  return (
    <div className="s2" style={{ padding: '20px', flex: '1 0 68%' }}>
      <p className="entire-home">Entire home</p>
      <h1 className="title" style={{ paddingRight: '10%' }}>{title}</h1>

      {/* Rating Section */}
      <div className="cont">
        {typeof rating === 'number' ? (
          <div className="rating">
            <div className="badge">{rating.toFixed(1)}</div>
            <span>Exceptional</span>
          </div>
        ) : (
          <div className="rating">
            <div className="badge">N/A</div>
            <span>No rating available</span>
          </div>
        )}
        <a href="#" className="link">See all {reviewsCount ?? 0} reviews &#x2192;</a>

        {/* Amenities Section */}
        <div className="amenities" style={{ marginTop: '5%' }}>
          <div className="amenity-group">
            &#128716; {/* Unicode for a house icon */}
            <div>{bedrooms} bedrooms</div>
          </div>
          <div className="amenity-group">
            &#128703; {/* Unicode for a bathtub icon */}
            <div>{bathrooms} bathroom(s)</div>
          </div>
          <div className="amenity-group">
            &#128101; {/* Unicode for person icon */}
            <div>Sleeps {sleeps}</div>
          </div>
          <div className="amenity-group">
            &#12283; {/* Unicode for a square */}
            <div>{size}</div>
          </div>
        </div>

        {/* Popular Amenities */}
        <h2 style={{ marginTop: '2%' }}>Popular amenities</h2>
        <div className="amenities" style={{ marginTop: '2%' }}>
          {popularAmenities.length > 0 ? (
            popularAmenities.map((amenity, index) => (
              <div className="amenity-group" key={index}>
                <div>{amenity}</div>
              </div>
            ))
          ) : (
            <p>No popular amenities available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
