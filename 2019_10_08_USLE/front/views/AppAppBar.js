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

import { Field, Form, FormSpy } from 'react-final-form';
import { email, required } from '../form/validation';
import TextField from '../components/TextField';
import RFTextField from '../form/RFTextField';

import ModifiedAppBar from '../components/AppBar';

const StyledList = styled(List)`
    font-size: 14px;
    margin: 0;
    padding-left: 0;
    list-style: none;
    padding-top: 0;
    padding-bottom: 0;
    color: inherit;
`
const StyledListItem = styled(ListItem)`
    float: left;
    color: inherit;,
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    &:after : {
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
    &:hover &:focus : {
        color: inherit;
        background: rgba(200, 200, 200, 0.2)
    },
    ${breakpoint('md')` 
        width: calc(100% - 30px);
        margin-left: 15px;
        margin-bottom: 8px;
        margin-top: 8px;
        text-align: left;
        & > span:first-child :{
            justify-content: flex-start;
        }
    `};
`;

const AppAppBar = ({ ...props }) => {
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
            leftLinks={
                <StyledList>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                            Link
                        </StyledButton>
                    </StyledListItem>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                         Link
                        </StyledButton>
                    </StyledListItem>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                         Link
                        </StyledButton>
                    </StyledListItem>
                </StyledList>
            }
            rightLinks={
                <div>
                  
            {/* <CustomInput
              white
              inputRootCustomClasses={classes.inputRootCustomClasses}
              formControlProps={{
                className: classes.formControl
              }}
              inputProps={{
                placeholder: "Search",
                inputProps: {
                  "aria-label": "Search",
                  className: classes.searchInput
                }
              }}
            /> */}

            {/* <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
            {({ handleSubmit2, submitting }) =>(     
                <form>
                    <Field
                        autoComplete="email"
                        component={RFTextField}
                        disabled={submitting || sent}
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        required
                    />
                    <FormSpy subscription={{ submitError: true }}>
                    {({ submitError }) =>
                        submitError ? (
                            <FormFeedback error>
                              {submitError}
                            </FormFeedback>
                        ) : null
                    }
                    </FormSpy>
                </form>
            )}
            </Form> */}
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