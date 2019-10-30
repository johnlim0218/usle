import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';

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
    color: gray;
    border: 0;
    border-radius: 3px;
    padding: 10px 0;
    transition: all 150ms ease 0s;
    min-height: 50px;
    display: block;
`
const StyledToolbar = styled(Toolbar)`
    ${props => props.theme.container}
    min-heignt: 50px;
`
const StyledDivFlex = styled.div`
    flex: 1;
`

const AdminAppBar = () => {
    return (
        <StyledAppBar>
            <StyledToolbar>
                <StyledDivFlex>
                <Button href="#">
                    USLE Admin
                </Button>
                </StyledDivFlex>
            </StyledToolbar>
        </StyledAppBar>
    )
}

export default AdminAppBar;