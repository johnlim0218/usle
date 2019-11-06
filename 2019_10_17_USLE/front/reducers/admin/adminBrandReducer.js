const initialState = {
    newBrand: null,
    isPostingNewBrand: false,
    postNewBrandErrorReason: '',
    brands: null,
    isLoadingBrands: false,
    loadBrandsErrorReason: '',
};

export const NEW_BRAND_POST_REQUEST = "NEW_BRAND_POST_REQUEST";
export const NEW_BRAND_POST_SUCCESS = "NEW_BRAND_POST_SUCCESS";
export const NEW_BRAND_POST_FAILURE = "NEW_BRAND_POST_FAILURE";

export const BRANDS_LOAD_REQUEST = "BRANDS_LOAD_REQUEST";
export const BRANDS_LOAD_SUCCESS = "BRANDS_LOAD_SUCCESS";
export const BRANDS_LOAD_FAILURE = "BRANDS_LOAD_FAILURE";
  
export const BRAND_DELETE_REQUEST = "BRANDS_DELETE_REQUEST";
export const BRAND_DELETE_SUCCESS = "BRANDS_DELETE_SUCCESS";
export const BRAND_DELETE_FAILURE = "BRANDS_DELETE_FAILURE";

const adminBrandReducer = (state = initialState, action) => {
    switch(action.type){
        case NEW_BRAND_POST_REQUEST: {
            return {
                ...state,
                isPostingNewBrand: true,
            }
        }
        case NEW_BRAND_POST_SUCCESS: {
            return {
                ...state,
                isPostingNewBrand: false,
                brands: [action.data, ...state.brands],
            }
        }
        case NEW_BRAND_POST_FAILURE: {
            return {
                ...state,
                isPostingNewBrand: false,
                postNewBrandErrorReason: action.error,
            }
        }

        case BRANDS_LOAD_REQUEST: {
            return{
                ...state,
                isLoadingBrands: true,
            }
        }
        case BRANDS_LOAD_SUCCESS: {
            return{
                ...state,
                isLoadingBrands: false,
                brands: action.data,
            }
        }
        case BRANDS_LOAD_FAILURE: {
            return {
                ...state,
                isLoadingBrands: false,
                loadBrandsErrorReason: action.error,
            }
        }
        
        case BRAND_DELETE_REQUEST: {
            return{
                ...state,
            }
        }
        case BRAND_DELETE_SUCCESS: {
            const filteredBrands = state.brands.filter(v => v.id !== action.data);
            const brands = [...filteredBrands];
            return{
                ...state,
                brands,
            }
        }
        case BRAND_DELETE_FAILURE: {
            return{
                ...state,
            }
        }

        default: {
            return{
                ...state,
            }
        }
    }
}

export default adminBrandReducer;