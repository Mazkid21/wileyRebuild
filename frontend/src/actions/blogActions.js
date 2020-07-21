import axios from 'axios';
import {
  BLOG_LIST_REQUEST, 
  BLOG_LIST_SUCCESS, 
  BLOG_LIST_FAIL, 
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_SAVE_REQUEST, 
  BLOG_SAVE_SUCCESS, 
  BLOG_SAVE_FAIL,  
  BLOG_DELETE_REQUEST, 
  BLOG_DELETE_SUCCESS, 
  BLOG_DELETE_FAIL, 
  BLOG_CATEGORY_LIST_REQUEST,
  BLOG_CATEGORY_LIST_SUCCESS,
  BLOG_CATEGORY_LIST_FAIL,
  BLOG_REVIEW_SAVE_REQUEST,
  BLOG_REVIEW_SAVE_SUCCESS,
  BLOG_REVIEW_SAVE_FAIL,
} from '../constants/blogConstants';
import { getErrorMessage } from '../util';

const listBlogCategories = () => async (dispatch) => {
  dispatch({ type: BLOG_CATEGORY_LIST_REQUEST, loading: true });
  try {
    const result = await axios.get('/api/blogs/categories');
    dispatch({ type: BLOG_CATEGORY_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: BLOG_CATEGORY_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

const listBlogs = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
  dispatch({ type: BLOG_LIST_REQUEST, payload: { category, searchKeyword, sortOrder } });
  try {
    const result = await axios(`/api/blogs?category=${category}&search=${searchKeyword}&sort=${sortOrder}`);
    dispatch({ type: BLOG_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: BLOG_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

const saveBlog = (blog) => async (dispatch, getState) => {
  dispatch({ type: BLOG_SAVE_REQUEST, payload: blog });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    if (blog._id) {
      const { data: savedBlog } = await axios.put(`/api/blogs/${blog._id}`, blog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: BLOG_SAVE_SUCCESS, payload: savedBlog });
    } else {
      const { data: savedBlog } = await axios.post('/api/blogs', blog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: BLOG_SAVE_SUCCESS, payload: savedBlog });
    }
  } catch (error) {
    dispatch({ type: BLOG_SAVE_FAIL, payload: getErrorMessage(error) });
  }
};

const saveBlogReview = (blogId, review) => async (dispatch, getState) => {
  dispatch({ type: BLOG_REVIEW_SAVE_REQUEST, payload: review });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: savedReview } = await axios.post(`/api/blogs/${blogId}/reviews`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: BLOG_REVIEW_SAVE_SUCCESS, payload: savedReview });
  } catch (error) {
    dispatch({ type: BLOG_REVIEW_SAVE_FAIL, payload: getErrorMessage(error) });
  }
};

const deleteBlog = (blog) => async (dispatch, getState) => {
  dispatch({ type: BLOG_DELETE_REQUEST, payload: blog });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: deletedBlog } = await axios.delete(`/api/blogs/${blog._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: BLOG_DELETE_SUCCESS, payload: deletedBlog });
  } catch (error) {
    dispatch({ type: BLOG_DELETE_FAIL, payload: getErrorMessage(error) });
  }
};


const detailsBlog = (blogId) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });
    const result = await axios(`/api/blogs/${blogId}`);
    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: BLOG_DETAILS_FAIL, payload: getErrorMessage(error) });
  }
};

export {
  listBlogs, detailsBlog, saveBlog,
  saveBlogReview, deleteBlog, listBlogCategories,
};
