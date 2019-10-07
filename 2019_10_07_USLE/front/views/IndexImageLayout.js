import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Container from '@material-ui/core/Container';

export const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

const StyledSection = styled.section`
    ${({ theme }) => {
       return{
        color: theme.palette.common.white,
       }
    }};
    position: relative;
    display: flex;
    align-items: center;
    
    ${breakpoint('sm')`
        height: 80vh;
        min-height: 500px;
        max-height: 1300px;
    `};
    
`;
const StyledContainer = styled(Container)`
    ${({ theme }) => {
        return{
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(14),
        }
    }};
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledBackdrop = styled.div`
    ${({ theme }) => {
        return{
            backgroundColor: theme.palette.common.black,
        }
    }}
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.5;
    z-index: -1;
`;
const Background = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -2;
`
const StyledBackground = styled(Background)`
    background-image: url(${backgroundImage});
    background-color: #7fc7d9;
    background-position: center;
`;
const StyledSpaceImage = styled.img`
    width: 147px;
    height: 80px;
`;
const StyledArrowDownImage = styled.img`
    ${({ theme }) => {
        return{
            bottom: theme.spacing(4),
        }
    }};
    position: absolute;
`;

const IndexImageLayout = ({ children }) => {
    return(
        <StyledSection>
            <StyledContainer>
                <StyledSpaceImage src="https://material-ui.com/static/themes/onepirate/productHeroWonder.png"/>
                     {children}
                <StyledBackdrop/>
                <StyledBackground/>
                <StyledArrowDownImage src="https://material-ui.com/static/themes/onepirate/productHeroArrowDown.png"/>
            </StyledContainer>
        </StyledSection>
    )
}

IndexImageLayout.propTypes = {
    children: PropTypes.node.isRequires,
}

export default IndexImageLayout;