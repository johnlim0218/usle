const initialState = {
    newCategory: null,
    isPostingNewCategory: false, // 새 게시물 등록 시도
    postNewCategoryErrorReason: '', // 새 게시물 실패 이유
    categories: null,
    isLoadingCategories: false,
    loadCategoriesErrorReason: '',
  };
  
  export const NEW_CATEGORY_POST_REQUEST = "NEW_CATEGORY_POST_REQUEST";
  export const NEW_CATEGORY_POST_SUCCESS = "NEW_CATEGORY_POST_SUCCESS";
  export const NEW_CATEGORY_POST_FAILURE = "NEW_CATEGORY_POST_FAILURE";

  export const CATEGORIES_LOAD_REQUEST = "CATEGORIRES_LOAD_REQUEST";
  export const CATEGORIES_LOAD_SUCCESS = "CATEGORIRES_LOAD_SUCCESS";
  export const CATEGORIES_LOAD_FAILURE = "CATEGORIRES_LOAD_FAILURE";
  
  const adminCategoryReducer = (state = initialState, action) => {
      switch(action.type){
          case NEW_CATEGORY_POST_REQUEST:{
              return{
                  ...state,
                  isPostingNewCategory: true,
              }
          }
          case NEW_CATEGORY_POST_SUCCESS: {
              return{
                  ...state,
                  isPostingNewCategory: false,
              }
          }
          case NEW_CATEGORY_POST_FAILURE: {
              return{
                  ...state,
                  isPostingNewCategory: false,
                  postNewCategoryErrorReason: action.error,
              }
          }

          case CATEGORIES_LOAD_REQUEST: {
            return{
                ...state,
                isLoadingCategories: true,
            }   
          }
          case CATEGORIES_LOAD_SUCCESS: {
              console.log(action.data);
            return{
                ...state,
                isLoadingCategories: false,
                categories: action.data,
            }   
          }
          case CATEGORIES_LOAD_FAILURE: {
            return{
                ...state,
                isLoadingCategories: false,
                loadCategoriesErrorReason: action.error,
            }   
          }
  
          default:
              return{
                  ...state,
              }
      }
  }
  
  export default adminCategoryReducer;