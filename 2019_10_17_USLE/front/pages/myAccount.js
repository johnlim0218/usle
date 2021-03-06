import React, { useState, useCallback, useRef, useEffect, focus } from 'react';
import styled from 'styled-components';
import { Field, Form, FormSpy } from 'react-final-form';

import Typography from '../components/Typography';
import Button from '../components/Button';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import AppForm from '../views/AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';

import { StyledDivMain, StyledDivContainer } from '../pages/product';
import { StyledFormButton } from '../pages/signIn';

const StyledForm = styled.form`
    margin-top: ${props => props.theme.spacing(3)}px;
`

const StyledDivFormInner = styled.div`
    margin-top: ${props => props.theme.spacing(6)}px;
`;

const StyledGridItemZIPCodeButton = styled(GridItem)`
    display: flex;
    align-items: center;
`;
const StyledButtonSearchingAddress = styled(Button)`
    border: 1px solid;
`


const MyAccount = () => {
    const [sent, setSent] = useState(false);
    const [zipCodeState, setZipCodeState] = useState('');
    const [addressState, setAddressState] = useState('');
    const [addressDetailState, setAddressDetailState] = useState('');

    const addressLayer = useRef();

    const validate = values => {
        const errors = required(['name', 'phone', 'email', 'zipcode', 'address', 'addressDetail'], values);
        if(!errors.email) {
            const emailError =email(values.email, values);
            if(emailError) {
                errors.email = email(values.email, values);
            }
        }
        return errors;
    }
    const onClickSearchingAddress = useCallback(() => {
        
        const element_layer = addressLayer.current;

        let currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

        new window.daum.Postcode({
           
            oncomplete: (data) => {
                let addr = '';
                let extraAddr = '';

                 //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                 if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    // document.getElementById("sample6_extraAddress").value = extraAddr;
                    setAddressDetailState(extraAddr);
                } else {
                    // document.getElementById("sample6_extraAddress").value = '';
                }
                
                setZipCodeState(data.zonecode);
                setAddressState(addr);

                element_layer.style.display='none';
                document.body.scrollTop = currentScroll;

            },
            width : '100%',
            height : '100%',
            maxSuggestItems : 5
        }).embed(element_layer);

        element_layer.style.display = 'block';

        () => {
            const width = 300;
            const height = 400;
            const borderWidth = 5;

            element_layer.style.width = width + 'px';
            element_layer.style.height = height + 'px';
            element_layer.style.borderWidth = borderWidth + 'px';

            element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
            element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
        }

    }, [zipCodeState, addressState, addressDetailState]);
    
    const foldDaumPostcode = (e) => {
        e.preventDefault;
        const element_layer = addressLayer.current;
        element_layer.style.display = 'none';
    };

    const onSubmit = useCallback(() => {
        setSent(false);
    },[sent])

    return(
        <div>
            <StyledDivMain>
                <StyledDivContainer>

                </StyledDivContainer>
                <Form
                    onSubmit={onSubmit}
                    subscription={{ submitting: true}}
                    validate={validate}
                    render={({ handleSubmit, submitting }) => (
                        <StyledForm
                            onSubmit={handleSubmit}
                            noValidate>
                            <AppForm myAccount>
                                <Typography variant="h4">My Account</Typography>
                                <StyledDivFormInner>
                                    <GridContainer myAccount>
                                        <Field
                                            component={RFTextField}   
                                            autoComplete="ID"
                                            label="ID"
                                            name="userId"
                                            required
                                            size="large"
                                            disabled
                                            noBorder={false}
                                        />
                                    </GridContainer>
                                    <GridContainer myAccount>
                                        <GridItem left sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Password"
                                                label="Password"
                                                name="password"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                            />
                                        </GridItem>  
                                        <GridItem right sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Check Password"
                                                label="Check Password"
                                                name="checkPassword"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                            />
                                        </GridItem> 
                                    </GridContainer>
                                    <GridContainer myAccount>
                                        <Field
                                            component={RFTextField}   
                                            autoComplete="Name"
                                            label="Name"
                                            name="name"
                                            required
                                            size="large"
                                            noBorder={false}
                                        />
                                    </GridContainer>
                                    <GridContainer myAccount>
                                        <GridItem left sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Phone"
                                                label="Phone"
                                                name="phone"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                            />
                                        </GridItem>  
                                        <GridItem right sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Email"
                                                label="Email"
                                                name="email"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                            />
                                        </GridItem> 
                                    </GridContainer>
                                    <GridContainer checkout>
                                        <GridItem left sm={6}>
                                            <Field
                                                component={RFTextField} 
                                                autoComplete="ZIP code"
                                                label="ZIP code"
                                                name="zipcode"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                                initialValue={zipCodeState}
                                            />
                                        </GridItem>
                                       <StyledGridItemZIPCodeButton right sm={6}>
                                            <StyledButtonSearchingAddress 
                                                onClick={onClickSearchingAddress}>
                                                Searching Address
                                            </StyledButtonSearchingAddress>
                                            <div 
                                                ref={addressLayer} 
                                                style={{display:'none', position:'absolute', top:0, left:0, width:'400px', height:'500px', overflow:'hidden', zIndex:'1', overflowScrolling:'touch'}}>
                                               <img 
                                                    src="//t1.daumcdn.net/postcode/resource/images/close.png" style={{cursor:'pointer', position:'absolute', right:0, top:0, zIndex:'100'}} 
                                                    alt="접기 버튼" 
                                                    onClick={foldDaumPostcode}/>    
                                            </div>
                                        </StyledGridItemZIPCodeButton> 
                                    </GridContainer>
                                    <Field
                                        component={RFTextField}   
                                        autoComplete="Address"
                                        label="Address"
                                        name="address"
                                        fullWidth
                                        required
                                        size="large"
                                        noBorder={false}
                                        initialValue={addressState}
                                    />
                                    <Field
                                        component={RFTextField}
                                        autoComplete="AddressDetail"
                                        label="AddressDetail"
                                        name="addressDetail"
                                        fullWidth
                                        required
                                        size="large"
                                        noBorder={false}
                                        initialValue={addressDetailState}
                                    />
                                </StyledDivFormInner>
                                <FormSpy
                                    subscription={{ submitError:true }}
                                    render={({ submitError }) => (
                                        submitError ? (
                                        <FormFeedback error>
                                            {submitError}
                                        </FormFeedback>
                                        ) : null
                                )}/>
                                <StyledFormButton
                                    type="submit"
                                    disabled={submitting || sent}
                                    size="large"
                                    color="secondary"
                                    fullWidth
                                    >
                                    {submitting || sent ? 'In progress…' : 'Submit'}
                                </StyledFormButton>
                            </AppForm>
                        </StyledForm>
                    )}
                />
            </StyledDivMain>
        </div>
    )
}

export default MyAccount;