import React, { useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Field, Form, FormSpy } from 'react-final-form';
// import Grid from '@material-ui/core/Grid';

import Typography from '../components/Typography';
import { StyledDivMain, StyledDivContainer } from './product';
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import Table from '../components/Table';
import Button from '../components/Button';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import AppForm from '../views/AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';

import DaumPostcode from '../components/DaumPostcode';

import { dummyCartData } from '../dummy/dummy';

const StyledDivImgContainer = styled.div`
    width: 120px;
    max-height: 160px;
    overflow: hidden;
    display: block;
    & img {
        width: 100%;
    }
`;
const StyledTdNameSmall = styled.small`
    font-size: 0.75em;
    font-weight: 300;
`;
const StyledTdNumberSmall = styled.small`
    margin-right: 3px;
`;

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
const StyledButton = styled(Button)`
    border: 1px solid;
`


const CheckOut = () => {
    const [qty, setQty] = useState(1);
    const [sent, setSent] = useState(false);

    const validate = values => {
        const errors = required([], values);
        if(!errors.email) {
            const emailError =email(values.email, values);
            if(emailError) {
                errors.email = email(values.email, values);
            }
        }
    }
    
    const onClickSearchingAddress = useCallback(() => {
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
                
                } else {
                    // document.getElementById("sample6_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                // document.getElementById('sample6_postcode').value = data.zonecode;
                // document.getElementById("sample6_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                // document.getElementById("sample6_detailAddress").focus();
            }
        }).open();
    });

    const onSubmit = useCallback(() => {
        setSent(true);
    },[sent])

    return(
        <div>
            <div>

            </div>
            <StyledDivMain>
                <StyledDivContainer>
                   <Card plain>
                       <CardBody plain>
                           <Typography variant="h4">Check out</Typography>
                           <Table
                                tableHead={[
                                    "",
                                    "PRODUCT",
                                    "COLOR",
                                    "SIZE",
                                    "PRICE",
                                    "QTY",
                                    "AMOUNT",
                                ]}
                                tableData={
                                    dummyCartData.map((value, index) => ([
                                            <StyledDivImgContainer>
                                                <img src={value.thumbsnail}/>
                                            </StyledDivImgContainer>,
                                            <span>
                                                <a href="#jacket">
                                                    {value.name}
                                                </a>
                                                <br />
                                                <StyledTdNameSmall>
                                                    by {value.brand}
                                                </StyledTdNameSmall>
                                            </span>,
                                            <span>
                                                {value.color}
                                            </span>,
                                            <span>
                                                {value.size}
                                            </span>,
                                            <span>
                                                <StyledTdNumberSmall>￦ {value.price}</StyledTdNumberSmall>
                                            </span>,
                                            <span>
                                                {qty}
                                            </span>,
                                            <span>
                                                <StyledTdNumberSmall>￦ {value.price * qty}</StyledTdNumberSmall>
                                            </span>
                                        
                                        ])
                                    )
                                }
                                tableFooter=
                                    {{
                                        purchase: true,
                                        colspan: "5",
                                        amount: (
                                          <span>
                                            <small>￦</small> 20,000
                                          </span>
                                        )
                                    }}
                            />
                       </CardBody>
                   </Card>
                </StyledDivContainer>
                <Form
                    onSubmit={onSubmit}
                    subscription={{ submitting: true }}
                    validate={validate}
                    render={({ handleSubmit, submitting}) => (
                        <StyledForm
                            onSubmit={handleSubmit}
                            noValidate>
                            <AppForm checkout>
                                <Typography variant="h6">Contact Information</Typography>
                                <StyledDivFormInner>
                                    <Field
                                        component={RFTextField}   
                                        autoComplete="Name"
                                        label="Name"
                                        name="name"
                                        required
                                        size="large"
                                        noBorder={false}
                                    />
                                    <GridContainer checkout>
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
                                </StyledDivFormInner>
                            </AppForm> 
                            <AppForm checkout>
                                <Typography variant="h6">Shipping Address</Typography>
                                <StyledDivFormInner>
                                    <Field
                                        component={RFTextField}   
                                        autoComplete="Name"
                                        label="Name"
                                        name="name"
                                        required
                                        size="large"
                                        noBorder={false}
                                    />
                                    <GridContainer checkout>
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
                                                id="1234zip"  
                                                autoComplete="ZIP code"
                                                label="ZIP code"
                                                name="zipcode"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                            />
                                       </GridItem>
                                       <StyledGridItemZIPCodeButton right sm={6}>
                                            <StyledButton 
                                                onClick={onClickSearchingAddress}>
                                                Searching Address
                                            </StyledButton>
                                        </StyledGridItemZIPCodeButton> 
                                    </GridContainer>
                                    <Field
                                        component={RFTextField}   
                                        autoComplete="Address1"
                                        label="Address1"
                                        name="address1"
                                        fullWidth
                                        required
                                        size="large"
                                        noBorder={false}
                                    />
                                    <Field
                                        component={RFTextField}   
                                        autoComplete="Address2"
                                        label="Address2"
                                        name="address2"
                                        fullWidth
                                        required
                                        size="large"
                                        noBorder={false}
                                    />
                                </StyledDivFormInner>
                            </AppForm>
                        </StyledForm>
                    )}
                />
            </StyledDivMain>

                                 
        </div>
    )
}

export default CheckOut;


