import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { Field, Form, FormSpy } from 'react-final-form';

import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Typography from '../components/Typography';
import AppForm from '../views/AppForm';
import { email, required } from '../form/validation';
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
    
    const validate = values => {
        const errors = required(['firstName', 'lastName', 'email', 'password'], values);
        if (!errors.email) {
            const emailError = email(values.email, values);
            if (emailError) {
                errors.email = email(values.email, values);
            }
        }
        return errors;
    };

    const onSubmit = useCallback(() => {
        setSent(true);
        // submitError 발생
        setSubmitErrorTest(true);
        setSent(false);
    }, [sent]);

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
                subscription={{ submitting: true }}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <StyledForm
                        onSubmit={handleSubmit}
                        noValidate>
                        <GridContainer signUp>
                            <GridItem left sm={6}>
                                <Field
                                    autoFocus
                                    component={RFTextField}
                                    autoComplete="fname"
                                    fullWidth
                                    label="First name"
                                    name="firstName"
                                    required
                                    size="large"
                                    noBorder={false}
                                />
                            </GridItem>
                            <GridItem right sm={6}>
                                <Field
                                    autoFocus
                                    component={RFTextField}
                                    autoComplete="lname"
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    required
                                    size="large"
                                    noBorder={false}
                                />
                            </GridItem>
                        </GridContainer>    
                        <Field
                            autoComplete="email"
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
                            autoComplete="password"
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