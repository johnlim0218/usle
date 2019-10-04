import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Toolbar from '@material-ui/core/Toolbar';

const StyledToolBar = styled(Toolbar)`
    &&{
        height: 64px
        ${breakpoint('sm')`
        height: 70px
        `}
        
    }
`;

const ToolBar = () => {
    
    return(
        <StyledToolBar />
    );

}

export default ToolBar;

