import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import AppBar from '../components/AppBar';
import ToolBar, { styles as toolbarStyles } from '../components/Toolbar';

const LeftDiv = styled.div`
    flex: 1;
`;

const RightDiv = styled.div`
    flex: 1;
    display: flex,;
    justify-content: flex-end;
`;

const StyledTitle = styled.a`
    font-size: 24px
`;

const StyledText = styled.a`
    font-size: 16px;
    margin-left: 24px;
`;

const StyledToolBar = styled(Toolbar)`
    &&{
        height: 100px;
        ${breakpoint('sm')`
        height: 70px
        `};
        justify-content: space-between;
    }
`;

const AppAppBar = ({ props }) => {
    
    return(
        <div>
            <MuiAppBar color='white' elevation={0} position='static' {...props}>
                <StyledToolBar>
                    <LeftDiv/>
                    <Link>
                        <StyledTitle>
                            {'USLE'}
                        </StyledTitle>
                    </Link>
                    <RightDiv>
                        <Link>
                            <StyledText>
                                {'SignIn'}
                            </StyledText>
                        </Link>
                        <Link>
                            <StyledText>
                                {'SignUp'}
                            </StyledText>
                        </Link>
                    </RightDiv>
                </StyledToolBar>
            </MuiAppBar>
        </div>
    )
}

export default AppAppBar;