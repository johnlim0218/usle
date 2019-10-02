import React from 'react';

import HeaderMenu from '../components/HeaderMenu';
import MainMenu from '../components/MainMenu';
import Footer from '../components/Footer';

const AppLayout = ({ children }) => {
    return(
        <div>
            <header>
                <HeaderMenu/> 
            
                MainMenu
            </header>
            <main>
                 {children}
            </main>
            <footer>
                 Footer
            </footer>
            
        </div>
    )
}

export default AppLayout;