import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import MuiAppBar from '@material-ui/core/AppBar';

const StyledMuiAppBar = styled(MuiAppBar)`
    &&{
        &.MuiToolbar-root {
            color: secondary
        }
    }
`;

const AppBar = ({ props }) => {
    
    return(
        <StyledMuiAppBar>
        
        </StyledMuiAppBar>
    )
}

AppBar.propTypes = {
    classes: propTypes.object.isRequired,
}

export default AppBar;