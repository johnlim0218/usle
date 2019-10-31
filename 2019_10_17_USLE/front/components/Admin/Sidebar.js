import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import styled, { css } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import Admin from '../../pages/admin/admin';

const StyledDrawer = styled(Drawer)`
    
    .MuiDrawer-paper {
        width: ${props => props.miniActive ? 80 : 260}px !important;
        border: none;
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 1032;
        transition-property: top, bottom, width;
        transition-duration: .2s, .2s, .35s;
        transition-timing-function: linear, linear, ease;
        
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
            transform: translate3d(260px, 0 0);
        }
        
        :before, :after {
            position: absolute;
            z-index: 3;
            width:100%
            height: 100%;
            content: "";
            display: block;
            top: 0;
        }
    }
    
    
`
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

const StyledList = styled(List)`
    margin-top: 20px;
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    list-style: none;
    position: unset;
`;

const StyledATagNavigationLink = styled.a`
    position: relative;
    display: block;
    text-decoration: none;
    :hover, :focus, :visited {
        color: white;
    }
`;

const StyledNavIcon = styled(props => (
    <props.icon {...props}/>
))`
    width: 24px;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    float: left;
    margin-right: 15px;
    text-align: center;
    vertical-align: middle;
`
const StyledListItem = styled(ListItem)`
    width: auto;
    transition: all 300ms linear;
    margin: 10px 15px 0;
    border-radius: 3px;
    position: relative;
    display: block;
    padding: 10px 15px;
    background-color: transparent;
`;

const StyledListItemText = styled(ListItemText)`
    margin: 0;
    line-height: 30px;
    font-size: 14px;
`;

const StyledDivSidebarWrapper = styled.div`
    position: relative;
    height: calc(100vh - 75px);
    overflow: auto;
    width: 260px;
    z-index: 4;
    overflow-scrolling: touch;
    transition-property: top, bottom, width;
    transition-duration: .2s, .2s, .35s;
    transition-timing-function: linear, linear, ease;
    color: inherit;
    padding-bottom: 30p;
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
    const { routes, open, handleDrawerToggle, ...others } = props;
    const [miniActive, setMiniActive] = useState(true);
    
    const onMouseOverMiniActive = useCallback(() => {
        setMiniActive(false);
    }, [miniActive]);

    const onMouseOutMiniActive = useCallback(() => {
        setMiniActive(true);
    }, [miniActive]);

    const Brand = () => {
        return(
            <StyledDivBrandLogo>
                <StyledATagLogoLink href="/">
                    <div>
                        <img style={{width:'200px'}} src="https://image.idus.com/image/files/ccfb6ba6d8b1413cb461246f1ad9de07_320.jpg" alt='logo'/>
                    </div>
                </StyledATagLogoLink>
            </StyledDivBrandLogo>
        )
    }

    const Links = () => {
        return(
            <StyledList>
                {routes.map((prop, index) => {
                    return(
                        <Link key={prop}>
                            <StyledATagNavigationLink href={prop.path}>
                                <StyledListItem button>
                                    {typeof prop.icon === 'string' ? (
                                        <Icon>
                                            {prop.icon}
                                        </Icon>
                                    ) : (
                                        <StyledNavIcon {...prop}/>
                                    )}
                                    <StyledListItemText
                                        primary={prop.name}
                                        disableTypography={true}
                                    />
                                </StyledListItem>
                            </StyledATagNavigationLink>
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
                onMouseOver={onMouseOverMiniActive}
                onMouseOut={onMouseOutMiniActive}
                anchor="left"
                variant="permanent"
                open
                miniActive={miniActive && props.miniActive ? true : false}
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
                open={open}
                onClose={handleDrawerToggle}
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

Sidebar.prototype = {
    handleDrawerToggle: PropTypes.func,
    open: PropTypes.bool,
}

export default Sidebar;
