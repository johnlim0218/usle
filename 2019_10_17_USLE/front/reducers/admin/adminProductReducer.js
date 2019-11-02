const initialState = {
  newProduct: null,
  isPostingNewProduct: false, // 새 게시물 등록 시도
  postNewProductErrorReason: '', // 새 게시물 실패 이유
};

export const NEW_PRODUCT_POST_REQUEST = "NEW_PRODUCT_POST_REQUEST";
export const NEW_PRODUCT_POST_SUCCESS = "NEW_PRODUCT_POST_SUCCESS";
export const NEW_PRODUCT_POST_FAILURE = "NEW_PRODUCT_POST_FAILURE";

const adminProductReducer = (state = initialState, action) => {
    switch(action.type){
        case NEW_PRODUCT_POST_REQUEST:{
            return{
                ...state,
                isPostingNewProduct: true,
            }
        }
        case NEW_PRODUCT_POST_SUCCESS: {
            return{
                ...state,
                isPostingNewProduct: false,
            }
        }
        case NEW_PRODUCT_POST_FAILURE: {
            return{
                ...state,
                isPostingNewProduct: false,
            }
        }

        default:
            return{
                ...state,
            }
    }
}

export default adminProductReducer;