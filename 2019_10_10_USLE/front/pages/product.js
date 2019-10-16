import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import ImageGallery from "react-image-gallery";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Favorite from "@material-ui/icons/Favorite";

import Typography from '../components/Typography';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import InfoArea from '../components/InfoArea';
import ProductItemList from '../components/ProductItemList';

// images
export const cardProduct1 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product1.629c7883.jpg";
export const cardProduct2 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product2.77917eb4.jpg";
export const cardProduct3 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product3.17b8d773.jpg";
export const cardProduct4 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product4.aeca8662.jpg";
export const product1 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product1.629c7883.jpg";
export const product2 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product2.77917eb4.jpg";
export const product3 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product3.17b8d773.jpg";
export const product4 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product4.aeca8662.jpg";


const products = [1,2,3,4];
const images = [
    {
        original: product3,
        thumbnail: product3
      },
      {
        original: product4,
        thumbnail: product4
      },
      {
        original: product1,
        thumbnail: product1
      },
      {
        original: product2,
        thumbnail: product2
      }
]

const StyledDivProductPage = styled.div`
  
`;


const StyledDivProductLowerSection = styled.div`
    background-position: 50%;
    background-size: cover;
    padding: 70px 0;
`
const StyledDivContainer = styled.div`
    ${props => props.theme.container};
    z-index: 2;
`;
const MainRaised = css`
    @media (max-width: 576px) {
        margin-top: -30px;
    };
    @media (max-width: 830px) {
        margin-left: 10px;
        margin-right: 10px;
    };
    // margin: -40vh 0 0;
    padding: 40px;
    
    border-radius: 6px;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
`;
const MainDiv = css`
    background: white;
    position: relative;
    z-index: 3;
`;
const StyledDivMain = styled.div`
    ${MainRaised}
    ${MainDiv}
`;

const StyledGridContainer = styled(Grid)`
    margin-right: -15px;
    margin-left: -15px;
    width: auto;

    & .image-gallery-slide img {
        border-radius: 3px;
        max-width: 300px;
        height: auto;
    };
    & .image-gallery-swipe {
        margin: 30px 0px;
        overflow: hidden;
        width: 100%;
        height: auto;
        text-align: center;
      };
      & .image-gallery-thumbnails > .image-gallery-thumbnails-container a {
        &.active {
          opacity:1;
          border-color: #ddd;
          border-width: 2px;
        }
        &.active > div {
          opacity: .9;
        };
        & > div {
          width: 80%;
          max-width: 85px;
          margin: 0 auto;
          padding: 8px;
          display: block;
          border: 1px solid transparent;
          background: transparent;
          border-radius: 3px;
          opacity: .4;
        };
        & > div img {
          border-radius: 3px;
          width: 100%;
          height: auto;
          text-align: center;
        }
      }
`
const StyledGridContainerSelection = styled(Grid)`
    padding-top: 50px;
`
const StyledGridContainerCart = styled(Grid)`
    width: auto;
    float: right;
    padding-top: 20px
`
const StyledGridItem = styled(Grid)`
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
`;
const StyledButtonShoppingCart = styled(Button)`
    float: right;
`;

const StyledFormControl = styled(FormControl)`
    margin: 10px 1px 10px 0px !important;
    & > div {
      &:before {
        border-bttom-width: 1px !important;
        border-bottom-color: gray !important;
      };
      &:after {
        border-bottom-color: ${props=> props.theme.palette.secondary.light}!important;
      }
    }
`;
const StyledTypographyTitle = styled(Typography)`
    color: #3c4858;
    text-decoration: none;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 25px;
    min-height: 32px;
`;
const StyledTypographyPrice = styled(Typography)`
    margin: 10px 0 25px;
    color: #3c4858;
`

const StyledSelect = styled(Select)`
        padding: 12px 0 7px;
        font-size: .75rem;
        font-weight: 400;
        line-height: 1.42857;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0;
        background-color: transparent;
        & :focus {
          background-color: transparent;
        };
        & [aria-owns] + input + svg {
          transform: rotate(180deg);
        };
        & div + input + svg {
          transition: all 300ms linear;
        };
`;
const StyledMenuItem = styled(MenuItem)`
        &.MuiMenuItem-root{
          font-size: 13px;
          padding: 10px 20px;
          margin: 0 5px;
          border-radius: 2px;
          transition: all 150ms linear;
          display: block;
          clear: both;
          font-weight: 400;
          line-height: 2;
          white-space: nowrap;
          padding-right: 30px;
          &:hover {
            background-color: ${props => props.theme.palette.secondary.light};
            color: ${props => props.theme.palette.secondary.dark}
          };
        };
        &.Mui-selected{
          background-color: ${props => props.theme.palette.secondary.light};
        }
`;

const StyledButtonBuy = styled(Button)`

`

const StyledButtonCart = styled(Button)`

`

const StyledDivPolicy = styled.div`
        text-align: center;
        padding-top: 30px;
`;

const StyledDivRelatedItems = styled.div`
        margin-top: 50px;
        & h1{
          margin-bottom: 80px;
        }
`;
const StyledTypographyRelateditems = styled(Typography)`
  text-align: center;
`;

