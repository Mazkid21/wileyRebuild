import axios from 'axios';

import {
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_SAVE_REQUEST,
  ARTICLE_SAVE_SUCCESS,
  ARTICLE_SAVE_FAIL,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DELETE_FAIL,
} from '../constants/articleConstants';

import { getErrorMessage } from '../util';

const listArticles = () => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_LIST_REQUEST });
    const { data } = await axios.get('/api/articles');
    dispatch({ type: ARTICLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_LIST_FAIL, payload: error.message });
  }
};

const saveArticle = (article) => async (dispatch, getState) => {
  try {
    dispatch({ type: ARTICLE_SAVE_REQUEST, payload: article });
    const { userSignin: { userInfo } } = getState();
    if (!article._id) {
      const { data } = await axios.post('/api/articles', article, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: ARTICLE_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(`/api/articles/${article._id}`, article, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: ARTICLE_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: ARTICLE_SAVE_FAIL, payload: error.message });
  }
};

const deleteArticle = (article) => async (dispatch, getState) => {
  dispatch({ type: ARTICLE_DELETE_REQUEST, payload: article });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data } = await axios.delete(`/api/articles/${article._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ARTICLE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: ARTICLE_DELETE_FAIL, payload: error.message });
  }
};











export { listArticles, saveArticle, deleteArticle };
