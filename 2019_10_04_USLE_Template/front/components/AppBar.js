import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import MuiAppBar from '@material-ui/core/AppBar';

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
  },
});

const StyledMuiAppBar = styled(MuiAppBar)`
    &.MuiToolbar-root {
        ${({ theme }) => {
            const classes = styles(theme);
            return{
                ...classes.root,
            }
        }};
    }
`;

const ModifiedAppBar = ({ ...props }) => {
    return(
        <StyledMuiAppBar elevation={0} position="static" {...props}/>
    )
}

export default ModifiedAppBar;