import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Search from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Field, Form, FormSpy } from 'react-final-form';
import { email, required } from '../form/validation';
import TextField from '../components/TextField';
import RFTextField from '../form/RFTextField';

import ModifiedAppBar from '../components/AppBar';

const StyeldDivInfoBar = styled.div`
    display: flex;
    
`;
const StyledBreadCrumbs = styled(Breadcrumbs)`
    padding-left: 16px;
    ${breakpoint('md')` 
        padding-left: 100px;
    `};
`;
const StyledPersonIcon = styled(PersonIcon)`
    width: 20px;
    height: 20px; 
`;
const StyledFavoriteIcon = styled(FavoriteIcon)`
    width: 20px;
    height: 20px;
`;
const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
    width: 20px;
    height: 20px;
`;

// ul tag
const StyledList = styled(List)`
    font-size: 14px;
    margin: 0;
    padding-left: 0;
    list-style: none;
    padding-top: 0;
    padding-bottom: 0;
    color: inherit;
`
// li tag
const StyledListItem = styled(ListItem)`
    float: left;
    color: inherit;,
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    &:after {
        width: calc(100% - 30px);
        content: ""
        display: block;
        height: 1px;
        margin-left: 15px;
        background-color: #e5e5e;
    }
    ${breakpoint('md')`
        width: auto;
    `};
`;
// a tag
const StyledButton = styled(Button)`
    color: inherit;
    position: relative;
    padding: 0.9375rem;
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 3px;
    line-height: 20px;
    text-decoration: none;
    margin: 0px;
    display: inline-flex;
    &:hover &:focus {
        color: inherit;
        background: rgba(200, 200, 200, 0.2)
    };
    ${breakpoint('md')` 
        margin-left: 15px;
        margin-bottom: 8px;
        margin-top: 8px;
        text-align: left;
        & > span:first-child {
            justify-content: flex-start;
        }
    `};
`;

const AppAppBar = () => {
    const [sent, setSent] = useState(false);
    const validate = (values) => {
        const errors = required(['firstName', 'lastName', 'email', 'password'], values);
        if (!errors.email) {
          const emailError = email(values.email, values);
          if (emailError) {
            errors.email = email(values.email, values);
          }
        }
        return errors;
    };
    const handleSubmit = () => {
        setSent(true);
    };

    return(
        <ModifiedAppBar
            infoBar={
                <StyeldDivInfoBar>
                    <a>FREE ZERO WASTE + PLASTIC FREE SHIPPING ON ALL USA ORDERS OVER $25*</a>
                    <StyledBreadCrumbs aria-label="breadcrumb">
                        <StyledPersonIcon/>
                            MyAccount
                        <StyledFavoriteIcon/>
                            Favorite
                        <StyledShoppingCartIcon/>
                            ShoppingCart    
                    </StyledBreadCrumbs>
                </StyeldDivInfoBar>
            }
            leftLinks={
                <StyledList>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            color="transparent"
                        >
                         About
                        </StyledButton>
                    </StyledListItem>
                    <StyledListItem>
                        <Link href='/shopAll'>
                            <StyledButton
                                color="transparent"
                            >
                                Shop All 
                            </StyledButton>
                        </Link>
                    </StyledListItem>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            color="transparent"
                        >
                         Link
                        </StyledButton>
                    </StyledListItem>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            color="transparent"
                        >
                         Link
                        </StyledButton>
                    </StyledListItem>
                </StyledList>
            }
            rightLinks={
                <div>
                    <form style={{display: 'flex'}}>
                        <TextField noBorder placeholder="Search"/>
                        <Button justIcon>
                            <Search/>
                        </Button>
                    </form> 
                </div>
            }
        />
    )
}

export default AppAppBar;