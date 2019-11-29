import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import ImageGallery from 'react-image-gallery';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
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
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';

import Accordion from '../components/Accordion';
import Button from '../components/Button';
import InfoArea from '../components/InfoArea';
import ProductItemList from '../components/ProductItemList';
import { imgSrcUrl } from '../components/ProductItemList';
import { LOAD_PRODUCT_DETAIL_REQUEST } from '../reducers/productReducer';

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
export const StyledDivContainer = styled.div`
    ${props => props.theme.container};
    z-index: 2;
`;
const MainRaised = css`
    @media (max-width: 576px) {
        margin-top: -30px;
    };
    // @media (max-width: 830px) {
    //     margin-left: 10px;
    //     margin-right: 10px;
    // };
    // margin: -40vh 0 0;
    padding: 35px;
    
    border-radius: 6px;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
`;
const MainDiv = css`
    background: white;
    position: relative;
    z-index: 3;
`;

export const StyledDivMain = styled.div`
    ${MainRaised}
    ${MainDiv}
`;

const StyledGridContainer = styled(GridContainer)`
    & .image-gallery-slides {
        height: 560px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    };
    & .image-gallery-slide img {
        // border-radius: 3px;
        // max-width: 450px;
        // max-height: 550px;
        // width: auto;
        // height: auto;
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
const StyledDivShortDescriptionWrapper = styled.div`
      height: 500px
`
const StyledGridContainerSelection = styled(GridContainer)`
    padding-top: 50px;
`
const StyledGridContainerButton = styled(GridContainer)`
    width: auto;
    float: right;
    padding-top: 20px
`

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

export const StyledSelect = styled(Select)`
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

export const StyledMenuItem = styled(MenuItem)`
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

const StyledDivDescription = styled.div`
        
        padding-top: 120px;
        padding-left: 40px;
        padding-right: 40px;
