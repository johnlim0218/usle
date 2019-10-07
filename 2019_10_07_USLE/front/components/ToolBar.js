import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Toolbar from '@material-ui/core/Toolbar';

const ModifiedToolBar = styled(Toolbar)`
    &&{
       height: 64px;
        ${breakpoint('sm')`
            height: 70px;
        `};
    }
`;

export default ModifiedToolBar;

