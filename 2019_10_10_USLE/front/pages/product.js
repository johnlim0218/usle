import React from 'react';
import styled, { css } from 'styled-components';
import ImageGallery from "react-image-gallery";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

import Accordion from '../components/Accordion';

// images
const cardProduct1 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product1.629c7883.jpg";
const cardProduct2 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product2.77917eb4.jpg";
const cardProduct3 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product3.17b8d773.jpg";
const cardProduct4 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product4.aeca8662.jpg";
const product1 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product1.629c7883.jpg";
const product2 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product2.77917eb4.jpg";
const product3 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product3.17b8d773.jpg";
const product4 = "https://demos.creative-tim.com/material-kit-pro-react/static/media/product4.aeca8662.jpg";


const StyledDivProductPage = styled.div`
    & .image-gallery-slide img {
        border-radius: 3px;
        max-width: 300px;
        height: auto;
    },
    & .image-gallery-swipe {
        margin: 30px 0px;
        overflow: hidden;
        width: 100%;
        height: auto;
        text-align: center;
    },
    & .image-gallery-thumbnails > .image-gallery-thumbnails-container a {
        &.active > div {
            opacity: 1;
            border-color: #e5e5e5;
        },
    & > div {
      width: 80%;
      max-width: 85px;
      margin: 0 auto;
      padding: 8px;
      display: block;
      border: 1px solid transparent;
      background: transparent;
      border-radius: 3px;
      opacity: .8;
    },
    & > div img {
      border-radius: 3px;
      width: 100%;
      height: auto;
      text-align: center;
    }
  }
`;

const StyledDivSection = styled.div`
    background-color: #e5e5e5;
    background-position: 50%;
    background-size: cover;
    padding: 70px 0;
`;
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
    margin: -40vh 0 0;
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


const images = [
    {
        original: cardProduct3,
        thumbnail: product3
      },
      {
        original: cardProduct4,
        thumbnail: product4
      },
      {
        original: cardProduct1,
        thumbnail: product1
      },
      {
        original: cardProduct2,
        thumbnail: product2
      }
]

const Product = () => {
    return(
        
         <StyledDivProductPage>
             <StyledDivContainer>
                 <StyledGridContainer container>
                     <StyledGridItem item md={4}>
                         <StyledButtonShoppingCart color="white">
                             <ShoppingCart/>0 items
                         </StyledButtonShoppingCart>
                     </StyledGridItem>
                 </StyledGridContainer>
             </StyledDivContainer>
                 <StyledDivSection>
                    <StyledDivContainer>
                        <StyledDivMain>
                           <StyledGridContainer container>
                               <StyledGridItem item md={6} sm={6}>
                                    <ImageGallery
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        starIndex={3}
                                        items={images}
                                    />
                               </StyledGridItem>

                               <StyledGridItem item md={6} sm={6}>
                                   <h2>Becky Silk Blazer</h2>
                                   <h3>$335</h3>
                                   <Accordion
                                        active={0}
                                        activeColor="rose"
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
                               </StyledGridItem>
                            </StyledGridContainer>
                        </StyledDivMain>
                    </StyledDivContainer>
                 </StyledDivSection>
            
         </StyledDivProductPage>
        
    )
}

export default Product;