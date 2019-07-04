import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Layout = (props) => {
    return (
        <>
            <Header />
            <main className="container main-content">
                {props.children}
            </main>
            <Footer />
        </>
    )
};

export default Layout;
