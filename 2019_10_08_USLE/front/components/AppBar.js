import React, { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/icons/Menu";

const appBar = css`
    display: flex;
    border: 0;
    border-radius: 3px;
    padding: 0.625rem 0;
    margin-bottom: 20px;
    color: #555;
    width: 100%;
    background-color: #fff;
    transition: all 150ms ease 0s;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: flex-start;
    position: relative;
    z-index: unset;
`;
const absolute = css`
    position: absolute;
    z-index: 1100
`;
const fixed = css`
    position: fixed
    z-index: 1100
`;
const StyledAppBar = styled(AppBar)`
    ${appBar}
`

const StyledToolBar = styled(Toolbar)`
    ${props => props.theme.container};
    min-height: 50px;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-wrap: nowrap;
`;
const StyledTitle = styled(Button)`
    line-height: 30px;
    font-size: 18px;
    border-radius: 3px;
    text-transform: none;
    color: inherit;
    padding: 8px 16px;
    letter-spacing: unset;
    &:hover &:focus: {
        color: inherit;
        background: transparent;
    }
`;
const StyledDivLeftLink = styled.div`
    flex: 1;
`;
const StyledDrawer = styled(Drawer)`
    border: none;
    bottom: 0;
    transition-property: top, bottom, width;
    transition-duration: .2s, .2s, .35s;
    transition-timing-function: linear, linear, ease;
    width: drawer-width;
    position: fixed;
    display: block;
    top: 0;
    height: 100vh;
    right: 0;
    left: auto;
    visibility: visible;
    overflow-y: visible;
    border-top: none;
    text-align: left;
    padding-right: 0;
    padding-left: 0;
}
`;
const StyledDivAppResponsive = styled.div`
    margin: 20px 10px;
`;

const ModifiedAppBar = ({ leftLinks, rightLinks, ...props }) => {
    
    const [ mobileOpen, setMobileOpen ] = useState(false);
   
    const handleDrawerToggle = useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen]);


    return(
        <StyledAppBar elevation={0} {...props}>
            <StyledToolBar>
                <StyledTitle>USLE</StyledTitle>
                <StyledDivLeftLink>
                <Hidden smDown implementation="css">
                    {leftLinks}
                </Hidden>
                </StyledDivLeftLink>
                <Hidden smDown implementation="css">
                    {rightLinks}
                </Hidden>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </StyledToolBar>
            <Hidden mdUp implementation="js">
                <StyledDrawer
                    variant="temporary"
                    anchor={"right"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    >
                    <StyledDivAppResponsive>
                        {leftLinks}
                        {rightLinks}
                    </StyledDivAppResponsive>
                </StyledDrawer>
            </Hidden>
        </StyledAppBar>
    )
}

export default ModifiedAppBar;