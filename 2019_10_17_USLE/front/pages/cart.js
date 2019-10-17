import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import Tooltip from '../components/Tooltip';

import Typography from '../components/Typography';
import { StyledDivMain, StyledDivContainer } from '../pages/product';

import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import Table from '../components/Table';
import Button from '../components/Button';

import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';

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

const Cart = () => {
    const [qty, setQty] = useState(1);

    return(
        <div>
            <div>

            </div>
            <StyledDivMain>
                <StyledDivContainer>
                   <Card plain>
                       <CardBody plain>
                           <Typography variant="h4">Shopping Cart</Typography>
                           <Table
                                tableHead={[
                                    "",
                                    "PRODUCT",
                                    "COLOR",
                                    "SIZE",
                                    "PRICE",
                                    "QTY",
                                    "AMOUNT",
                                    ""
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
                                                <div>
                                                    <Button>
                                                        <Remove/>
                                                    </Button>
                                                    <Button>
                                                        <Add/>
                                                    </Button>
                                                </div>
                                            </span>,
                                            <span>
                                                <StyledTdNumberSmall>￦ {value.price * qty}</StyledTdNumberSmall>
                                            </span>,
                                            <Tooltip
                                                id="close1"
                                                title="Remove item"
                                                placement="right"
                                            >
                                                <Button>
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
                                            <small>￦</small>20,000
                                          </span>
                                        ),
                                        col: {
                                          colspan: "3",
                                          text: (
                                            <Button color="info" round>
                                              Complete Purchase <KeyboardArrowRight />
                                            </Button>
                                          )
                                        }
                                    }}
                            />
                       </CardBody>
                   </Card>
                </StyledDivContainer>
            </StyledDivMain>

        </div>
    )
}

export default Cart;


