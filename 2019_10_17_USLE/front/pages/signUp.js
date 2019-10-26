import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';


import { Field, Form, FormSpy } from 'react-final-form';

import { SIGN_UP_REQUEST } from '../reducers/userReducer';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Typography from '../components/Typography';
import CheckBox from '../components/CheckBox';
import AppForm from '../views/AppForm';
import { email, checkPassword, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';

const StyledForm = styled.form`
    margin-top: ${props => props.theme.spacing(6)}px;
`
const StyledFormButton = styled(FormButton)`
    margin-top: ${props => props.theme.spacing(3)}px;
    margin-bottom: ${props => props.theme.spacing(2)}px;
`;

const SignUp = () => {
    const [sent, setSent] = React.useState(false);
    const dispatch = useDispatch();

    const validate = values => {
        const errors = required(['nickname', 'email', 'password', 'checkPassword', 'terms'], values);
        if (!errors.email) {
            const emailError = email(values.email, values);
            if (emailError) {
                errors.email = email(values.email, values);
            }
        }
        if(!errors.password && !errors.checkPassword) {
            const equalPassword = checkPassword(values.password, values.checkPassword);
            if(equalPassword) {
                errors.checkPassword = checkPassword(values.password, values.checkPassword);
            }
        }
        return errors;
    };
    
    const onSubmit = useCallback((values) => {
        setSent(true);

        dispatch({
            type: SIGN_UP_REQUEST,
            data: values,
        });
       
    }, [setSent]);

    return(
        <AppForm signUp>
            <Typography gutterBottom variant="h3" marked="center" align="center">
                Sign Up
            </Typography>
            <Typography variant="body2" align="center">
                <Link href="/signIn" align="center" underline="always">
                    Already have an account?
                </Link>
            </Typography>
            <Form
                onSubmit={onSubmit}
                subscription={{ submitting: true, values: true }}
                validate={validate}
                render={({ handleSubmit, submitting, values }) => (
                    <StyledForm
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <Field
                            autoComplete="Email"
                            component={RFTextField}
                            disabled={submitting || sent}
                            fullWidth        
                            label="Email"
                            margin="normal"
                            name="email"
                            required
                            size="large"
                            noBorder={false}
                        />
                        <Field
                            component={CheckBox}
                            disabled={submitting || sent}
                            fullWidth        
                            label="Mailing Service."
                            margin="normal"
                            name="mailing"
                            size="large"
                            noBorder={false}
                        />
                         <GridContainer signUp>
                            <GridItem left sm={6}>
                                <Field
                                    type='password'
                                    autoComplete="Password"
                                    component={RFTextField}
                                    disabled={submitting || sent}
                                    fullWidth        
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    required
                                    size="large"
                                    noBorder={false}
                                />
                            </GridItem>
                            <GridItem right sm={6}>
                                <Field
                                    type='password'
                                    autoComplete="Check Password"
                                    component={RFTextField}
                                    disabled={submitting || sent}
                                    fullWidth        
                                    label="Check Password"
                                    margin="normal"
                                    name="checkPassword"
                                    required
                                    size="large"
                                    noBorder={false}
                                />
                            </GridItem>
                        </GridContainer>    
                        <Field
                            autoComplete="Nickname"
                            component={RFTextField}
                            disabled={submitting || sent}
                            fullWidth        
                            label="Nickname"
                            margin="normal"
                            name="nickname"
                            required
                            size="large"
                            noBorder={false}
                        />
                        <Field
                            component={CheckBox}
                            disabled={submitting || sent}
                            fullWidth        
                            label="I agree to the terms and conditions."
                            margin="normal"
                            name="terms"
                            required
                            size="large"
                            noBorder={false}
                        />
                        <FormSpy
                            subscription={{ submitError : true}}
                            render= {({ submitError }) => (
                                submitError ? (
                                    <FormFeedback error>
                                        {submitError}
                                    </FormFeedback>
                                ) : null
                            )}
                        />
                        <StyledFormButton
                            type='submit'
                            disabled={submitting || sent}
                            color="secondary"
                            fullWidth
                        >
                            {submitting || sent ? 'In progress...' : 'Sign Up'}
                        </StyledFormButton>
                    </StyledForm>
                )}
            />
        </AppForm>
    )
}

export default SignUp;