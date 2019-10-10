import React from 'react';

import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Typography from '../components/Typography';

const StyledCard = styled(Card)`
    height: 100%;
    display: flex;
    flex-direction: column;
`
// 16:9
const StyledCardMedia = styled(CardMedia)`
    padding-top: 56.25%; 
`;

const StyledCardContent = styled(CardContent)`
    flex-grow: 1;
`

const ProductItem = ({ item, ...props }) => {
    return(
        <StyledCard>
            <StyledCardMedia
                image="https://source.unsplash.com/random"
                title="Image title"
            />
            <StyledCardContent>
                <Typography 
                    gutterBottom 
                    variant='h4' 
                    component='h2'>
                        {item.itemName}
                </Typography>
                <Typography>
                    ￦{item.itemPrice}
                </Typography>
            </StyledCardContent>
        </StyledCard>
    )
}

export default ProductItem;