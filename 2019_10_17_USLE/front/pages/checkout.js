import React, { useState, useCallback } from 'react';
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

const Cart = () => {
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
                                        fullWidth
                                        required
                                        noBorder
                                    />
                                    <GridContainer spacing={2}>
                                        <GridItem sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Phone"
                                                label="Phone"
                                                name="phone"
                                                fullWidth
                                                required
                                                noBorder
                                            />
                                        </GridItem>  
                                        <GridItem sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Email"
                                                label="Email"
                                                name="email"
                                                fullWidth
                                                required
                                                noBorder
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
                                        fullWidth
                                        required
                                        noBorder
                                    />
                                    <GridContainer spacing={2}>
                                        <GridItem sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Phone"
                                                label="Phone"
                                                name="phone"
                                                fullWidth
                                                required
                                                noBorder
                                            />
                                        </GridItem>  
                                        <GridItem sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Email"
                                                label="Email"
                                                name="email"
                                                fullWidth
                                                required
                                                noBorder
                                            />
                                        </GridItem> 
                                    </GridContainer>
                                    <Field
                                        component={RFTextField}   
                                        autoComplete="ZIP code"
                                        label="ZIP code"
                                        name="zipcode"
                                        fullWidth
                                        required
                                        noBorder
                                    />
                                    <Field
                                        component={RFTextField}   
                                        autoComplete="Address1"
                                        label="Address1"
                                        name="address1"
                                        fullWidth
                                        required
                                        noBorder
                                    />
                                    <Field
                                        component={RFTextField}   
                                        autoComplete="Address2"
                                        label="Address2"
                                        name="address2"
                                        fullWidth
                                        required
                                        noBorder
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

export default Cart;


