import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Container from '@material-ui/core/Container';

const Section = styled.section`
    color: white;
    position: relative;
    display: flex;
    align-items: center;
    ${breakpoint('sm')`
        height: 80vh;
        min-height: 500px;
        max-height: 1300px;
    `};
`;
const Backdrop = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.5;
    z-index: -1;
`;
const Backgroud = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -2;
`
const SpaceImage = styled.img`
    width: 147px;
    height: 80px;
`;
const ArrowDownImage = styled.img`
    position: absolute;
    bottom: 32px;
    width: 12px;
    height: 16px;
`;

const IndexImageLayout = ({ children }) => {
    
    return(
        <Section>
            <Container>
                <SpaceImage/>
                {'INDEX'}
                {children}
                <Backdrop/>
                <Backgroud/>
                <ArrowDownImage/>
            </Container>
        </Section>
    )
}

IndexImageLayout.propTypes = {
    children: PropTypes.node.isRequires,
}

export default IndexImageLayout;