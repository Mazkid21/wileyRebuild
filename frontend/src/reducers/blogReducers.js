import {
  BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL, BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS, BLOG_DETAILS_FAIL,
  BLOG_SAVE_REQUEST, BLOG_SAVE_FAIL, BLOG_SAVE_SUCCESS,
  BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCESS, BLOG_DELETE_FAIL,
  BLOG_CATEGORY_LIST_REQUEST, BLOG_CATEGORY_LIST_SUCCESS, BLOG_CATEGORY_LIST_FAIL, BLOG_REVIEW_SAVE_FAIL, BLOG_REVIEW_SAVE_SUCCESS, BLOG_REVIEW_SAVE_REQUEST, BLOG_REVIEW_SAVE_RESET,
} from '../constants/blogConstants';

function blogCategoryListReducer(state = { categories: [] }, action) {
  switch (action.type) {
    case BLOG_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case BLOG_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case BLOG_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function blogListReducer(state = { blogs: [] }, action) {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function blogSaveReducer(state = {}, action) {
  switch (action.type) {
    case BLOG_SAVE_REQUEST:
      return { loading: true };
    case BLOG_SAVE_SUCCESS:
      return { loading: false, success: true, blogs: action.payload };
    case BLOG_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function blogReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case BLOG_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case BLOG_REVIEW_SAVE_SUCCESS:
      return { loading: false, success: true, blogs: action.payload };
    case BLOG_REVIEW_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_REVIEW_SAVE_RESET:
      return { };
    default: return state;
  }
}

function blogDeleteReducer(state = {}, action) {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true, blogs: action.payload };
    case BLOG_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


function blogDetailsReducer(state = { blog: { reviews: [] } }, action) {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return { loading: true };
    case BLOG_DETAILS_SUCCESS:
      return { loading: false, blog: action.payload };
    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
export {
  blogCategoryListReducer, blogDetailsReducer, blogListReducer,
  blogSaveReducer, blogDeleteReducer, blogReviewSaveReducer,
};
