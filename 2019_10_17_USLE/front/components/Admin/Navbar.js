import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styled, {css} from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';
import ViewList from '@material-ui/icons/ViewList'
import MoreVert from '@material-ui/icons/MoreVert';

import Button from '../Button';

const StyledAppBar = styled(AppBar)`
    background-color: transparent;
    box-shadow: none;
    border-bottom: 0;
    margin-bottom: 0;
    position: absolute;
    width: 100%;
    padding-top: 10px;
    z-index: 1029;
    color: #555555;
    border: 0;
    border-radius: 3px;
    padding: 10px 0;
    transition: all 150ms ease 0s;
    min-height: 50px;
    display: block;
`
const StyledToolbar = styled(Toolbar)`
    ${props => props.theme.containerFluid}
    min-height: 50px;
`
const StyledDivSidebarMinimize = styled.div`
    float: left;
    padding: 0 0 0 15px;
    display: block;
    color: gray;
`;
const StyledMiniIcon = css`
    width: 20px;
    height: 17px;
`;

const StyledViewListIcon = styled(ViewList)`
    ${StyledMiniIcon}
`;

const StyledMoreVertIcon = styled(MoreVert)`
    ${StyledMiniIcon}
`;

const StyledDivFlex = styled.div`
    flex: 1;
`

const StyledButtonTitle = styled(Button)`
    line-height: 30px;
    font-size: 18px;
    border-radius: 3px;
    text-transform: none;
    color: inherit;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    margin: 0 !important;
    letter-spacing: unset;
    :hover :focus {
        background: transparent;
    }
`;

const AdminNavBar = (props) => {
    const{ routes, handleDrawerToggle, miniActive, sidebarMinimize, ...others } = props; 
    
    return (
        <StyledAppBar>
            <StyledToolbar>
                <Hidden smDown implementation="css">
                    <StyledDivSidebarMinimize>
                        {miniActive ? (
                            <Button
                                justIcon
                                round
                                color="white"
                                onClick={sidebarMinimize}
                            >
                                <StyledViewListIcon/>
                            </Button>
                        ) : (
                            <Button
                                justIcon
                                round
                                color="white"
                                onClick={sidebarMinimize}
                            >
                                <StyledMoreVertIcon/>
                            </Button>
                        )}
                    </StyledDivSidebarMinimize>
                </Hidden>

                <StyledDivFlex>
                    <StyledButtonTitle href="#">
                        Admin
                    </StyledButtonTitle>
                </StyledDivFlex>
                <Hidden smDown implementation="css">

                    {/* <AdminNavbarLinks/> */}
                </Hidden>
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <Menu/>
                    </IconButton>
                </Hidden>
            </StyledToolbar>
        </StyledAppBar>
    )
}

AdminNavBar.prototype = {
    handleDrawerToggle: PropTypes.func,
    routes: PropTypes.arrayOf(PropTypes.object),
}

export default AdminNavBar;