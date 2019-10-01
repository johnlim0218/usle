import React from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import HeaderMenu from '../components/HeaderMenu';
import MainMenu from '../components/MainMenu';
import Footer from '../components/Footer';

const AppLayout = ({ children }) => {
    return(
        <div>
            <Container>
                HeaderMenu
            </Container>
            <Container>
                MainMenu
            </Container>
            <Container>
                {children}
            </Container>
            <Container>
                Footer
            </Container>
        </div>
    )
}

export default AppLayout;