import React from 'react';


import HeaderMenu from '../components/HeaderMenu';
import MainMenu from '../components/MainMenu';
import Footer from '../components/Footer';

import AppAppBar from '../views/AppAppBar';

const AppLayout = ({ children }) => {
    return(
        <div>
            <AppAppBar/>
            <header>
                <HeaderMenu/> 
                <MainMenu/>
            </header>
            <main>
                 {children}
            </main>
            
            <footer>
                <Footer/>
            </footer>
            
        </div>
    )
}

export default AppLayout;