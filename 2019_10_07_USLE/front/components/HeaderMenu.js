import React from 'react';
import Link from 'next/link';
import { Menu, Input } from 'antd';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';

import styled from 'styled-components';
 
const InfobarHeader = styled.div`
    background-color: #fcf2e0;
    color: #656565;
    padding-top: 5px;
    min-height: 30px;
`;
const AlignCenter = styled.div`
    width: 1080px;
    margin: 0 auto;
    position:relative;
    text-align:center;
`;
const InlineBlock = styled.div`
    display: inline-block;
`;

const StyledBreadCrumbs = styled(Breadcrumbs)`
    position: absolute;
    top: 0;
    right: 5px;
`;
const StyledPersonIcon = styled(PersonIcon)`
    &&{ 
        width: 20px;
        height: 20px; 
    }
`;
const StyledFavoriteIcon = styled(FavoriteIcon)`
    &&{ 
        width: 20px;
        height: 20px;
    }
`;
const StyledSearchIcon = styled(SearchIcon)`
    &&{ 
        width: 20px;
        height: 20px;
    }
`;

const HeaderMenu = () => {
    return(
        <InfobarHeader>
            <AlignCenter>
                <InlineBlock>
                    <div>
                        <a>FREE ZERO WASTE + PLASTIC FREE SHIPPING ON ALL USA ORDERS OVER $25*</a>
                    </div>
                </InlineBlock>
                <InlineBlock>
                    <StyledBreadCrumbs aria-label="breadcrumb">
                        <StyledPersonIcon/>
                            MyAccount
                        <StyledFavoriteIcon/>
                            Favorite
                        <StyledSearchIcon/>
                            Search
                    </StyledBreadCrumbs>
                </InlineBlock>
            </AlignCenter>
        </InfobarHeader> 
    )
}

export default HeaderMenu;