import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import IndexImageLayout from './IndexImageLayout';
import Typography from '../components/Typography';
import ModifiedButton from '../components/Button';

import backgroundImage from '../views/IndexImageLayout';
  
const styles = (theme) => ({
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    h5sm:{
        marginTop: theme.spacing(10), 
    },
    more: {
        marginTop: theme.spacing(2),
    },
});

const StyledBackgroundImage = styled.img`
    display: none;
`;
const StyledTypography = styled(Typography)`
    ${({ theme }) => {
        const classes = styles(theme);
        return{
            ...classes.h5,
        }
    }}
    ${breakpoint('sm')`
        ${({ theme }) => {
            const classes = styles(theme);
            return{
                ...classes.h5sm,
            }
        }}
    `};
`;
const StyledModifiedButteon = styled(ModifiedButton)`
        min-width: 200px;
`;
const StyledTypographyMore = styled(Typography)`
       ${({ theme }) => {
           const classes = styles(theme);
           return {
               ...classes.more,
           }
       }}
`;  

const IndexImage = () => {
    
    return(
        <IndexImageLayout>
            <StyledBackgroundImage style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <Typography color="inherit" align="center" variant="h2" marked="center">
                Upgrade your Sundays
            </Typography>
            <StyledTypography color="inherit" align="center" variant="h5">
                Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
            </StyledTypography>
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

