const initialState = {
  newProduct: null,
  isPostingNewProduct: false, // 새 게시물 등록 시도
  postNewProductErrorReason: '', // 새 게시물 실패 이유
  imagePaths: [],
  isUploadingImages: false,
  uploadImagesErrorReason: '',
  isRemovingImage: false,
  removeImageErrorReason: '',
  optionData: [],
  isSearchingOptionName: false,
  searchOptionNameErrorReason: '',
};

export const NEW_PRODUCT_POST_REQUEST = "NEW_PRODUCT_POST_REQUEST";
export const NEW_PRODUCT_POST_SUCCESS = "NEW_PRODUCT_POST_SUCCESS";
export const NEW_PRODUCT_POST_FAILURE = "NEW_PRODUCT_POST_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const REMOVE_IMAGE_REQUEST = "REMOVE_IMAGE_REQUEST";
export const REMOVE_IMAGE_SUCCESS = "REMOVE_IMAGE_SUCCESS";
export const REMOVE_IMAGE_FAILURE = "REMOVE_IMAGE_FAILURE";

export const SEARCH_OPTION_NAME_REQUEST = "SEARCH_OPTION_NAME_REQUEST";
export const SEARCH_OPTION_NAME_SUCCESS = "SEARCH_OPTION_NAME_SUCCESS";
export const SEARCH_OPTION_NAME_FAILURE = "SEARCH_OPTION_NAME_FAILURE";

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
                newProduct: action.data,
            }
        }
        case NEW_PRODUCT_POST_FAILURE: {
            return{
                ...state,
                isPostingNewProduct: false,
            }
        }

        case UPLOAD_IMAGES_REQUEST: {
            return{
                ...state,
                isUploadingImages: true,
            }
        };
        case UPLOAD_IMAGES_SUCCESS: {
            return{
                ...state,
                isUploadingImages: false,
                imagePaths: [...state.imagePaths, ...action.data],
            }
        };
        case UPLOAD_IMAGES_FAILURE: {
            return{
                ...state,
                isUploadingImages: false,
                uploadImagesErrorReason: action.error,
            }
        };

        case REMOVE_IMAGE_REQUEST: {
            return{
                ...state,
                isRemovingImage: true,
            }
        };
        case REMOVE_IMAGE_SUCCESS: {
            return{
                ...state,
                isRemovingImage: false,
               
            }
        };
        case REMOVE_IMAGE_FAILURE: {
            return{
                ...state,
                isRemovingImage: false,
                removeImageErrorReason: action.error
            }
        };

        case SEARCH_OPTION_NAME_REQUEST: {
            return{
                ...state,
                isSearchingOptionName: true,
            }
        }

        case SEARCH_OPTION_NAME_SUCCESS: {
            const optionDataIndex = state.optionData.findIndex(v => v.id && v.id === action.data.id);
            
            if(optionDataIndex === -1){
                return{
                    ...state,
                    isSearchingOptionName: false,
                    optionData : [...state.optionData, action.data],
                }
            } 
            return{
                ...state,
                isSearchingOptionName: false,
                optionData : [...state.optionData],
            }
        }

        case SEARCH_OPTION_NAME_FAILURE: {
            return{
                ...state,
                isSearchingOptionName: false,
                searchOptionNameErrorReason: action.error,
            }
        }

        default:
            return{
                ...state,
            }
    }
}

export default adminProductReducer;