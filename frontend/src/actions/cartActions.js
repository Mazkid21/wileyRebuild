import Cookies from 'js-cookie';
import axios from 'axios';
import {
  CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT,
} from '../constants/cartConstants';

const addToCart = (blogId, qty) => async (dispatch, getState) => {
  const { data: blog } = await axios.get(`/api/blogs/${blogId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      blog: blog._id,
      image: blog.image,
      name: blog.name,
      price: blog.price,
      countInStock: blog.countInStock,
      qty,
    },
  });
  const { cart: { cartItems } } = getState();
  Cookies.set('cartItems', JSON.stringify(cartItems));
};

const removeFromCart = (blogId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: blogId,
  });
  const { cart: { cartItems } } = getState();
  Cookies.set('cartItems', JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export {
  addToCart, removeFromCart, saveShipping, savePayment,
};