const Product = () => {
    const [colorSelect, setColorSelect] = useState("0");
    const [sizeSelect, setSizeSelect] = useState("0");
    const onChangeColor = useCallback((e) => {
      setColorSelect(e.target.value);
    },[colorSelect]);
    const onChangeSize = useCallback((e) => {
      setSizeSelect(e.target.value);
    },[sizeSelect])
    
    return(
       <div>
           {/* upper */}
           <div>

           </div>
           {/* lower */}
           <StyledDivProductLowerSection>
               <StyledDivContainer>
                    <StyledDivMain>
                        <StyledGridContainer container>
                            <StyledGridItem item md={6} sm={6}>
                                <ImageGallery
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                    startIndex={3}
                                    items={images}
                                    />
                            </StyledGridItem>
                            <StyledGridItem item md={6} sm={6}>
                              <StyledTypographyTitle variant='h4'>Becky Silk Blazer</StyledTypographyTitle>
                              <StyledTypographyPrice variant='h4'>$150</StyledTypographyPrice>
                              <Accordion
                                active={0}
                                activeColor='rose'
                                collapses={[
                                  {
                                    title: "Description",
                                    content: (
                                      <p>
                                        Eres{"'"} daring {"'"}Grigri Fortune{"'"} swimsuit has
                                        the fit and coverage of a bikini in a one-piece
                                        silhouette. This fuchsia style is crafted from the
                                        label{"'"}s sculpting peau douce fabric and has
                                        flattering cutouts through the torso and back. Wear
                                        yours with mirrored sunglasses on vacation.
                                      </p>
                                    )
                                  },
                                  {
                                    title: "Designer Information",
                                    content: (
                                      <p>
                                        An infusion of West Coast cool and New York attitude,
                                        Rebecca Minkoff is synonymous with It girl style.
                                        Minkoff burst on the fashion scene with her
                                        best-selling {"'"}Morning After Bag{"'"} and later
                                        expanded her offering with the Rebecca Minkoff
                                        Collection - a range of luxe city staples with a {'"'}
                                        downtown romantic{'"'} theme.
                                      </p>
                                    )
                                  },
                                  {
                                    title: "Details and Care",
                                    content: (
                                      <ul>
                                        <li>Storm and midnight-blue stretch cotton-blend</li>
                                        <li>
                                          Notch lapels, functioning buttoned cuffs, two front
                                          flap pockets, single vent, internal pocket
                                        </li>
                                        <li>Two button fastening</li>
                                        <li>84% cotton, 14% nylon, 2% elastane</li>
                                        <li>Dry clean</li>
                                      </ul>
                                    )
                                  }
                                ]}
                              />
                              <StyledGridContainerSelection container>
                                <StyledGridItem item md={6} sm={6}>
                                  <label>
                                    <Typography>Select color</Typography>
                                  </label>
                                  <StyledFormControl
                                    fullWidth>
                                      <StyledSelect
                                        value={colorSelect}
                                        onChange={onChangeColor}
                                        inputProps={{
                                          name: 'colorSelect',
                                          id: 'color-select'
                                        }}
                                      >
                                        <StyledMenuItem
                                          value="0">
                                            Rose
                                        </StyledMenuItem>
                                        <StyledMenuItem
                                          value="1">
                                            Gray
                                        </StyledMenuItem>
                                        <StyledMenuItem
                                          value="2">
                                            White
                                        </StyledMenuItem>
                                      </StyledSelect>
                                  </StyledFormControl>
                                </StyledGridItem>
                                <StyledGridItem item md={6} sm={6}>
                                  <label>
                                    <Typography>Select size</Typography>
                                  </label>
                                  <StyledFormControl
                                    fullWidth>
                                      <StyledSelect
                                        value={sizeSelect}
                                        onChange={onChangeSize}
                                        inputProps={{
                                          name: 'sizeSelect',
                                          id: 'size-select'
                                        }}
                                      >
                                        <StyledMenuItem
                                          value="0">
                                            Small
                                        </StyledMenuItem>
                                        <StyledMenuItem
                                          value="1">
                                            Medium
                                        </StyledMenuItem>
                                        <StyledMenuItem
                                          value="2">
                                            Large
                                        </StyledMenuItem>
                                      </StyledSelect>
                                  </StyledFormControl>
                                </StyledGridItem>
                              </StyledGridContainerSelection>
                              <StyledGridContainerCart container>
                                <StyledButtonBuy>
                                  Buy it
                                </StyledButtonBuy>
                                <StyledButtonCart>
                                  Add to Cart &nbsp; <ShoppingCart/>
                                </StyledButtonCart>
                              </StyledGridContainerCart>
                            </StyledGridItem>
                        </StyledGridContainer>
                      </StyledDivMain>
                    
                    <StyledDivPolicy>
                      <StyledGridContainer container>
                        <StyledGridItem item md={4} sm={4}>
                         <InfoArea
                            title="2 Days Delivery"
                            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                            icon={LocalShipping}
                            vertical
                          />
                        </StyledGridItem>
                        <StyledGridItem item md={4} sm={4}>
                         <InfoArea
                            title="Refundable Policy"
                            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                            icon={VerifiedUser}
                            vertical
                          />
                        </StyledGridItem>
                        <StyledGridItem item md={4} sm={4}>
                         <InfoArea
                            title="Popular Item"
                            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                            icon={Favorite}
                            vertical
                          />
                        </StyledGridItem>
                      </StyledGridContainer>               
                    </StyledDivPolicy>

                    <StyledDivRelatedItems>
                      <StyledTypographyRelateditems variant="h4">
                        You may also be interested in:
                      </StyledTypographyRelateditems>
                      <StyledGridContainer container>
                        {products.map((v, i) => (
                          <StyledGridItem item sm={6} md={3}>
                            <ProductItemList key={v}/>
                          </StyledGridItem>
                        ))} 
                      </StyledGridContainer>
                    </StyledDivRelatedItems>                     

                </StyledDivContainer>
           </StyledDivProductLowerSection>
       </div> 
       
    )
}

export default Product;