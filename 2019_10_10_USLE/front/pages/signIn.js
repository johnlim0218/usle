import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Field, Form, FormSpy } from 'react-final-form';
import { email, required } from '../form/validation';
import Typography from '../components/Typography';
import RFTextField from '../form/RFTextField';
import AppForm from '../views/AppForm';
import FormFeedback from '../form/FormFeedback';
import FormButton from '../form/FormButton';

const StyledForm = styled.form`
    margin-top: ${props => props.theme.spacing(6)}px;
`
const StyledFormButton = styled(FormButton)`
    margin-top: ${props => props.theme.spacing(3)}px;
    margin-bottom: ${props => props.theme.spacing(2)}px;
`;

const SignIn = () => {
    const [sent, setSent] = useState(false);
    
    const validate = (values) => {
        const errors = required(['email', 'password'], values);
        if(!errors.email){
            const emailError = email(values.email, values);
            if(emailError) {
                errors.email = email(values.email, values);
            }
        }
        return errors;
    }
    
    const onSubmit = () => {
        setSent(true);
    };

    return(
        <AppForm>
            <Typography gutterBottom variant="h3" marked="center" align="center">
                Sign In
            </Typography>
            <Typography variant="body2" align="center">
                {'Not a member yet? '}
                <Link href="/signUp" align="center" underline="always">
                    Sign up here
                </Link>
            </Typography>
            <Form 
                onSubmit={onSubmit}
                // subscription 속성은 true로 설정한 대상을 바라보게 한다.
                subscription={{ submitting: true }}
                validate={validate}
                render= {({ handleSubmit, submitting }) => (
                    
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate>
                        <Field 
                            autoComplete="email"
                            autoFocus
                            component={RFTextField}
                            disabled={submitting || sent}
                            fullWidth
                            label="Email"
                            margin="normal"
                            name="email"
                            required
                            size="large"
                            noBorder
                        />
                        <Field
                            autoComplete="current-password"
                            component={RFTextField}
                            disabled={submitting || sent}
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            required
                            size="large"
                            type="password"
                            noBorder
                        />
                        
                        <FormSpy
                            subscription={{ submitError: true}}
                        >
                            {({ submitError }) => (
                                
                                submitError ? (
                                <FormFeedback error>
                                    {submitError}
                                </FormFeedback>
                                ) : null
                            )}
                        </FormSpy>
                        <StyledFormButton
                            type="submit"
                            disabled={submitting || sent}
                            size="large"
                            color="secondary"
                            fullWidth
                        >
                            {submitting || sent ? 'In progress…' : 'Sign In'}
                        </StyledFormButton>
                    </StyledForm>
                )}/>
                
            
        </AppForm>
    )
}

export default SignIn;