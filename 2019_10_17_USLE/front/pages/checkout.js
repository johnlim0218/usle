import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Field, Form, FormSpy } from 'react-final-form';
import Router from 'next/router';

// import Grid from '@material-ui/core/Grid';
import Typography from '../components/Typography';
import { StyledDivMain, StyledDivContainer } from '../pages/product';
import { StyledFormButton } from '../pages/signIn';
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import Table from '../components/Table';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import AppForm from '../views/AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import { ORDER_REQUEST, MAKE_AMOUNT_PER_ITEM } from '../reducers/orderReducer';

import { imgSrcUrl } from '../components/ProductItemList';
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
const StyledButtonSearchingAddress = styled(Button)`
    border: 1px solid;
`


const CheckOut = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [sent, setSent] = useState(false);
    const [zipCodeState, setZipCodeState] = useState('');
    const [addressState, setAddressState] = useState('');
    const [addressDetailState, setAddressDetailState] = useState('');
    const [term, setTerm] = useState(false);
    const { orderedItemList } = useSelector(state => state.orderReducer);
    
    const addressLayer = useRef();
    const closeButton = useRef();
  
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(!orderedItemList || orderedItemList.length === 0){
    //         Router.push('/cart');
    //     } else {
    //         let tempTotalAmount = 0;
    //         // orderedItemList && orderedItemList.map((orderedItemListValue, orderedItemListIndex) => {
    //         //     orderedItemListValue.ProductInventory.additionalPrice !== 0 ?
    //         //         tempTotalAmount += (orderedItemListValue.ProductInventory.Product.price +
    //         //         orderedItemListValue.ProductInventory.additionalPrice)
    //         //         * orderedItemListValue.quantity
    //         //         : tempTotalAmount += orderedItemListValue.ProductInventory.Product.price        
    //         //         * orderedItemListValue.quantity
    //         // })
    //         orderedItemList.map((value, index) => {
    //             tempTotalAmount += value.amount;
    //         })
            
    //         setTotalAmount(tempTotalAmount);
    //     }

    // }, [orderedItemList]);
    
    useEffect(() => {
        if(!orderedItemList || orderedItemList.length === 0){
            Router.push('/cart');

        } else {
            let tempTotalAmount = 0;
            orderedItemList.map((value, index) => {
                
                let amountPerItem = value.ProductInventory.additionalPrice === 0 
                    ? (value.ProductInventory.Product.price * value.quantity) 
                    : ((value.ProductInventory.Product.price + value.ProductInventory.additionalPrice) * value.quantity)
                   
                dispatch({
                    type: MAKE_AMOUNT_PER_ITEM,
                    data: {
                        id : value.id,
                        amount : amountPerItem,
                    }
                });
                
                tempTotalAmount += amountPerItem;
                setTotalAmount(tempTotalAmount);
            })
        }
        
    }, [orderedItemList]);

    useEffect(() => {
        console.log(orderedItemList);
    }, [orderedItemList]);

    const validate = values => {
        const errors = required(['senderName', 'senderPhone', 'senderEmail', 'receiverName', 'receiverPhone', 'receiverEmail', 'zipcode', 'address', 'addressDetail', 'term'], values);
        if(!errors.senderEmail) {
            const senderEmailError = email(values.senderEmail, values);
            if(senderEmailError) {
                errors.receiverEmail = email(values.senderEmail, values);
            }
        }

        if(!errors.receiverEmail) {
            const receiverEmailError = email(values.receiverEmail, values);
            if(receiverEmailError) {
                errors.receiverEmail = email(values.receiverEmail, values);
            }
        }
        
        return errors;
    }
    
    // 주소 검색(daum 주소 검색 API)
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

    // 약관 동의
    const onClickTerm = useCallback(() => {
        setTerm(!term);
    }, [term]);

    // 구입 양식 제출
    const onSubmit = useCallback((values) => {
        // setSent(false);
        dispatch({
            type: ORDER_REQUEST,
            data: {
                orderedItemList,
                totalAmount,
                values,
            }
        })
    },[orderedItemList, totalAmount])
    
    return(
        <>
            <Helmet
                 script={[{
                    src: "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                }]}
            />
            <div>

            </div>
            <StyledDivMain>
                <StyledDivContainer>
                   <Card plain>
                       <CardBody plain>
                           <Typography variant="h4">Check out</Typography>
                           <Table
                                tableHead={[
                                    {id:0, name:""},
                                    {id:1, name:"PRODUCT"},
                                    {id:2, name:"OPTION"},
                                    {id:3, name:"QTY"},
                                    {id:4, name:"AMOUNT"},
                                ]}
                                tableData={
                                    orderedItemList ? (orderedItemList.map((value, index) => ([
                                            <StyledDivImgContainer key={value.id}>
                                                <img src={value && imgSrcUrl + value.ProductInventory.Product.ProductImages[0].src}/>
                                            </StyledDivImgContainer>,
                                            <span key={value.id}>
                                                {value.ProductInventory.Product.productName}
                                                <br />
                                                <StyledTdNameSmall>
                                                    by {value.ProductInventory.Product.ProductBrand.brandName}
                                                </StyledTdNameSmall>
                                            </span>,
                                            <span key={value.id}>
                                                {value.ProductInventory.ProductOptionSelection0 && <span>{value.ProductInventory.ProductOptionSelection0.ProductOption.optionName} : {value.ProductInventory.ProductOptionSelection0.selectionName}<br/></span>}
                                                {value.ProductInventory.ProductOptionSelection1 && <span>{value.ProductInventory.ProductOptionSelection1.ProductOption.optionName} : {value.ProductInventory.ProductOptionSelection1.selectionName}<br/></span>}
                                                {value.ProductInventory.ProductOptionSelection2 && <span>{value.ProductInventory.ProductOptionSelection2.ProductOption.optionName} : {value.ProductInventory.ProductOptionSelection2.selectionName}<br/></span>}
                                                {value.ProductInventory.ProductOptionSelection3 && <span>{value.ProductInventory.ProductOptionSelection3.ProductOption.optionName} : {value.ProductInventory.ProductOptionSelection3.selectionName}<br/></span>}
                                                {value.ProductInventory.ProductOptionSelection4 && <span>{value.ProductInventory.ProductOptionSelection4.ProductOption.optionName} : {value.ProductInventory.ProductOptionSelection4.selectionName}<br/></span>}
                                                {value.ProductInventory.ProductOptionSelection5 && <span>{value.ProductInventory.ProductOptionSelection5.ProductOption.optionName} : {value.ProductInventory.ProductOptionSelection5.selectionName}<br/></span>}
                                            </span>,
                                            <span key={value.id}>
                                                {value.quantity}
                                            </span>,
                                            <span key={value.id}>
                                                <StyledTdNumberSmall>
                                                    ￦ { value.amount && value.amount }
                                                </StyledTdNumberSmall>
                                            </span>
                                        
                                        ])
                                    ))
                                    :
                                    (
                                        {
                                            colspan: "5",
                                            content: (
                                                <div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                                tableFooter=
                                    {{
                                        purchase: true,
                                        colspan: "3",
                                        amount: (
                                            <span>
                                                <small>￦</small> {totalAmount && totalAmount}
                                            </span>
                                        )
                                    }}
                            />
                       </CardBody>
                   </Card>
                </StyledDivContainer>
                <Form
                    onSubmit={onSubmit}
                    subscription={{ submitting: true}}
                    validate={validate}
                    render={({ handleSubmit, submitting }) => (
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
                                        name="senderName"
                                        required
                                        size="large"
                                        noBorder={false}
                                        disabled={submitting || sent}
                                    />
                                    <GridContainer checkout>
                                        <GridItem left sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Phone"
                                                label="Phone"
                                                name="senderPhone"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                                disabled={submitting || sent}
                                            />
                                        </GridItem>  
                                        <GridItem right sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Email"
                                                label="Email"
                                                name="senderEmail"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                                disabled={submitting || sent}
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
                                        name="receiverName"
                                        required
                                        size="large"
                                        noBorder={false}
                                        disabled={submitting || sent}
                                    />
                                    <GridContainer checkout>
                                        <GridItem left sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Phone"
                                                label="Phone"
                                                name="receiverPhone"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                                disabled={submitting || sent}
                                            />
                                        </GridItem>  
                                        <GridItem right sm={6}>
                                            <Field
                                                component={RFTextField}   
                                                autoComplete="Email"
                                                label="Email"
                                                name="receiverEmail"
                                                required
                                                fullWidth
                                                size="large"
                                                noBorder={false}
                                                disabled={submitting || sent}
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
                                                disabled={submitting || sent}
                                            />
                                        </GridItem>
                                       <StyledGridItemZIPCodeButton right sm={6}>
                                            <StyledButtonSearchingAddress 
                                                onClick={onClickSearchingAddress}
                                                disabled={submitting || sent}>
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
                                        disabled={submitting || sent}
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
                                        disabled={submitting || sent}
                                    />
                                    <Field
                                        component={RFTextField}
                                        label="Comment"
                                        name="comment"
                                        fullWidth
                                        size="large"
                                        noBorder={false}
                                        disabled={submitting || sent}
                                        />
                                    <Field
                                        type="checkbox"
                                        initialValue={term}
                                        onClick={onClickTerm} 
                                        component={CheckBox}
                                        disabled={submitting || sent}
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
                                    {submitting || sent ? 'In progress…' : 'Check Out'}
                                </StyledFormButton>
                            </AppForm>
                        </StyledForm>
                    )}
                />
                
            </StyledDivMain>
            
                                 
        </>
    )
}

export default CheckOut;


