import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ProductItemList from '../components/ProductItemList';
import { dummyItem } from '../dummy/dummy';
import { LOAD_PRODUCTS_REQUEST } from '../reducers/productReducer';

const StyledContainer = styled(Container)`
    padding-top: ${props => props.theme.spacing(8)}px;
    padding-bottom: ${props => props.theme.spacing(8)}px;
`

const ShopAll = () => {
    const { products } = useSelector(state => state.productReducer);
    
    return(
        <StyledContainer>
            <Grid container spacing={4}>
                {products && products.map((item, index) => (
                    <Grid item key={item} xs={12} sm={6} md={4}>
                        <ProductItemList
                            item={item}
                        />
                    </Grid>
                ))}
            </Grid>
        </StyledContainer>
    )
}

ShopAll.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_PRODUCTS_REQUEST,
    })
}

export default ShopAll;