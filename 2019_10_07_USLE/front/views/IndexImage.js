import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import IndexImageLayout from './IndexImageLayout';
import Typography from '../components/Typography';
import ModifiedButton from '../components/Button';

import backgroundImage from '../views/IndexImageLayout';

const StyledBackgroundImage = styled.img.attrs((props) => ({
    src:{backgroundImage},
    alt: "increase priority" 
}))`
    display: none;
`;
const StyledTypographyTitle = styled(Typography).attrs((props) => ({
    color: "inherit",
    align: "center", 
    variant: "h2",
    marked:"center"
}))`
    color: white;
`
const StyledTypographySub = styled(Typography).attrs((props) => ({
    color: "inherit", 
    align: "center", 
    variant:"h5"
}))`
    margin-bottom: ${props => props.theme.spacing(4)}px;
    margin-top: ${props => props.theme.spacing(4)}px;
    ${breakpoint('sm')`
        margin-top: ${props => props.theme.spacing(10)}px;
    `};
    color: white;
`;
const StyledModifiedButton = styled(ModifiedButton).attrs((props) => ({
    color: "secondary",
    variant: "contained",
    size: "large",
    component: 'a',
}))`
    min-width: 200px;
`;
const StyledTypographyMore = styled(Typography).attrs((props) => ({
    variant: "body2", 
    color: "inherit",
}))`
    margin-top: ${props => props.theme.spacing(2)}px;
`;  

const IndexImage = () => {
    
    return(
        <IndexImageLayout>
            <StyledBackgroundImage/>
            <StyledTypographyTitle>
                Upgrade your Sundays
            </StyledTypographyTitle>
            <StyledTypographySub>
                Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
            </StyledTypographySub>
            <StyledModifiedButton>
                Register
            </StyledModifiedButton>
            <StyledTypographyMore>
                Discover the experience
            </StyledTypographyMore>
        </IndexImageLayout>
    )
}

export default IndexImage;

