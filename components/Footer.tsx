import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="section" style={{ marginBottom: '2rem' }}>
      <div className="about-host">
        <div style={{ flex: '0 0 30%' }}>
          <h2>Send a message</h2>
        </div>
        <div>
          <button className="contact-host-end">Contact host</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;