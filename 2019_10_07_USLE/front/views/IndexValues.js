import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const StyledSection = styled.section`
    ${({ theme }) => {
        return{
            backgroundColor: theme.palette.secondary.light,
        }
    }};
    display: flex;
    overflow: hidden;
`;
const StyledContainer = styled(Container)`
    &&{
        ${({ theme }) => {
            return{
                marginTop: theme.spacing(15),
                marginBottom: theme.spacing(30),
            }
        }};
        display: flex;
        position: relative;
    }
`
const StyledDivItem = styled.div`
    ${({ theme }) => {
        return{
            padding: theme.spacing(0, 5),
        }
    }};
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledCurvyBackground = styled.img`
    pointer-events: none;
    position: absolute;
    top: -180px;
`;
const StyledImage = styled.img`
    height: 55px;
`;
const StyledTypographyTitle = styled(Typography)`
    ${({ theme }) => {
        return {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
        }
    }}
`
const IndexValues = () => {

    return(
        <StyledSection>
            <StyledContainer>
                <StyledCurvyBackground src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png" alt="curvy lines"/>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <StyledDivItem>
                            <StyledImage src="https://material-ui.com/static/themes/onepirate/productValues1.svg" alt="suitcase"/>
                            <StyledTypographyTitle variant="h6">
                                The best luxury hotels
                            </StyledTypographyTitle>
                            <Typography variant="h5">
                                {'From the latest trendy boutique hotel to the iconic palace with XXL pool'}
                                {', go for a mini-vacation just a few subway stops away from your home.'}
                            </Typography>
                        </StyledDivItem>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StyledDivItem>
                            <StyledImage src="https://material-ui.com/static/themes/onepirate/productValues2.svg" alt="graph"/>
                            <StyledTypographyTitle variant="h6">
                                New experiences
                            </StyledTypographyTitle>
                            <Typography variant="h5">
                                {'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '}
                                {'your Sundays will not be alike.'}
                            </Typography>
                        </StyledDivItem>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StyledDivItem>
                            <StyledImage src="https://material-ui.com/static/themes/onepirate/productValues3.svg" alt="clock"/>
                            <StyledTypographyTitle variant="h6">
                                Exclusive rates
                            </StyledTypographyTitle>
                            <Typography variant="h5">
                                {'By registering, you will access specially negotiated rates '}
                                {'that you will not find anywhere else.'}
                            </Typography>
                        </StyledDivItem>
                    </Grid>
                </Grid>
            </StyledContainer>
        </StyledSection>
    )
}

IndexValues.propTypes = {
    
}

export default IndexValues;