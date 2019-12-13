import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { Field, Form, FormSpy } from 'react-final-form';
import { useCookies } from 'react-cookie';

import { email, required } from '../form/validation';
import Typography from '../components/Typography';
import RFTextField from '../form/RFTextField';
import AppForm from '../views/AppForm';
import FormFeedback from '../form/FormFeedback';
import FormButton from '../form/FormButton';
import { LOG_IN_REQUEST } from '../reducers/userReducer';

const StyledForm = styled.form`
    margin-top: ${props => props.theme.spacing(6)}px;
`
export const StyledFormButton = styled(FormButton)`
    margin-top: ${props => props.theme.spacing(3)}px;
    margin-bottom: ${props => props.theme.spacing(2)}px;
`;

const StyledDivMarginTop = styled.div`
    margin-top: ${props => props.theme.spacing(10)}px;
`

const SignIn = () => {
    const [submitErrorTest, setSubmitErrorTest] = useState(false);
    const { me, isLoggingIn, logInErrorReason } = useSelector(state => state.userReducer);
    const [cartCookies, setCartCookies] = useCookies(['dq45o8w5']);
    const dispatch = useDispatch();
    
    useEffect(() => {
        // 로그인 성공
        if(me){
            Router.push('/');
        }
    }, [me]);

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

    const onSubmit = useCallback((values) => {
        dispatch({
           type: LOG_IN_REQUEST,
           data: values,
        })
        
    }, []);

    const onClickNonMemberCheckOut = useCallback(() => {
        if(cartCookies.dq45o8w5.length === 0) {
            
            return '';
        };
            Router.push('/checkout')

    }, []);
    
    return(
        
        <AppForm signIn>
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
                // subscriptrion - true로 설정한 Field의 속성 값이 바뀔 때 마다 렌더링 해준다.
                subscription={{ submitting: true }}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate>
                        <Field
                            autoComplete="email"
                            autoFocus
                            component={RFTextField}
                            disabled={submitting || isLoggingIn}
                            fullWidth
                            label="Email"
                            margin="normal"
                            name="email"
                            required
                            size="large"
                            noBorder={false}
                        />
                        <Field
                            autoComplete="current-password"
                            component={RFTextField}
                            disabled={submitting || isLoggingIn}
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            required
                            size="large"
                            type="password"
                            noBorder={false}
                        />
                        <StyledFormButton
                            type="submit"
                            disabled={submitting || isLoggingIn}
                            size="large"
                            color="secondary"
                            fullWidth
                        >
                            {submitting || isLoggingIn ? 'In progress…' : 'Sign In'}
                        </StyledFormButton>
                        {/* FormSpy는 기본적으로 form을 subscript하고 있다? */}
                        <FormSpy
                            subscription={{ submitError:true }}
                            render={({ submitError }) => (
                                logInErrorReason !=='' ? (
                                    <FormFeedback error>
                                        {logInErrorReason}
                                    </FormFeedback>
                                ) : null
                        )}/>
                    </StyledForm>
                )}/>
                <Typography align="center">
                    <Link href='/forgotpassword'>
                        <a>
                            Forgot Password?
                        </a>
                    </Link>
                </Typography>

                <StyledDivMarginTop>
                    <Typography gutterBottom variant="h4" marked="center" align="center">
                        NonMember CheckOut
                    </Typography>
                                        
                    <StyledFormButton
                        type="submit"
                        onClick={onClickNonMemberCheckOut}
                        size="large"
                        color="secondary"
                        fullWidth
                    >
                      {'NonMember CheckOut'}
                    </StyledFormButton>
                </StyledDivMarginTop>
        </AppForm>
        
    )
}

export default SignIn;