`;

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
    const [imageSrc, setImageSrc] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({})
    const [additionalPrice, setAdditionalPrice] = useState(0);
    const [editorState, setEditorState] = useState(
      EditorState.createEmpty()
    );
    const { productDetail, isLoadingProductDetail } = useSelector(state => state.productReducer);
      
    const onChangeOption = useCallback((index) => (e) => {
      setSelectedOption((prevState) => ({ 
          ...prevState,
          [index] : e.target.value
      }));
      
    }, [selectedOption, options]);

    useEffect(() => {
      console.log(options);
    }, [options])

    // 추가 가격(additionalPrice) 검색
    useEffect(() => {
      let result = [];
      options.map((value, index) => {
        if(selectedOption[index] === undefined){
          return null;
        }
        result.push(selectedOption[index]);
      })

      let copiedList = productDetail.ProductInventories;
      if(result.length === options.length){
        result.map((value, index) => {
          copiedList = copiedList.filter((arrayItem) => {
          return value.id === eval('arrayItem.ProductOptionSelection' + index +'.id');
           })
        })
      }
      console.log(copiedList);
      
    }, [options, selectedOption]);

    // 옵션 정렬
    useEffect(() => {
      let selection = [];
      let sortedSelectionArray = [];
      
      [0,1,2,3,4,5].map((value, index) => {
        selection = [];
        let propsName = 'ProductOptionSelection' + value;
        
        productDetail && productDetail.ProductInventories.map((productInventoryValue, productInventoryIndex) => {
          if(eval("productInventoryValue.ProductOptionSelection"+value) !== null){
             selection.push(eval("productInventoryValue.ProductOptionSelection"+value));
          }
        })
        // 옵션 중복을 제거해서 배열에 넣는다
        let result = selection.reduce((selectionReducedArray, selectionCurValue) => {
          if(selectionReducedArray.map((thisValue, thisIndex) => {
            return thisValue.id;
          }).indexOf(selectionCurValue.id) < 0) {
            selectionReducedArray.push(selectionCurValue);
          }
          return selectionReducedArray
        }, []);
        if(result.length !== 0) {
          sortedSelectionArray.push(result);
        }
      })
      
      setOptions(sortedSelectionArray);
    }, [productDetail]);
    
    // ImageGallery 용 이미지 소스
    useEffect(() => {
      let imageSrcs = [];
      productDetail && productDetail.ProductImages.map((image, index) => {
        imageSrcs.push({
          original: imgSrcUrl + image.src,
          thumbnail: imgSrcUrl + image.src,
        });
      });
      setImageSrc(imageSrcs);

    }, [productDetail])

    // 제품 상세 설명 parser (draft.js)
    useEffect(() => {
      if(productDetail){
        const description = convertFromRaw(JSON.parse(productDetail.description));
        setEditorState(EditorState.createWithContent(description));
      }
    }, [productDetail && productDetail.description]);

    return(
       <div>
           {/* upper */}
           <div>

           </div>
           {/* lower */}
           <StyledDivProductLowerSection>
               <StyledDivContainer>
                  <StyledDivMain>
                      <StyledGridContainer>
                          <GridItem md={6} sm={6}>
                              <ImageGallery
                                  showFullscreenButton={false}
                                  showPlayButton={false}
                                  showNav={false}
                                  startIndex={3}
                                  items={imageSrc}
                                  />
                          </GridItem>
                          
                          <GridItem md={6} sm={6}>
                            <StyledDivShortDescriptionWrapper>
                              <StyledTypographyTitle variant='h5'>{productDetail && productDetail.productName}</StyledTypographyTitle>
                              <StyledTypographyPrice variant='h3'>{productDetail && productDetail.price}원</StyledTypographyPrice>
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
                            </StyledDivShortDescriptionWrapper>


                            <StyledGridContainerSelection>
                              {options && options.map((optionsValue, optionsIndex) => (
                              
                                <GridItem xs={12}>
                                  <label>
                                    <Typography>Select {optionsValue[0].ProductOption.optionName}</Typography>
                                  </label>
                                  <StyledFormControl
                                    fullWidth>
                                      <StyledSelect
                                        value={selectedOption[optionsIndex]}
                                        onChange={onChangeOption(optionsIndex)}
                                      
                                      >
                                        {optionsValue.map((optionValue, optionIndex) => (
                                          <StyledMenuItem
                                            value={optionValue}>
                                              {optionValue.selectionName}
                                          </StyledMenuItem>  
                                        ))}
                                      </StyledSelect>
                                  </StyledFormControl>
                                </GridItem>
                                
                              ))}

                            </StyledGridContainerSelection>
                            
                            
                            <StyledGridContainerButton>
                              <StyledButtonBuy>
                                Purchase it
                              </StyledButtonBuy>
                              <StyledButtonCart>
                                Add to Cart &nbsp; <ShoppingCart/>
                              </StyledButtonCart>
                            </StyledGridContainerButton>
                          </GridItem>
                      </StyledGridContainer>
                    </StyledDivMain>

                    <StyledDivDescription>
                      <Editor
                        editorState={editorState}
                      />                  
                    </StyledDivDescription>

                    <StyledDivPolicy>
                      <StyledGridContainer>
                        <GridItem md={4} sm={4}>
                         <InfoArea
                            title="2 Days Delivery"
                            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                            icon={LocalShipping}
                            vertical
                          />
                        </GridItem>
                        <GridItem md={4} sm={4}>
                         <InfoArea
                            title="Refundable Policy"
                            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                            icon={VerifiedUser}
                            vertical
                          />
                        </GridItem>
                        <GridItem md={4} sm={4}>
                         <InfoArea
                            title="Popular Item"
                            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                            icon={Favorite}
                            vertical
                          />
                        </GridItem>
                      </StyledGridContainer>               
                    </StyledDivPolicy>

                    {/* <StyledDivRelatedItems>
                      <StyledTypographyRelateditems variant="h4">
                        You may also be interested in:
                      </StyledTypographyRelateditems>
                      <StyledGridContainer>
                        {products.map((v, i) => (
                          <GridItem sm={6} md={3}>
                            <ProductItemList key={v}/>
                          </GridItem>
                        ))} 
                      </StyledGridContainer>
                    </StyledDivRelatedItems>                      */}

                </StyledDivContainer>
           </StyledDivProductLowerSection>
       </div> 
       
    )
}

Product.getInitialProps = async (context) => {
  const id = context.query.id;
  context.store.dispatch({
    type: LOAD_PRODUCT_DETAIL_REQUEST,
    data: id,
  })
  return { id };
}
export default Product;