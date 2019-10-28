import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppAppBar from '../views/AppAppBar';
import AppFooter from '../views/AppFooter';
import { LOAD_USER_REQUEST } from '../reducers/userReducer';

const AppLayout = ({ children }) => {
    const { me } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!me){
            dispatch({
                type: LOAD_USER_REQUEST,
            })
        }
    },[]);
    
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