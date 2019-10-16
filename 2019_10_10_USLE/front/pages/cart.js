import React from 'react';
import styled from 'styled-components';
import Typography from '../components/Typography';
import { StyledDivMain, StyledDivContainer } from '../pages/product';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import Table from '../components/Table';
import CartTableData from '../components/CartTableData';

const Cart = () => {
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
                                    "AMOUT",
                                    ""
                                ]}
                                tableData={[
                                [
                                    <CartTableData key={1}/>
                                ],[
                                    <CartTableData key={2}/>
                                ]
                                ]}
                            />
                       </CardBody>
                   </Card>
                </StyledDivContainer>
            </StyledDivMain>

        </div>
    )
}

export default Cart;


