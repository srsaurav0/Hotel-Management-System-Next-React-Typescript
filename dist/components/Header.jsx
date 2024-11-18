"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const NavigationBar = () => {
    // State to control the visibility of the popup
    const [isPopupVisible, setIsPopupVisible] = (0, react_1.useState)(false);
    const [selectedRegion, setSelectedRegion] = (0, react_1.useState)('PT'); // Default to Portugal
    const [currency, setCurrency] = (0, react_1.useState)('EUR'); // Default currency
    // Mapping region to currency and country name
    const regionToCurrency = {
        'PT': 'EUR', 'US': 'USD', 'GB': 'GBP', 'JP': 'JPY', 'AU': 'AUD', 'CA': 'CAD',
        'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'CN': 'CNY', 'IN': 'INR',
        'BR': 'BRL', 'RU': 'RUB', 'MX': 'MXN', 'ZA': 'ZAR', 'KR': 'KRW', 'SE': 'SEK',
        'NL': 'EUR', 'CH': 'CHF', 'BE': 'EUR', 'AR': 'ARS', 'NO': 'NOK', 'AT': 'EUR',
        'DK': 'DKK', 'FI': 'EUR', 'PL': 'PLN', 'NZ': 'NZD', 'IE': 'EUR', 'GR': 'EUR'
    };
    const regionToCountry = {
        'PT': 'Portugal', 'US': 'United States', 'GB': 'United Kingdom', 'JP': 'Japan',
        'AU': 'Australia', 'CA': 'Canada', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy',
        'ES': 'Spain', 'CN': 'China', 'IN': 'India', 'BR': 'Brazil', 'RU': 'Russia',
        'MX': 'Mexico', 'ZA': 'South Africa', 'KR': 'South Korea', 'SE': 'Sweden',
        'NL': 'Netherlands', 'CH': 'Switzerland', 'BE': 'Belgium', 'AR': 'Argentina',
        'NO': 'Norway', 'AT': 'Austria', 'DK': 'Denmark', 'FI': 'Finland', 'PL': 'Poland',
        'NZ': 'New Zealand', 'IE': 'Ireland', 'GR': 'Greece'
    };
    // Function to toggle the popup visibility
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };
    // Function to handle region change
    const handleRegionChange = (event) => {
        const selected = event.target.value;
        setSelectedRegion(selected);
        setCurrency(regionToCurrency[selected]);
    };
    // Function to handle save button click
    const handleSave = () => {
        // Close the popup after saving
        setIsPopupVisible(false);
    };
    return (<div>
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
      {isPopupVisible && (<div id="popupOverlay" className="overlay" onClick={(e) => e.target === e.currentTarget && togglePopup()}>
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
                {Object.keys(regionToCountry).map((regionCode) => (<option key={regionCode} value={regionCode}>
                    {regionToCountry[regionCode]}
                  </option>))}
              </select>

              <label className="form-label">Currency</label>
              <input type="text" id="currency-display" value={currency} disabled style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                marginBottom: '12px',
                backgroundColor: '#f5f5f5',
            }}/>
            </div>

            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>)}
    </div>);
};
exports.default = NavigationBar;
