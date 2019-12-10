import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CheckBox from '@material-ui/core/Checkbox';

import Tooltip from '../components/Tooltip';
import Typography from '../components/Typography';
import { StyledDivMain, StyledDivContainer } from '../pages/product';

import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import Table from '../components/Table';
import Button from '../components/Button';

import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import { imgSrcUrl } from '../components/ProductItemList';

import { dummyCartData } from '../dummy/dummy';
import { LOAD_CART_REQUEST, ADD_QUANTITY, REMOVE_QUANTITY, REMOVE_CART_REQUEST, CONFIRM_CART_QUANTITY_REQUEST } from '../reducers/cartReducer';
import { ORDER_REQUEST } from '../reducers/orderReducer';

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
const StyledAddRemoveButton = styled(Button)`
    padding: 5px 0 !important;
`

const Cart = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [checkedList, setCheckedList] = useState([]);

    const dispatch = useDispatch();
    const { me } = useSelector(state => state.userReducer);
    const { cartList } = useSelector(state => state.cartReducer);
    
    const handleCheckBoxToggle = (value) => {
        const currentIndex = checkedList.indexOf(value);
        const newChecked = [...checkedList];
        if(currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedList(newChecked);
    }
    
    const onClickRemove = useCallback((id) => (e) => {
        e.preventDefault();
        dispatch({
            type: REMOVE_QUANTITY,
            data : {
                id: id,
            }
        })
    }, [cartList]);

    const onClickAdd = useCallback((id) => (e) => {
        e.preventDefault();
        dispatch({
            type: ADD_QUANTITY,
            data : {
                id: id,
            }
        })
    }, [cartList]);

    const onClickConfirmQuantity = useCallback((id) => (e) => {
        e.preventDefault();
        let targetItem = cartList.filter((value) => value.id === id);
        dispatch({
            type: CONFIRM_CART_QUANTITY_REQUEST,
            data: {
                id: id,
                quantity: targetItem[0].quantity,
            }
        })
        calTotalAmount();
    }, [cartList]); 

    const onClickRemoveItem = useCallback((id) => (e) => {
        e.preventDefault();
        dispatch({
            type: REMOVE_CART_REQUEST,
            data: id,
        })
        calTotalAmount();
    }, [cartList]);

    const onClickCompletePurchase = useCallback((e) => {
        
        let purchaseList = [];
        if(checkedList.length === 0) {
            
            return '';
        } else {
            checkedList.map((value, index) => {
               purchaseList.push({
                   ProductInventoryId : cartList.filter(list => list.id === value)[0].ProductInventory.id,
                   quantity : cartList.filter(list => list.id === value)[0].quantity,
                })
            })
        }
        
        
        dispatch({
            type: ORDER_REQUEST,
            data: purchaseList,
        })

    }, [checkedList]);

    const calTotalAmount = () => {
        let tempTotalAmount = 0;
        cartList && cartList.map((cartListValue, cartListIndex) => {
            cartListValue.ProductInventory.additionalPrice !== 0 ?
                tempTotalAmount += (cartListValue.ProductInventory.Product.price +
                cartListValue.ProductInventory.additionalPrice)
                * cartListValue.quantity
                : tempTotalAmount += cartListValue.ProductInventory.Product.price        
                * cartListValue.quantity
        })

        setTotalAmount(tempTotalAmount);
    }
   
    useEffect(() => {
        calTotalAmount();
    }, [])

    return(
        <div>
            <div>

            </div>
            <StyledDivMain>
                <StyledDivContainer>
                   <Card plain>
                       <CardBody plain>
                           <Typography variant="h4">Shopping Cart</Typography>
                           
                           {cartList ?
                                <Table
                                    tableHead={[
                                        {id:0, name:""},
                                        {id:1, name:""},
                                        {id:2, name:"PRODUCT"},
                                        {id:3, name:"OPTION"},
                                        {id:4, name:"PRICE"},
                                        {id:5, name:"QTY"},
                                        {id:6, name:"AMOUNT"},
                                        {id:7, name:""}
                                    ]}
                                    tableData={
                                        cartList && cartList.map((value, index) => ([
                                                <CheckBox 
                                                    key={value.id}
                                                    tabIndex={-1}
                                                    onClick={() => handleCheckBoxToggle(value.id)}
                                                />,
                                                <StyledDivImgContainer key={value.id}>
                                                    <img src={value && imgSrcUrl + value.ProductInventory.Product.ProductImages[0].src}/>
                                                </StyledDivImgContainer>,
                                                <span key={value.id}>
                                                    <a href="#jacket">
                                                        {value.ProductInventory.Product.productName}
                                                    </a>
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
                                                    <StyledTdNumberSmall>
                                                        ￦ {value.ProductInventory.additionalPrice === 0 
                                                            ? (value.ProductInventory.Product.price) 
                                                            : (value.ProductInventory.Product.price + value.ProductInventory.additionalPrice)
                                                            }
                                                    </StyledTdNumberSmall>
                                                </span>,
                                                <span key={value.id}>
                                                    {value.quantity}
                                                    <div>
                                                        <StyledAddRemoveButton onClick={onClickRemove(value.id)}>
                                                            <Remove/>
                                                        </StyledAddRemoveButton>
                                                        <StyledAddRemoveButton onClick={onClickAdd(value.id)}>
                                                            <Add/>
                                                        </StyledAddRemoveButton>
                                                    </div>
                                                    <div>
                                                        <StyledAddRemoveButton onClick={onClickConfirmQuantity(value.id)}>
                                                            Modify
                                                        </StyledAddRemoveButton>
                                                    </div>
                                                </span>,
                                                <span key={value.id}>
                                                    <StyledTdNumberSmall>
                                                        ￦ {value.ProductInventory.additionalPrice === 0 
                                                            ? (value.ProductInventory.Product.price * value.quantity) 
                                                            : ((value.ProductInventory.Product.price + value.ProductInventory.additionalPrice) * value.quantity)
                                                            }
                                                    </StyledTdNumberSmall>
                                                </span>,
                                                <Tooltip
                                                    key={value.id}
                                                    id="close1"
                                                    title="Remove item"
                                                    placement="right"
                                                >
                                                    <Button onClick={onClickRemoveItem(value.id)}>
                                                        <Close/>
                                                    </Button>
                                                </Tooltip>
                                            ])
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
                                            ),
                                            col: {
                                                colspan: "3",
                                                text: (
                                                    checkedList.length !== 0 ? (
                                                        <Link href='/checkout'>
                                                            <Button onClick={onClickCompletePurchase}>
                                                                Complete Purchase <KeyboardArrowRight/>
                                                            </Button>
                                                        </Link>
                                                    ) : (
                                                        <Button onClick={onClickCompletePurchase}>
                                                                Complete Purchase <KeyboardArrowRight/>
                                                        </Button>
                                                    )
                                                )
                                            }
                                        }}
                                /> 
                                :
                                <Table
                                    tableHead={[
                                        {id:0, name:""},
                                        {id:1, name:""},
                                        {id:2, name:"PRODUCT"},
                                        {id:3, name:"OPTION"},
                                        {id:4, name:"PRICE"},
                                        {id:5, name:"QTY"},
                                        {id:6, name:"AMOUNT"},
                                        {id:7, name:""}
                                    ]}
                                    tableData=
                                        {{
                                            colspan: "7",
                                            content: (
                                                <div>
                                                    EMPTY
                                                </div>
                                            )
                                        }}
                                    tableFooter=
                                        {{
                                            purchase: true,
                                            colspan: "3",
                                            amount: (
                                                <span>
                                                    <small>￦ </small>0
                                                </span>
                                            ),
                                            col: {
                                            colspan: "3",
                                            text: (
                                                <Button>
                                                    Complete Purchase <KeyboardArrowRight />
                                                </Button>
                                            )
                                            }
                                        }}
                                />}
                       </CardBody>
                   </Card>
                </StyledDivContainer>
            </StyledDivMain>

        </div>
    )
}

Cart.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_CART_REQUEST,
    })
}

export default Cart;


