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
    const { me } = useSelector(state => state.userReducer);

    useEffect(() => {
        if(!me){
            Router.push('/');
        }
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
                                    "",
                                    "PRODUCT",
                                    "COLOR",
                                    "SIZE",
                                    "PRICE",
                                    "QTY",
                                    "AMOUNT",
                                    "SHIPPING"
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
                                            </span>,
                                            <Tooltip
                                                id="close1"
                                                title="Shipping tracking"
                                                placement="right"
                                            >
                                                <Button size="small">
                                                    {"Tracking"}
                                                </Button>
                                            </Tooltip>
                                        ])
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


