import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { Field, Form, FormSpy } from 'react-final-form';

import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Typography from '../components/Typography';
import CheckBox from '../components/CheckBox';
import AppForm from '../views/AppForm';
import { email, checkPassword, readTerm, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import { SIGN_UP_REQUEST } from '../reducers/userReducer';
import { sign } from 'crypto';

const StyledForm = styled.form`
    margin-top: ${props => props.theme.spacing(6)}px;
`
const StyledFormButton = styled(FormButton)`
    margin-top: ${props => props.theme.spacing(3)}px;
    margin-bottom: ${props => props.theme.spacing(2)}px;
`;

const SignUp = () => {
    const [term, setTerm] = useState(false);
    const [mailing, setMailing] = useState(false);
    const { me, isSigningUp, signUpErrorReason, signUpResult } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // 로그인 성공
        if(me){
            Router.push('/');
        }
    }, [me]);

    useEffect(() =>{
        // 회원가입 성공
        if(signUpResult){
            Router.push('/');
        }
    }, [signUpResult]);

    const validate = values => {
        const errors = required(['nickname', 'email', 'password', 'checkPassword', 'term'], values);
        
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

    const onClickMailing = useCallback(() => {
        setMailing(!mailing);
    }, [mailing]);

    const onClickTerm = useCallback(() => {
        setTerm(!term);
    }, [term]);

    const onSubmit = useCallback((values) => {
        dispatch({
            type: SIGN_UP_REQUEST,
            data: values,
        });
        
    }, []);

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
                        noValidate
                    >
                        <Field
                            autoComplete="Email"
                            component={RFTextField}
                            disabled={submitting || isSigningUp}
                            fullWidth        
                            label="Email"
                            margin="normal"
                            name="email"
                            required
                            size="large"
                            noBorder={false}
                        />
                        <Field
                            type="checkbox"
                            initialValue={mailing}
                            onClick={onClickMailing}
                            component={CheckBox}
                            disabled={submitting || isSigningUp}
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
                                    disabled={submitting || isSigningUp}
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
                                    disabled={submitting || isSigningUp}
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
                            disabled={submitting || isSigningUp}
                            fullWidth        
                            label="Nickname"
                            margin="normal"
                            name="nickname"
                            required
                            size="large"
                            noBorder={false}
                        />
                        <Field
                            type="checkbox"
                            initialValue={term}
                            onClick={onClickTerm} 
                            component={CheckBox}
                            disabled={submitting || isSigningUp}
                            fullWidth        
                            label={<>
                                        I agree to the{" "}
                                        <a href="#pablo">terms and conditions</a>.
                                    </>}
                            margin="normal"
                            name="term"
                            required
                            size="large"
                            noBorder={false}
                        />
                        <StyledFormButton
                            type='submit'
                            disabled={submitting || isSigningUp}
                            color="secondary"
                            fullWidth
                        >
                            {submitting || isSigningUp ? 'In progress...' : 'Sign Up'}
                        </StyledFormButton>
                        <FormSpy
                            subscription={{ submitError : true}}
                            render= {({ submitError }) => (
                                signUpErrorReason !== '' ? (
                                    <FormFeedback error>
                                        {signUpErrorReason}
                                    </FormFeedback>
                                ) : null
                            )}
                        />
                    </StyledForm>
                )}
            />
        </AppForm>
    )
}

export default SignUp;