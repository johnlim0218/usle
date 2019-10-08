import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ModifiedAppBar from '../components/AppBar';
import ModifiedToolBar from '../components/Toolbar';

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
    color: ${props => props.theme.palette.common.white};
    margin-left: ${props => props.theme.spacing(3)}px;
    font-size: 16px;
`;

const StyledSignup = styled.a`
    color: ${props => props.theme.palette.secondary.main};
    margin-left: ${props => props.theme.spacing(3)}px;
    font-size: 16px;
`;

const StyledToolBar = styled(ModifiedToolBar)`
    justify-content: space-between;
`;

const AppAppBar = ({ ...props }) => {
    
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