import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import AdminRoutes from '../../routes/AdminSidebarRoutes';
import Admin from '../../pages/admin/admin';

const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        border: none;
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 1;
        
        ${breakpoint('md')`
            width: 260px;
            position: fixed;
            height: 100%;
        `}
       
        @media (max-width: 959.95px){
            width: 260px;
            position: fixed;
            display: block;
            top: 0;
            height: 100vh;
            z-index: 1032;
            visibility: visible;
            overflow-y: visible;
            border-top: none;
            text-align: left;
            padding-right: 0px;
            padding-left: 0;
        }
    }
`
const StyledList = styled(List)`
    margin-top: 20px;
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    list-styled: none;
    position: unset;
`;

const StyledDivBrandLogo = styled.div`
    position: relative;
    padding: 15px 15px;
    z-index: 4;
    :after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 1px;
        right: 15px;
        width: calc(100% - 30px);
        
`;

const StyledATagLogoLink = styled.a`
    text-transform: uppercase;
    padding: 5px 0;
    display: block;
    font-size: 18px;
    text-align: left;
    font-weight: 400;
    line-height: 30px;
    text-decoration: none;
    background-color: transparent;
    
`;

const StyledDivSidebarWrapper = styled.div`
    position: relative;
    height: calc(100vh - 75px);
    overflow: auto;
    width: 260px;
    z-index: 4;
    overflow-scrolling: touch;
`;

const StyledDivBackground = styled.div`
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: block;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center center;
    :after {
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
        content: "";
        display: block;
        background: antiquewhite;
        opacity: .8;
    }
`;


const Sidebar = (props) => {
    
    const Brand = () => {
        return(
            <StyledDivBrandLogo>
                <StyledATagLogoLink href="/">
                    <div>
                        <img style={{width:'100px'}}src="https://image.idus.com/image/files/ccfb6ba6d8b1413cb461246f1ad9de07_320.jpg" alt='logo'/>
                    </div>
                    USLE
                   
                </StyledATagLogoLink>
            </StyledDivBrandLogo>
        )
    }

    const Links = () => {
        return(
            <StyledList>
                {AdminRoutes.map((prop, index) => {
                    return(
                        <Link key={prop}>
                            <a href={prop.path}>
                                <ListItem button>
                                    {typeof prop.icon === 'string' ? (
                                        <Icon>
                                            {prop.icon}
                                        </Icon>
                                    ) : (
                                        <prop.icon/>
                                    )}
                                    <ListItemText
                                        primary={prop.name}
                                        disableTypography={true}
                                    />
                                </ListItem>
                            </a>
                        </Link>
                        
                    )
                })}
            </StyledList>
        )
    }

    return(
    <div>
        <Hidden smDown implementation='css'>
            <StyledDrawer
                anchor="left"
                variant="permanent"
                open
            >
                <Brand/>
                <StyledDivSidebarWrapper>
                    <Links/>
                </StyledDivSidebarWrapper>
                <StyledDivBackground/>
            </StyledDrawer>
        </Hidden>
        <Hidden mdUp implementation="css">
            <StyledDrawer
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={props.handleDrawertoggle}
                ModalProps={{
                    keepMounted: true
                }}
            >
                <Brand/>
                <StyledDivSidebarWrapper>
                  <Links/>
                </StyledDivSidebarWrapper>
                <StyledDivBackground/>
            </StyledDrawer>
        </Hidden>

    </div>
    )
}

export default Sidebar;
