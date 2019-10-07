import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import IndexImageLayout from './IndexImageLayout';
import Typography from '../components/Typography';
import ModifiedButton from '../components/Button';

import backgroundImage from '../views/IndexImageLayout';

const StyledBackgroundImage = styled.img`
    display: none;
`;
const StyledTypographyTitle = styled(Typography)`
    color: white;
`
const StyledTypographySub = styled(Typography)`
    ${({ theme }) => {
        return{
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(4),
        }
    }}
    ${breakpoint('sm')`
        ${({ theme }) => {
            return{
                marginTop: theme.spacing(10), 
            }
        }}
    `};
    color: white;
`;
const StyledModifiedButteon = styled(ModifiedButton)`
        min-width: 200px;
`;
const StyledTypographyMore = styled(Typography)`
       ${({ theme }) => {
           return {
                marginTop: theme.spacing(2),
           }
       }}
`;  

const IndexImage = () => {
    
    return(
        <IndexImageLayout>
            <StyledBackgroundImage style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <StyledTypographyTitle color="inherit" align="center" variant="h2" marked="center"
            >
                Upgrade your Sundays
            </StyledTypographyTitle>
            <StyledTypographySub color="inherit" align="center" variant="h5">
                Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
            </StyledTypographySub>
            <StyledModifiedButteon
                color="secondary"
                variant="contained"
                size="large"
                component='a'
            >
                Register
            </StyledModifiedButteon>
            <StyledTypographyMore variant="body2" color="inherit">
                Discover the experience
            </StyledTypographyMore>
        </IndexImageLayout>
    )
}

export default IndexImage;

