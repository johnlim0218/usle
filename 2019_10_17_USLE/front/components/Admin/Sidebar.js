import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        background-color: black;
        border: none;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        
        ${breakpoint('md')`
            width: 260px;
            position: fixed;
            height: 100%;
        `}
        ${breakpoint('xs')`
            width: 260px;
            position: fixed;
            display: block;
            top: 0;
            height: 100vh;
            right: 0;
            left: auto;
            z-index: 1032;
            visibility: visible;
            overflow-y: visible;
            border-top: none;
            text-align: left;
            padding-right: 0px;
            padding-left: 0;
        `
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
        background-color: gray;
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
        background: black
        opacity: .8;
    }
`;


const Sidebar = (props) => {
    console.log('test');

    const Brand = () => {
        return(
            <StyledDivBrandLogo>
                <a href="/">
                    <div>
                        <img alt='logo'/>
                    </div>
                    USLE
                   
                </a>
            </StyledDivBrandLogo>
        )
    }
    return(
    <div>
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
                    Link
                </StyledDivSidebarWrapper>
                <StyledDivBackground/>
            </StyledDrawer>
        </Hidden>

        <Hidden smDown implementation='css'>
            <StyledDrawer
                anchor="left"
                variant="permanent"
                open
            >
                <Brand/>
                <StyledDivSidebarWrapper>
                    Link
                </StyledDivSidebarWrapper>
                <StyledDivBackground/>
            </StyledDrawer>
        </Hidden>
    </div>
    )
}

export default Sidebar;
