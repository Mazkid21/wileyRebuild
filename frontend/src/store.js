import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import {
  blogListReducer, blogDetailsReducer, blogSaveReducer,
  blogDeleteReducer, blogCategoryListReducer, blogReviewSaveReducer,
} from './reducers/blogReducers';
import { cartReducer } from './reducers/cartRedcuers';
import {
  orderCreateReducer, orderDetailsReducer, orderListReducer, myOrderListReducer,
  orderPayReducer, orderUpdateReducer, orderDeleteReducer, orderDeliverReducer,
} from './reducers/orderReducers';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { articleListReducer, articleSaveReducer, articleDeleteReducer} from './reducers/articleReducers';

const reducers = combineReducers({
  cart: cartReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderUpdate: orderUpdateReducer,
  orderPay: orderPayReducer,
  orderDetails: orderDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  blogList: blogListReducer,
  blogSave: blogSaveReducer,
  blogReviewSave: blogReviewSaveReducer,
  blogDelete: blogDeleteReducer,
  blogCategoryList: blogCategoryListReducer,
  blogDetails: blogDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  articleList: articleListReducer,
  articleSave: articleSaveReducer,
  articleDelete: articleDeleteReducer,
});
const initialState = {
  cart: {
    cartItems: Cookies.getJSON('cartItems') || [],
    shipping: {
      address: '1911, Sherbrooke', city: 'Montreal', country: 'Canada', postalCode: 'H2X1C4',
    },
    payment: { paymentMethod: 'paypal' },
  },
  userSignin: { userInfo: Cookies.getJSON('userInfo') },
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
