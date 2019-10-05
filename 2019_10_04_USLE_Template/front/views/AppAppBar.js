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
      fontSize: 24,
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    left: {
      flex: 1,
    },
    leftLinkActive: {
      color: theme.palette.common.white,
    },
    right: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
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
    ${({ theme }) => {
        const classses = styles(theme);
        return{
            ...classses.left,
        }
    }}
`;

const StyledRightDiv = styled.div`
    ${({ theme }) => {
        const classses = styles(theme);
        return{
            ...classses.right,
        }
    }}
`;

const StyledTitle = styled.a`
    ${({ theme }) => {
        const classses = styles(theme);
        return{
            ...classses.title,
        }
    }}
`;
const StyledSignin = styled.a`
    ${({ theme }) => {
        const classses = styles(theme);
        return{
            ...classses.rightLink,
        }
    }};
`;

const StyledSignup = styled.a`
    ${({ theme }) => {
        const classses = styles(theme);
        return{
            ...classses.rightLink,
        }
    }};
    ${({ theme }) => {
        const classses = styles(theme);
        return{
            ...classses.linkSecondary,
        }
    }};
`;

const StyledToolBar = styled(ModifiedToolBar)`
    ${({ theme }) => {
        const classses = styles(theme);
        return{
            ...classses.toolbar,
        }
    }}
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