import React from 'react';
import '../components/PropertyDetails.css';

const FAQ: React.FC = () => {
  return (
    <>
      {/* Frequently Asked Questions Section */}
      <div className="faq-section incidentals">
        <div className="leftsection">
          <h2>Frequently asked questions</h2>
        </div>
        <div>
          <div className="faq-item">
            <p>
              <button>&#x2B07;</button> Is Juneau Vacation Home: Stunning View + Beach Access pet-friendly?
            </p>
          </div>
          <div className="faq-item">
            <p>
              <button>&#x2B07;</button> What time is check-in at Juneau Vacation Home: Stunning View + Beach Access?
            </p>
          </div>
          <div className="faq-item">
            <p>
              <button>&#x2B07;</button> What time is check-out at Juneau Vacation Home: Stunning View + Beach Access?
            </p>
          </div>
          <div className="faq-item">
            <p>
              <button>&#x2B07;</button> Where is Juneau Vacation Home: Stunning View + Beach Access located?
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="rating-bottom-section">
        <div className="rating-section" style={{ flex: '0 0 30%' }}>
          <div className="rating-number">9.8/10</div>
          <div className="rating-text">Exceptional</div>
          <p>
            24 reviews &#x1F6C8;
          </p>
          <p style={{ fontSize: 'small' }}>Reviews are verified unless labeled otherwise.</p>
        </div>
        <div className="reviews">
          {Array(5).fill(null).map((_, index) => (
            <div className="review-box" key={index}>
              <div className="review-rating">10/10 Excellent</div>
              <div className="review-text">
                <p>
                  A very cozy home for the two of us in a quiet area NW of town. Beautiful water view. We enjoyed the
                  art, read up in it and visited the...
                </p>
                <button className="read-more">Read more</button>
              </div>
              <div className="review-author">Kyle G. - Sep 25, 2024</div>
            </div>
          ))}
        </div>
      </div>
      <div className="see-more">
        <button className="see-all-reviews">See all 24 reviews &#x27A1;</button>
      </div>

      {/* About the Host Section */}
      <div className="section">
        <div className="about-host">
          <div style={{ flex: '0 0 30%' }}>
            <h2>About the host</h2>
          </div>
          <div>
            <h3 style={{ marginBottom: '2rem' }}>Hosted by Evolve</h3>
            <h3>Languages:</h3>
            <div>English, French, German, Spanish</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
