import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
  address: string;
}

const NavigationBar: React.FC<ImageGalleryProps> = ({ images, title, address }) => {
  // State to control the visibility of the popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('PT'); // Default to Portugal
  const [currency, setCurrency] = useState('EUR'); // Default currency

  // Mapping region to currency and country name
  const regionToCurrency: Record<string, string> = {
    'PT': 'EUR', 'US': 'USD', 'GB': 'GBP', 'JP': 'JPY', 'AU': 'AUD', 'CA': 'CAD',
    'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'CN': 'CNY', 'IN': 'INR',
    'BR': 'BRL', 'RU': 'RUB', 'MX': 'MXN', 'ZA': 'ZAR', 'KR': 'KRW', 'SE': 'SEK',
    'NL': 'EUR', 'CH': 'CHF', 'BE': 'EUR', 'AR': 'ARS', 'NO': 'NOK', 'AT': 'EUR',
    'DK': 'DKK', 'FI': 'EUR', 'PL': 'PLN', 'NZ': 'NZD', 'IE': 'EUR', 'GR': 'EUR'
  };

  const regionToCountry: Record<string, string> = {
    'PT': 'Portugal', 'US': 'United States', 'GB': 'United Kingdom', 'JP': 'Japan',
    'AU': 'Australia', 'CA': 'Canada', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy',
    'ES': 'Spain', 'CN': 'China', 'IN': 'India', 'BR': 'Brazil', 'RU': 'Russia',
    'MX': 'Mexico', 'ZA': 'South Africa', 'KR': 'South Korea', 'SE': 'Sweden',
    'NL': 'Netherlands', 'CH': 'Switzerland', 'BE': 'Belgium', 'AR': 'Argentina',
    'NO': 'Norway', 'AT': 'Austria', 'DK': 'Denmark', 'FI': 'Finland', 'PL': 'Poland',
    'NZ': 'New Zealand', 'IE': 'Ireland', 'GR': 'Greece'
  };

  const mainImage = images[0] ;


  // Function to toggle the popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Function to handle region change
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedRegion(selected);
    setCurrency(regionToCurrency[selected]);
  };

  // Function to handle save button click
  const handleSave = () => {
    // Close the popup after saving
    setIsPopupVisible(false);
  };


  // State to manage the visibility of the share popup
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);
  // State for the heart icon and its localStorage persistence
  const [isHeartRed, setIsHeartRed] = useState(false);

  // Load heart state from localStorage on initial render
  useEffect(() => {
    const storedHeartState = localStorage.getItem('isHeartRed') === 'true';
    setIsHeartRed(storedHeartState);
  }, []);

  // Function to toggle the share popup visibility
  const handleShareButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent immediate closure on click
    setIsSharePopupVisible(!isSharePopupVisible);
  };

  // Function to close the share popup
  const handleCloseButtonClick = () => {
    setIsSharePopupVisible(false);
  };

  // Function to copy link to the clipboard
  const handleCopyLink = (event: React.MouseEvent) => {
    event.preventDefault();
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Error copying link:', err));
  };

  // Function to handle clicks outside the share popup to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        !(
          (event.target as HTMLElement).closest('.share-container') ||
          (event.target as HTMLElement).closest('.share-popup')
        )
      ) {
        setIsSharePopupVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Function to toggle the heart state and update localStorage
  const handleHeartButtonClick = () => {
    const newHeartState = !isHeartRed;
    setIsHeartRed(newHeartState);
    localStorage.setItem('isHeartRed', newHeartState.toString());
  };

  return (
    <div>
      {/* Top Navigation */}
      <nav className="top-nav">
        <a id="openPopup" className="country" href="#" onClick={togglePopup}>
          <span role="img" aria-label="globe">🌐</span>
          <b>{regionToCountry[selectedRegion]}</b>
        </a>
        <a href="#"><b>Trip Boards</b></a>
        <a href="#"><b>List your property</b></a>
        <a href="#"><b>Help</b></a>
        <a href="#"><b>My trips</b></a>
        <a href="#"><b>Sign in</b></a>
      </nav>

      {/* Popup Overlay */}
      {isPopupVisible && (
        <div id="popupOverlay" className="overlay" onClick={(e) => e.target === e.currentTarget && togglePopup()}>
          <div className="dialog-container">
            <div className="dialog-header">
              <span className="dialog-title">Display settings</span>
              <button className="close-button" onClick={togglePopup}>✕</button>
            </div>

            <div className="warning-message">
              <span className="warning-icon" role="img" aria-label="warning">⚠️</span>
              <p className="warning-text">Changing your region could change your rewards program.</p>
            </div>

            <p className="warning-text" style={{ marginBottom: '20px' }}>
              To stay with your current rewards program, keep your region the same. One Key is currently only available in select regions.
            </p>

            <div className="form-group">
              <label className="form-label">Region</label>
              <select id="region-select" value={selectedRegion} onChange={handleRegionChange}>
                {Object.keys(regionToCountry).map((regionCode) => (
                  <option key={regionCode} value={regionCode}>
                    {regionToCountry[regionCode]}
                  </option>
                ))}
              </select>

              <label className="form-label">Currency</label>
              <input
                type="text"
                id="currency-display"
                value={currency}
                disabled
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  marginBottom: '12px',
                  backgroundColor: '#f5f5f5',
                }}
              />
            </div>

            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}

      <div className="container">
        {/* Sub Navigation */}
        <div className="sub-nav">
          <a href="#" className="back-link">
            <b>See all properties</b>
          </a>
          <div className="action-buttons">
            {/* Share Container */}
            <div className="share-container">
              <button className="btn" onClick={handleShareButtonClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <p className="s1">Share</p>
              </button>
              {isSharePopupVisible && (
                <div className="share-popup">
                  <button className="close-btn" onClick={handleCloseButtonClick}>&#10005;</button>
                  <div className="popup-header">
                    <div className="header-content">
                      <Image src={mainImage} width={250} height={100} alt="Juneau Vacation Home" className="popup-image" />
                      <div className="popup-text">
                        <h3>{title}</h3>
                        <span>{address}</span>
                        <strong>9.8/10</strong>
                      </div>
                    </div>
                  </div>
                  <div className="share-options">
                    <a href="#" className="share-option">
                      <img src="/images/message.svg" alt="Messages" />
                      <span>Messages</span>
                    </a>
                    <a href="#" className="share-option">
                      <img src="/images/wapp.png" alt="WhatsApp" />
                      <span>WhatsApp</span>
                    </a>
                    <a href="#" className="share-option">
                      <img src="/images/messenger.svg" alt="Messenger" />
                      <span>Messenger</span>
                    </a>
                    <a href="#" className="share-option">
                      <img src="/images/fb.svg" alt="Facebook" />
                      <span>Facebook</span>
                    </a>
                    <a href="#" className="share-option" onClick={handleCopyLink}>
                      <img src="/images/copy-link.png" alt="Copy link" />
                      <span>Copy link</span>
                    </a>
                    {/* Add other share options as needed */}
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <button className="btn" id="heartButton" onClick={handleHeartButtonClick}>
              <span id="heartIcon" style={{ fontSize: '16px' }}>
                {isHeartRed ? '❤️' : '🤍'}
              </span>
              <p className="s1">Save</p>
            </button>
          </div>
        </div>
      </div>


    </div>



  );
};

export default NavigationBar;