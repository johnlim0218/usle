import React from 'react';
import { useSelector } from 'react-redux';
import AppAppBar from '../views/AppAppBar';
import AppFooter from '../views/AppFooter';

const AppLayout = ({ children }) => {
    const { me } = useSelector(state => state.userReducer);
    
    return(
        <div>
            <header>
                <AppAppBar/>
            </header>
            <main>
                {children}
            </main>
            <AppFooter/>
        </div>
    )
}

export default AppLayout;