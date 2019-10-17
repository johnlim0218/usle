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
const StyledPaper = styled(Paper)`
    padding: ${props => props.theme.spacing(4, 3)};
    ${breakpoint('md')`
        padding: ${props => props.theme.spacing(8,6)};    
    `};
`
const AppForm = ({ children, ...props}) => {
    return(
        <StyledDivFormRoot>
            <Container maxWidth='sm'>
                <Box mt={7} mb={12}>
                    <StyledPaper>
                        {children}
                    </StyledPaper>
                </Box>
            </Container>
        </StyledDivFormRoot>
    )
};

export default AppForm;