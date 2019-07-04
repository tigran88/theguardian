import React from 'react';
import { Link } from 'react-router-dom'

import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="container">
                <Link to="/" className="header_title">The Guardian</Link>
            </div>
        </header>
    )
};

export default Header;
