import React from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <footer>
            &copy; { new Date().getFullYear() } The Guardian
        </footer>
    )
};

export default Footer;
