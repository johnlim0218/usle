import React from 'react';
import Link from 'next/link';
import { Menu, Input } from 'antd';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

import styled from 'styled-components';
 
const StyledHomeIcon = styled(HomeIcon)`
    &&{ 
        width: 10px;
        height: 15px; 
    }
`;
const StyledWhatshotIcon = styled(WhatshotIcon)`
    &&{ 
        width: 10px;
        height: 15px; 
    }
`;
const StyledGrainIcon = styled(GrainIcon)`
    &&{ 
        width: 10px;
        height: 15px; 
    }
`;

const HeaderMenu = () => {
    return(
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledHomeIcon/>
                Material-UI
            <StyledWhatshotIcon/>
                Core
            <StyledGrainIcon/>
                Breadcrumb
          </Breadcrumbs>
        </> 
    )
}

export default HeaderMenu;