const initialState = {
    products: [],
    isLoadingProducts: false,
    loadProductsErrorReason: '',
    productDetail: null,
    isLoadingProductDetail: false,
    loadProductDetailErrorReason: '',
}

export const LOAD_PRODUCTS_REQUEST = "LOAD_PRODUCTS_REQUEST";
export const LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS";
export const LOAD_PRODUCTS_FAILURE = "LOAD_PRODUCTS_FAILURE";

export const LOAD_PRODUCT_DETAIL_REQUEST = "LOAD_PRODUCT_DETAIL_REQUEST";
export const LOAD_PRODUCT_DETAIL_SUCCESS = "LOAD_PRODUCT_DETAIL_SUCCESS";
export const LOAD_PRODUCT_DETAIL_FAILURE = "LOAD_PRODUCT_DETAIL_FAILURE";

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_PRODUCTS_REQUEST: {
            return{
                ...state,
                isLoadingProducts: true,
                products: [],
            }
        }
        case LOAD_PRODUCTS_SUCCESS: {
            return{
                ...state,
                isLoadingProducts: false,
                products: action.data,
            }
        }
        case LOAD_PRODUCTS_FAILURE: {
            return{
                ...state,
                isLoadingProducts: false,
                loadProductErrorReason: action.error,
            }
        }

        case LOAD_PRODUCT_DETAIL_REQUEST:{
            return{
                ...state,
                isLoadingProductDetail: true,
                productDetail: null,
            }
        }
        case LOAD_PRODUCT_DETAIL_SUCCESS:{
            return{
                ...state,
                isLoadingProductDetail: false,
                productDetail: action.data,
            }
        }
        case LOAD_PRODUCT_DETAIL_FAILURE:{
            return{
                ...state,
                isLoadingProductDetail: false,
                loadProductDetailErrorReason: action.error,
            }
        }

        default : {
            return{
                ...state,
            }
        }
    }
}

export default productReducer;