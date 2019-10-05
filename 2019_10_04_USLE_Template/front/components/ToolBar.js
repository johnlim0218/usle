import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
    root: {
      height: 64,
    },
    rootsm: {
        height: 70,
    }
  });

const ModifiedToolBar = styled(Toolbar)`
    &&{
        ${({ theme }) => {
            const classes = styles(theme);
            return{
                ...classes.root
            }
        }}
        ${breakpoint('sm')`
            ${({ theme }) => {
                const classes = styles(theme);
                return {
                    ...classes.rootsm
                }
            }}
        `}
        
    }
`;

export default ModifiedToolBar;

