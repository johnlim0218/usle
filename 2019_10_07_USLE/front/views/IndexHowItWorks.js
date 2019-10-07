import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const StyledSection = styled.section`
    background-color: ${props => props.theme.palette.secondary.light};
    display: flex;
    overflow: hidden;
`;

const StyledContainer = styled(Container)`
    margin-top: ${props => props.theme.spacing(10)}px;
    margin-bottom: ${props => props.theme.spacing(15)}px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledCurvyBackground = styled.img`
    pointer-events: none;
    position: absolute;
    top: -180px;
    opacity: 0.7;
`;
const StyledTypographyTitle = styled(Typography)`
    margin-bottom: ${props => props.theme.spacing(14)}px;
`;
const StyledDivItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${props => props.theme.spacing(0, 5)}px;
`;
const StyledDivNumer = styled.div`
    font-size: 24px;
    font-family: ${props => props.theme.typography.fontFamily};
    color: ${props => props.theme.palette.secondary.main};
    font-weight: ${props => props.theme.typography.fontWeightMedium};
`;
const StyledImg = styled.img`
    height: 55px;
    margin-top: ${props => props.theme.spacing(4)}px;
    margin-bottom: ${props => props.theme.spacing(4)}px;
`;
const StyledButton = styled(Button).attrs(props => ({
    color: 'secondary',
    size: 'large',
    variant: 'contained',
    component: 'a',
}))`
    margin-top: ${props => props.theme.spacing(8)}px;
`;
const IndexHowItWorks = () => {
    return(
        <StyledSection>
            <StyledContainer>
                <StyledCurvyBackground src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png" alt="curvy lines"/>
                <StyledTypographyTitle variant="h4" marked="center" component="h2">
                    How it works
                </StyledTypographyTitle>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <StyledDivItem>
                            <StyledDivNumer>1.</StyledDivNumer>
                            <StyledImg src="https://material-ui.com/static/themes/onepirate/productHowItWorks1.svg" alt="suitcase"/>
                            <Typography variant="h5" align="center">
                                Appointment every Wednesday 9am.
                            </Typography>
                        </StyledDivItem>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StyledDivItem>
                            <StyledDivNumer>2.</StyledDivNumer>
                            <StyledImg src="https://material-ui.com/static/themes/onepirate/productHowItWorks2.svg" alt="graph"/>
                            <Typography variant="h5" align="center">
                               First come, first served. Our offers are in limited quantities, so be quick.
                            </Typography>
                        </StyledDivItem>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StyledDivItem>
                            <StyledDivNumer>3.</StyledDivNumer>
                            <StyledImg src="https://material-ui.com/static/themes/onepirate/productHowItWorks3.svg" alt="clock"/>
                            <Typography variant="h5" align="center">
                                {'New offers every week. New experiences, new surprises. '}
                                {'Your Sundays will no longer be alike.'}
                            </Typography>
                        </StyledDivItem>
                    </Grid>
                </Grid>
                <StyledButton>
                    Get started
                </StyledButton>
            </StyledContainer>
        </StyledSection>
    )
};

export default IndexHowItWorks;