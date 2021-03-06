import React from 'react';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import HeaderMenu from '../components/HeaderMenu';
import MainMenu from '../components/MainMenu';
import Footer from '../components/Footer';

const AppLayout = ({ children }) => {
    return(
        <div>
            <div>
                <HeaderMenu/> 
            </div>
            <div>
                MainMenu
            </div>
            <div>
                 {children}
            </div>
            <div>
                 Footer
            </div>
            
        </div>
    )
}

export default AppLayout;