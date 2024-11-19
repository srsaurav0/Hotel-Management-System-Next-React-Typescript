import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the MapContainer with no SSR
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});

import 'leaflet/dist/leaflet.css';

interface PropertyDetailsProps {
  title: string;
  description: string;
  rating?: number;
  reviewsCount?: number;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  size: string;
  popularAmenities?: string[];
  images: string[];
  rooms: Room[];
  address: string;
  latitude: number;
  longitude: number;
}

interface Room {
  hotelSlug: string;
  roomSlug: string;
  roomImage?: string;
  roomTitle: string;
  bedroomCount: number;
}

interface Space {
  icon: string;
  description: string;
}

interface RoomsAndBedsProps {
  bedrooms: Room[];
  sleeps: number;
  bathrooms: number;
  spaces: Space[];
}

const iconMap: Record<string, string> = {
  'Kitchen': '🍽️',
  'Dryer': '🧺',
  'Parking available': '🏠',
  'Washer': '🧼',
  'Outdoor Space': '🌳',
  'Ocean view': '🌊',
  'Mountain View': '⛰️',
  'Hiking Trails': '🥾',
  'Fireplace': '🔥'
  // Add more mappings as needed
};

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  title,
  description,
  rating,
  reviewsCount,
  bedrooms,
  bathrooms,
  sleeps,
  size,
  popularAmenities = [],
  images,
  rooms,
  address,
  latitude,
  longitude
}) => {
  const mainImage = images[1];

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [travelingWithPets, setTravelingWithPets] = useState(false);

  const toggleGuestSelector = () => {
    setShowGuestSelector((prev) => !prev);
  };

  const incrementCounter = (type: 'adults' | 'children') => {
    if (type === 'adults') {
      setAdults((prev) => prev + 1);
    } else {
      setChildren((prev) => prev + 1);
    }
  };

  const decrementCounter = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults > 0) {
      setAdults((prev) => prev - 1);
    } else if (type === 'children' && children > 0) {
      setChildren((prev) => prev - 1);
    }
  };

  const handleDoneClick = () => {
    setShowGuestSelector(false);
  };

  useEffect(() => {
    // Update the styles of the decrement buttons based on count
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach((counter) => {
      const count = parseInt(counter.textContent || '0', 10);
      const decrementButton = counter.parentElement?.querySelector('.decrement') as HTMLElement;
      if (decrementButton) {
        decrementButton.style.backgroundColor = count > 0 ? '' : 'gray';
      }
    });
  }, [adults, children]);

  return (
    <div style={{ marginTop: '1rem' }}>
      <div className="cont, s2">
        <div style={{ flex: '1 0 70%' }}>
          <p className="entire-home">Entire home</p>
          <h1 className="title" style={{ paddingRight: '10%' }}>{title}</h1>
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
              &#128716;
              <div>{bedrooms} bedrooms</div>
            </div>
            <div className="amenity-group">
              &#128703;
              <div>{bathrooms} bathroom(s)</div>
            </div>
            <div className="amenity-group">
              &#128101;
              <div>Sleeps {sleeps}</div>
            </div>
            <div className="amenity-group">
              &#12283;
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
          <a href="#" className="link" style={{ marginTop: '3%' }}>See all property amenities &#x2192;</a>

          <h2 style={{ marginTop: '2%' }}>Explore the area</h2>

          {/* Map and Location Section */}
          <div className="map-portion">
            <div className="map">
              <MapContainer
                center={[latitude, longitude]} // Replace with your latitude and longitude
                zoom={13}
                style={{ height: '200px', width: '400px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
              </MapContainer>
              <p style={{ marginLeft: '3%', marginTop: '3%' }}>{title}</p>
              <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} className="map-link">View in a map</a>
            </div>

            <div className="location" style={{ marginLeft: '2%' }}>
              <div className="location-details">
                <div className="location-item">
                  <span>📍 Auke Bay</span>
                  <span>6 min drive</span>
                </div>
                <div className="location-item">
                  <span>📍 University of Alaska-Southeast</span>
                  <span>10 min drive</span>
                </div>
                <div className="location-item">
                  <span>📍 Mendenhall Golf Course</span>
                  <span>14 min drive</span>
                </div>
                <div className="location-item">
                  <span>🛫 Juneau, AK (JNU-Juneau Intl.)</span>
                  <span>14 min drive</span>
                </div>
                <div>
                  <a className="link" href="#">See more about this area &#x2192;</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div>
          <div className="button-container">
            <div className="leftsection" style={{ alignContent: 'center' }}>
              <Image src="/images/member.png" height={50} width={50} alt="Member advantages" style={{ marginLeft: '20%' }} />
            </div>
            <div className="member-message">
              <div style={{ marginBottom: '5%', paddingRight: '20%', justifyContent: 'center', display: 'flex' }}>
                Members get our best prices when signed in!
              </div>
              <div>
                <button className="sign-in-button">Sign in</button>
              </div>
            </div>
          </div>

          <div className="booking-card" style={{ marginTop: '5%' }}>
            <div className="price">
              <span>$134</span>
              <span>per night</span>
            </div>
            <hr />
            <div className="cancellation" style={{ marginTop: '2%' }}>
              <span style={{ color: '#007000' }}>Free cancellation &#x1F6C8;</span>
            </div>
            <div className="cancellation">
              <span>Before Mon, Nov 4</span>
            </div>

            <div className="availability">
              <span>&#x2714; Your dates are available</span>
            </div>

            <div style={{ alignItems: 'center', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2%', marginTop: '5%' }}>
              <div style={{ textAlign: 'center' }}>
                <button className="date-selector">
                  <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <div className="date-content">
                    <span className="date-label">Start date</span>
                    <span className="date-value">Nov 18</span>
                  </div>
                </button>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button className="date-selector">
                  <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <div className="date-content">
                    <span className="date-label">End date</span>
                    <span className="date-value">Nov 20</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="travelers">
              <button className="travelers-selector" onClick={toggleGuestSelector}>
                <span className="travelers-label">Travelers</span>
                <span className="travelers-count">{adults + children} travelers</span>
              </button>
            </div>

            {showGuestSelector && (
              <div className="guest-selector">
                <h3>Travelers</h3>
                <div className="guest-group">
                  <div className="guest-label">Adults</div>
                  <div className="counter-container">
                    <button className="counter-button decrement" onClick={() => decrementCounter('adults')}>
                      −
                    </button>
                    <span className="counter-value">{adults}</span>
                    <button className="counter-button increment" onClick={() => incrementCounter('adults')}>
                      +
                    </button>
                  </div>
                </div>

                <div className="guest-group">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="guest-label">Children</div>
                    <div className="age-subtitle">Ages 0 to 17</div>
                  </div>
                  <div className="counter-container">
                    <button className="counter-button decrement" onClick={() => decrementCounter('children')}>
                      −
                    </button>
                    <span className="counter-value">{children}</span>
                    <button className="counter-button increment" onClick={() => incrementCounter('children')}>
                      +
                    </button>
                  </div>
                </div>

                <div className="pet-checkbox">
                  <input
                    type="checkbox"
                    id="travelingWithPets"
                    checked={travelingWithPets}
                    onChange={() => setTravelingWithPets(!travelingWithPets)}
                  />
                  <label htmlFor="travelingWithPets">I am traveling with pets</label>
                </div>

                <button className="done-button" onClick={handleDoneClick}>Done</button>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontWeight: 'bold', margin: '3%' }}>
              <div style={{ textAlign: 'left' }}>Total</div>
              <div style={{ textAlign: 'right' }}>$543</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '3%' }}>
              <div style={{ textAlign: 'left' }}>Total includes fees, not tax</div>
              <div style={{ textAlign: 'right' }}>
                <a href="#">Price details</a>
              </div>
            </div>

            <button className="book-now">Book now</button>

            <div className="note">
              You will not be charged yet
            </div>
            <button className="contact-host">Contact host</button>
            <div className="property-id" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <b>Property #</b> 9838104ha
            </div>
          </div>
        </div>

      </div>
      <div>
        {/* Rooms & Beds Section */}
        <div className="section">
          <h2>Rooms & beds</h2>
          <h3 style={{ marginTop: '2%' }}>{bedrooms} bedrooms (sleeps {sleeps})</h3>
          <div className="bedrooms">
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <div className="bedroom" key={index}>
                  <div className="bedroom-title">{room.roomTitle}</div>
                  <div className="icon">&#128716;</div> {/* Bed icon */}
                  <div>{room.bedroomCount} {room.bedroomCount > 1 ? 'Beds' : 'Bed'}</div>
                </div>
              ))
            ) : (
              <p>No room details available</p>
            )}
          </div>
          <div className="divider"></div>
          <h3>{bathrooms} bathroom</h3>
          <div style={{ marginTop: '1rem' }}>Full Bathroom</div>
          <div className="divider"></div>
        </div>

        <div className="section">
          <h2>Spaces</h2>
          <div className="spaces">
            <div className="space-item">
              <span className="icon">&#127869;</span> {/* Deck icon */}
              <div>Deck or patio</div>
            </div>
            <div className="space-item">
              <span className="icon">&#127859;</span> {/* Kitchen icon */}
              <div>Kitchen</div>
            </div>
            <div className="space-item">
              <span className="icon">&#127748;</span> {/* Balcony icon */}
              <div>Balcony</div>
            </div>
            <div className="space-item">
              <span className="icon">&#127793;</span> {/* Garden icon */}
              <div>Garden</div>
            </div>
          </div>
          <a href="#" className="link">See all rooms and beds details</a>
        </div>

        {/* About this property section */}
        <div className="section">
          <h2>About this property</h2>
          <div className="about">
            <div className="about-content">
              <h3 style={{ marginTop: '1.5rem' }}>{title}</h3>
              <div className="property-description" style={{ textAlign: 'justify' }}>
                {description}
              </div>
              <p style={{ marginTop: '1rem' }}>-- THE PROPERTY --</p>
              <p style={{ marginTop: '1rem' }}>{title} | {size} | {address}</p>
              <div style={{ marginTop: '1rem' }}>
                {rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <p key={index} style={{ marginTop: '1rem' }}>
                      Bedroom {index + 1}: {room.roomTitle}
                      {room.bedroomCount > 1 ? ` | ${room.bedroomCount} Beds` : ` | ${room.bedroomCount} Bed`}
                    </p>
                  ))
                ) : (
                  <p>No bedroom details available</p>
                )}
              </div>
              <p style={{ marginTop: '1rem' }}>HOME HIGHLIGHTS: Flat-screen TV, dining table, washer/dryer</p>
              <p>KITCHEN: Fridge, stove, coffee maker, microwave, cooking basics, toaster, dishware/flatware, trash bags/paper towels, Crockpot</p>
              <div style={{ marginTop: '1rem' }}>
                <p>GENERAL:</p>
                {popularAmenities.length > 0 ? (
                  <p style={{ marginTop: '1rem' }}>
                    {popularAmenities.join(', ')}
                  </p>
                ) : (
                  <p>No general amenities available</p>
                )}
              </div>
              <p>FAQ: No A/C, stairs required to access</p>
              <p>PARKING: Driveway (2 vehicles), RV parking allowed</p>
              <p style={{ marginTop: '1rem' }}>-- THE LOCATION --</p>
            </div>
            <div className="about-content">
              <p style={{ marginTop: '1rem', textAlign: 'justify' }}>GREAT OUTDOORS: Lena Cove (on-site), Lena Beach Recreation Area (0.5 miles), Glacier Gardens Rainforest Adventure (10 miles), Mendenhall Glacier (10 miles), Twin Lakes (13 miles)</p>
              <p style={{ textAlign: 'justify' }}>THINGS TO DO: Mendenhall Golf (8 miles), Dimond Park Aquatic Center (8 miles), Riverside Rotary Park (8 miles), Alaska State Museum (16 miles), Last Chance Mining Museum (18 miles), AJ Mine Gastineau Mill Tours (20 miles)</p>
              <p style={{ textAlign: 'justify' }}>LOCAL FARE: Forbidden Peak Brewery (5 miles), The Grind Coffee Company (7 miles), Four Plates Cocina Peruana (7 miles), Sandbar & Grill (7 miles), Zerelda’s Bistro (8 miles), Donna’s Restaurant (9 miles), Alaskan Brewing Co. (13 miles)</p>
              <p>AIRPORT: Juneau International Airport (9 miles)</p>
              <p style={{ marginTop: '1rem' }}>-- REST EASY WITH US --</p>
              <p style={{ marginTop: '1rem', textAlign: 'justify' }}>Evolve makes it easy to find and book properties you’ll never want to leave. You can relax knowing that our properties will always be ready for you and that we’ll answer the phone 24/7. Even better, if anything is off about your stay, we’ll make it right. You can count on our homes and our people to make you feel welcome -- because we know what vacation means to you.</p>
              <p style={{ marginTop: '1rem' }}>-- POLICIES --</p>
              <p style={{ marginTop: '1rem' }}>- No smoking</p>
              <p>- No pets allowed</p>
              <p>- No events, parties, or large gatherings</p>
              <p>- Must be at least 25 years old to book</p>
              <p>- Additional fees and taxes may apply</p>
              <p>- Photo ID may be required upon check-in</p>
              <p>- NOTE: The property requires stairs to access</p>
              <p>- NOTE: The property does not have air conditioning</p>
              <p>- NOTE: The property sleeps 3 guests in 2 beds, with room for 4 total by using the full floor mattress</p>
            </div>
          </div>
          <div className="show-more-media link">
            <p>See more</p>
          </div>
        </div>

        {/* Property Manager Section */}
        <div className="section">
          <div className="property-manager">
            <h2>Property manager</h2>
            <Image src="/images/evolve.png" height={50} width={50} alt="Evolve Logo" className="manager-logo" />
            <div className="manager-name">Evolve</div>
            <h3>Languages</h3>
            <div>English, French, German, Spanish</div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="amenities-section">
          <div style={{ marginRight: '8%' }}>
            <h2>Amenities</h2>
          </div>
          <div className="amenitiessss">
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '4rem' }}>
              {popularAmenities.slice(0, 3).map((amenity, index) => (
                <div className="amenity" key={index}>
                  <div>
                    <span className="icon">{iconMap[amenity] || '➕'}</span> {amenity}
                  </div>
                </div>
              ))}
              <div>
                <a href="#" className="link">See all {popularAmenities.length} amenities</a>
              </div>
            </div>
            <div>
              {popularAmenities.slice(3).map((amenity, index) => (
                <div className="amenity" key={index + 3}>
                  <div>
                    <span className="icon">{iconMap[amenity] || '➕'}</span> {amenity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="question-section" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h2>Have a question?</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button className="beta-btn">&#128269; Beta</button>
            </div>
          </div>

          <p>Get instant answers with AI powered search of property information and reviews.</p>
          <div style={{ display: 'flex' }}>
            <div className="search-bar" style={{ flex: 1 }}>
              <div style={{ display: 'flex' }}>
                <div style={{ paddingTop: '1rem' }}>&#128269;</div>
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
                  <div style={{ fontSize: 'smaller' }}>Ask a question</div>
                  <div><input type="text" placeholder="Is there free parking?" /></div>
                </div>
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <button>&#128269;</button> {/* Search icon */}
            </div>
          </div>
        </div>

        {/* House Rules Section */}
        <div className="hrsection">
          <div className="leftsection">
            <h2>House Rules</h2>
          </div>
          <div className="hrsubsection">
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10rem' }}>
              <div className="amenity">
                <div>Check in after 3:00 PM</div>
              </div>
              <div className="amenity">
                <div>Check out before 11:00 AM</div>
              </div>
              <div className="amenity">
                <div>
                  <h3><span className="icon">&#128118;</span> Children</h3>
                </div>
                <div>Children allowed: ages 0-17</div>
              </div>
              <div className="amenity">
                <div>
                  <h3><span className="icon">&#128128;</span> Pets</h3>
                </div>
                <div>No pets allowed</div>
              </div>
            </div>
            {/* Right section */}
            <div>
              <div className="amenity">
                <div>Minimum age to rent: 25</div>
              </div>
              <div className="amenity" style={{ color: 'white' }}>
                <div>Check out before 11:00 AM</div>
              </div>
              <div className="amenity">
                <div>
                  <h3><span className="icon">&#128682;</span> Events</h3>
                </div>
                <div>No events allowed</div>
              </div>
              <div className="amenity">
                <div>
                  <h3><span className="icon">&#128684;</span> Smoking</h3>
                </div>
                <div>Smoking is not permitted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Damage and Incidentals Section */}
        <div className="damage-section incidentals">
          <div className="leftsection">
            <h2>Damage and incidentals</h2>
          </div>
          <div>
            You will be responsible for any damage to the rental property caused by you or your party during your stay.
          </div>
        </div>

        {/* Cancellation Section */}
        <div className="cancel-section cancellation">
          <div className="leftsection">
            <h2>Cancellation</h2>
          </div>
          <div style={{ flex: 1 }}>
            <div className="cancellation-details responsive">
              <div className="timeline">
                <span className="timeline-label">Full refund</span>
                <span className="timeline-label">No refund</span>
              </div>
              <div className="timeline-bar">
                <div className="timeline-marker">
                  <span className="marker"></span>
                  <span className="marker marker-gray"></span>
                  <span className="marker marker-light"></span>
                </div>
              </div>
              <div className="timeline-2">
                <span className="timeline-date">Today</span>
                <span className="timeline-date">Nov 4</span>
                <span className="timeline-date">Check-in</span>
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '1rem' }}>
              <div style={{ flex: '0 0 10%' }}>
                <h4>Before</h4>
                <h3>Nov 4</h3>
              </div>
              <div style={{ marginLeft: '1rem' }}>
                <h3>Full refund</h3>
                <p>
                  Cancel your reservation before Nov 4 at 11:59 PM, and you'll get a full refund. Times are based on the
                  property's local time.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '1rem' }}>
              <div style={{ flex: '0 0 10%' }}>
                <h4>After</h4>
                <h3>Nov 4</h3>
              </div>
              <div style={{ marginLeft: '1.8rem' }}>
                <h3>No refund</h3>
                <p>After that, you won't get a refund.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information Section */}
        <div className="imp-info-section incidentals">
          <div style={{ flex: '0 0 30%' }}>
            <h2>Important information</h2>
          </div>
          <div>
            <h3>You need to know</h3>
            <p>Extra-person charges may apply and vary depending on property policy</p>
            <p>
              Government-issued photo identification and a credit card, debit card, or cash deposit may be required at
              check-in for incidental charges
            </p>
            <p>
              Special requests are subject to availability upon check-in and may incur additional charges; special
              requests cannot be guaranteed
            </p>
            <p>Onsite parties or group events are strictly prohibited</p>
            <p>Host has indicated there is a carbon monoxide detector on the property</p>
            <p>Host has indicated there is a smoke detector on the property</p>
            <p>Safety features at this property include a fire extinguisher and a first aid kit</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;
