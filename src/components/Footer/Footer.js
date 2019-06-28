import React from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                &copy; { new Date().getFullYear() } The Guardian
            </div>
        </footer>
    )
};

export default Footer;
