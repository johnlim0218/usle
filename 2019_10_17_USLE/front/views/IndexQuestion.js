import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Typography from '../components/Typography';
// import Button from '../components/Button';
import Button from '@material-ui/core/Button';

const StyledContainer = styled(Container).attrs((props) => ({
    component: 'section',
}))`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: ${props => props.theme.spacing(9)}px;
    margin-bottom: ${props => props.theme.spacing(9)}px;
`;

const StyledButton = styled(Button)`
    border: 4px solid black;
    border-radius: 0;
    height: auto;
    padding: ${props => props.theme.spacing(2, 5)};
`;

const StyledTypographyNeedHelp = styled(Typography).attrs((props) => ({
    variant:'h4',
    component: 'span',
}))`
`;

const StyledTypographyLink = styled(Typography).attrs((props) => ({
    variant: 'subtitle1',
}))`
    margin-top: ${props => props.theme.spacing(3)}px;
    margin-bottom: ${props => props.theme.spacing(3)}px;
`;

const StyledImgBuoy = styled.img.attrs((props) => ({
    src: 'https://material-ui.com/static/themes/onepirate/producBuoy.svg',
    alt: 'buoy',
}))`
    width: 60px;
`;

const IndexQuestion = () => {
    return (
        <StyledContainer>
            <StyledButton>
                <StyledTypographyNeedHelp>
                    Got any questions? Need help?
                </StyledTypographyNeedHelp>
            </StyledButton>
            <StyledTypographyLink>
                We are here to help. Get in touch!
            </StyledTypographyLink>
            <StyledImgBuoy/>
        </StyledContainer>
    )
}

export default IndexQuestion;