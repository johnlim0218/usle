import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Router from 'next/router';
import styled from 'styled-components';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import Tooltip from '../components/Tooltip';

import Typography from '../components/Typography'
import { StyledDivMain, StyledDivContainer } from '../pages/product';

import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import Table from '../components/Table';
import Button from '../components/Button';

import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';

import { imgSrcUrl } from '../components/ProductItemList';

import { LOAD_MY_ORDER_REQUEST } from '../reducers/userReducer';
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

const MyPage = () => {
    const [qty, setQty] = useState(1);
    const { me, myOrderList } = useSelector(state => state.userReducer);
    
    useEffect(() => {
        if(!me){
            Router.push('/');
        }
        console.log(myOrderList);
    }, [me]);

    return(
        <div>
            <StyledDivMain>
                <StyledDivContainer>
                   <Card plain>
                       <CardBody plain>
                           <Typography variant="h4">Order History</Typography>
                           <Table
                                tableHead={[
                                    {id:0, name:""},
                                    {id:1, name:"PRODUCT"},
                                    {id:2, name:"ORDER NUMBER"},
                                    {id:3, name:"ORDERED DATE"},
                                    {id:4, name:"PRICE(QTY)"},
                                    {id:5, name:"STATUS"},
                                ]}
                                tableData={
                                    myOrderList.length !== 0 ? (myOrderList.map((value, index) => (([
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
                                                {value.Order.orderRegNum}
                                            </span>,
                                            <span key={value.id}>
                                                {value.Order.createdAt}
                                            </span>,
                                            <span key={value.id}>
                                                <StyledTdNumberSmall>￦ {value.amount} ({value.quantity})</StyledTdNumberSmall>
                                            </span>,
                                            <Tooltip
                                                key={value.id}
                                                id="close1"
                                                title="Shipping tracking"
                                                placement="right"
                                            >
                                                <Button size="small">
                                                    {"Tracking"}
                                                </Button>
                                            </Tooltip>
                                        ]))
                                    ))
                                    :
                                    (
                                        {
                                            colspan: "6",
                                            content: (
                                                <div>
                                                    EMPTY
                                                </div>
                                            )
                                        }
                                    )
                                }
                                
                            />
                       </CardBody>
                   </Card>
                </StyledDivContainer>
            </StyledDivMain>

        </div>
    )
}

MyPage.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_MY_ORDER_REQUEST,
    });
};

export default MyPage;


