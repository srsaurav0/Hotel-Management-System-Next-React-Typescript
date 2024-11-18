import React from 'react';
import Header from '../components/Header';
import ImageGallery from '../components/ImageGallery';
// import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header images={[]} />
            <ImageGallery images={[]} totalImageCount={0} />
            {/* <main>
                <h1>About Us</h1>
                <p>This is the about page content.</p>
            </main> */}
            {/* <Footer /> */}
        </div>
    );
};

export default HomePage;
