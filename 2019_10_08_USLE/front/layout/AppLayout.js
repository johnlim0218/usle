import React from 'react';

import HeaderMenu from '../components/HeaderMenu';
import MainMenu from '../components/MainMenu';
import Footer from '../components/Footer';

import AppAppBar from '../views/AppAppBar';
import AppFooter from '../views/AppFooter';

const AppLayout = ({ children }) => {
    return(
        <div>
            <header>
                <HeaderMenu/> 
                <AppAppBar/>
            </header>
            <main>
                 {children}
            </main>
            
            <footer>
                <AppFooter/>
            </footer>
            
        </div>
    )
}

export default AppLayout;