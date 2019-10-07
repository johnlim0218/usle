import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ModifiedAppBar from '../components/AppBar';
import ModifiedToolBar from '../components/Toolbar';

const styles = theme => ({
    title: {
      
    },
    toolbar: {
      
    },
    left: {
      
    },
    leftLinkActive: {
      color: theme.palette.common.white,
    },
    right: {
      
    },
    rightLink: { 
      fontSize: 16,
      color: theme.palette.common.white,
      marginLeft: theme.spacing(3),
    },
    linkSecondary: {
      color: theme.palette.secondary.main,
    },
    // placeholder: toolbarStyles(theme).root,
  });

const StyledLeftDiv = styled.div`
    flex: 1;
`;
const StyledRightDiv = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`;
const StyledTitle = styled.a`
    font-size: 24px;
`;
const StyledSignin = styled.a`
    ${({ theme }) => {
        return{
            color: theme.palette.common.white,
            marginLeft: theme.spacing(3),
        }
    }};
    font-size: 16px;
`;

const StyledSignup = styled.a`
    ${({ theme }) => {
        const classses = styles(theme);
        return{
            color: theme.palette.common.white,
            marginLeft: theme.spacing(3),
        }
    }};
    ${({ theme }) => {
        return{
            color: theme.palette.secondary.main,
        }
    }};
    font-size: 16px;
`;

const StyledToolBar = styled(ModifiedToolBar)`
    justify-content: space-between;
`;

const AppAppBar = ({ props }) => {
    
    return(
        <div>
            <ModifiedAppBar color='white' elevation={0} position='static' {...props}>
                <StyledToolBar>
                    <StyledLeftDiv/>
                    <Link>
                        <StyledTitle>
                            {'USLE'}
                        </StyledTitle>
                    </Link>
                    <StyledRightDiv>
                        <Link>
                            <StyledSignin>
                                {'SignIn'}
                            </StyledSignin>
                        </Link>
                        <Link>
                            <StyledSignup>
                                {'SignUp'}
                            </StyledSignup>
                        </Link>
                    </StyledRightDiv>
                </StyledToolBar>
            </ModifiedAppBar>
        </div>
    )
}

export default AppAppBar;