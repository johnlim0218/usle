import React from 'react';

import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ProductItem from '../components/ProductItem';
import { dummyItem } from '../dummy/dummy';

const StyledContainer = styled(Container)`
    padding-top: ${props => props.theme.spacing(8)}px;
    padding-bottom: ${props => props.theme.spacing(8)}px;
`

const ShowAll = () => {
    return(
        <StyledContainer>
            <Grid container spacing={4}>
                {dummyItem.map((item, index) => (
                    <Grid item key={item} xs={12} sm={6} md={4}>
                        <ProductItem
                            item={item}
                        />
                    </Grid>
                ))}
            </Grid>
        </StyledContainer>
    )
}

export default ShowAll;