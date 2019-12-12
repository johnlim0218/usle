import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Container from '@material-ui/core/Container';

export const backgroundImage =
  'https://shop-phinf.pstatic.net/20190220_230/beaglez_1550634780469YvwEq_JPEG/38688883864434602_842573459.jp';

const StyledSection = styled.section`
    color: ${props => props.theme.palette.common.white};
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
    margin-top: ${props => props.theme.spacing(3)}px;
    margin-bottom: ${props => props.theme.spacing(14)}px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledBackdrop = styled.div`
    background-color: ${props => props.theme.palette.common.black};
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
const StyledSpaceImage = styled.img.attrs((props) => ({
    src: "https://material-ui.com/static/themes/onepirate/productHeroWonder.png",
}))`
    width: 147px;
    height: 80px;
`;
const StyledArrowDownImage = styled.img.attrs((prosp) => ({
    src: "https://material-ui.com/static/themes/onepirate/productHeroArrowDown.png",
}))`
    bottom: ${props => props.theme.spacing(4)}px;
    position: absolute;
`;

const IndexImageLayout = (props) => {
    const { children, ...others } = props;
    return(
        <StyledSection>
            <StyledContainer>
                <StyledSpaceImage/>
                     {children}
                <StyledBackdrop/>
                <StyledBackground/>
                <StyledArrowDownImage/>
            </StyledContainer>
        </StyledSection>
    )
}

IndexImageLayout.propTypes = {
    children: PropTypes.node,
}

export default IndexImageLayout;