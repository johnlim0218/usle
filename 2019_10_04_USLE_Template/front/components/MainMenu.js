import React from 'react';
import styled from 'styled-components';

const UpperMenuWrapper = styled.div`
    background-color: #f8e7c9;
    border-bottom: 1px solid #fcf2e0;
`;
const AlignCenter = styled.div`
    width: 1080px;
    margin: 0 auto;
    position:relative;
    text-align:center;
`;

const MainMenu = () => {
    return(
        <UpperMenuWrapper>
            <AlignCenter>
                MainMenu
            </AlignCenter>
        </UpperMenuWrapper>
    )
}

export default MainMenu;