import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import AppAppBar from '../views/AppAppBar';
import AppAppBarLogOut from '../views/AppAppBarLogOut';
import AppFooter from '../views/AppFooter';
import { LOAD_USER_REQUEST } from '../reducers/userReducer';

const AppLayout = ({ children }) => {
    const { me } = useSelector(state => state.userReducer);
    
    return(
        <div>
            <header>
                {me ? <AppAppBar/> : <AppAppBarLogOut/>}
            </header>
            <main>
                {children}
            </main>
            <AppFooter/>
        </div>
    )
}

export default AppLayout;