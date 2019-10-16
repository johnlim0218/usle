import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Tooltip from '@material-ui/core/Tooltip';
import Favorite from '@material-ui/icons/Favorite';
import Typography from '../components/Typography';
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardBody from '../components/Card/CardBody';
import CardFooter from '../components/Card/CardFooter';
import Button from '../components/Button';
import Tooltip from '../components/Tooltip';

import { cardProduct1 }from '../pages/product';
import { cardProduct2 } from '../pages/product';
import { cardProduct3 }from '../pages/product';
import { cardProduct4 }from '../pages/product';

const StyledTypographyCategory = styled(Typography)`
  text-align: center;
  margin-top: 10px;
`
const StyledTypographyTitle = styled(Typography)`
  text-decoration: none;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 25px;
  min-height: 32px;
  text-align: center;
`
const StyledDivCardDescription = styled.div`
  text-align: center;
  color: gray;
`;
const StyledCardFooter = styled(CardFooter)`
  justify-content: space-between !important;
`;

const StyledButton = styled(Button)`
  &:hover {
    background-color:transparent;
  }
  &:active{
    background-color:transparent;
  }
  &:focus{
    background-color:transparent;
  }
`;


const ProductItemList = (props) => {
  const { category, name, price, despcription, imgsrc, item } = props;
  
      return (
        <Card product>
          <CardHeader image>
            <a href="#pablo">
              <img src={item ? item.imgsrc : 'https://shop-phinf.pstatic.net/20191010_276/1570696979626LfRda_JPEG/8057718259505790_559180585.jpg?type=m510'} alt="cardProduct3" />
            </a>
          </CardHeader>
          <CardBody>
            <StyledTypographyCategory variant='h6'>{item ? item.category : 'popular'}</StyledTypographyCategory>
            <StyledTypographyTitle variant='h5'>{item ? item.name : 'itemname'}</StyledTypographyTitle>
            <StyledDivCardDescription>
            {item ? item.despcription : `
              Balmain's mid-rise skinny jeans are cut with stretch
              to ensure they retain their second-skin fit but move
              comfortably.`}
            </StyledDivCardDescription>
          </CardBody>
          <StyledCardFooter>
            <div>
              <Typography variant='body1'>￦{item ? item.price : '20,000'}</Typography>
            </div>
            <div>
              <Tooltip
                id='tooltip-top'
                title='Save to Wishlist'
                placement='top'>
                <StyledButton justIcon link>
                  <Favorite />
                </StyledButton>
              </Tooltip>
            </div>
          </StyledCardFooter>
       </Card>
    )
}


ProductItemList.propTypes = {
  category: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  despcription: PropTypes.string,
  imgsrc: PropTypes.string,
};

export default ProductItemList;