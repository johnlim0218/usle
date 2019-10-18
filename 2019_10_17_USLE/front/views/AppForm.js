import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const StyledDivFormRoot = styled.div`
    display: flex;
    background-image: url(https://material-ui.com/static/themes/onepirate/productCurvyLines.png);
    background-repeat: no-repeat;
`;
const StyledContainer = styled(Container)`
    ${props => props.theme.container};
`
const StyledBox = styled(Box)`
    ${props => props.checkout && `
        &.MuiBox-root {
            margin-top: 10px;
            margin-bottom: 60px;
        }
    `}
`
const StyledPaper = styled(Paper)`

    ${props => props.signUp && `    
        padding: ${props.theme.spacing(4, 3)};
    `};
    ${props => props.signIn && `
        padding: ${props.theme.spacing(4, 3)};
    `};
    ${props => props.checkout && `
        padding: ${props.theme.spacing(2, 3)};
        
    `};

    ${breakpoint('md')`
        ${props => props.signUp && ` 
            padding: ${props.theme.spacing(8, 6)};    
        `};
        ${props => props.signIn && `
            padding: ${props.theme.spacing(8, 6)};    
        `};
        ${props => props.checkout && `
            padding: ${props.theme.spacing(2, 6)};    
        `};
    `};
`;

const AppForm = (props) => {
    const { children, checkout, signIn, signUp, ...others } = props;
    
    return(
        <StyledDivFormRoot>
            <StyledContainer>
                <StyledBox mt={7} mb={12} {...props}>
                    <StyledPaper {...props}>
                        {children}
                    </StyledPaper>
                </StyledBox>
            </StyledContainer>
        </StyledDivFormRoot>
    )
};

AppForm.propTypes = {
    children: PropTypes.node,
    checkout: PropTypes.bool,
    signIn: PropTypes.bool,
    signUp: PropTypes.bool,
}

export default AppForm;