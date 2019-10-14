import React from 'react';

import AppAppBar from '../views/AppAppBar';
import AppFooter from '../views/AppFooter';

const AppLayout = ({ children }) => {
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