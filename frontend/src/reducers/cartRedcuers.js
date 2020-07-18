import {
  CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY_ITEMS,
} from '../constants/cartConstants';

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const currentItem = state.cartItems.find((x) => x.blog === item.blog);
      if (currentItem) {
        return {
          cartItems: state.cartItems.map((x) => (x.blog === currentItem.blog
            ? item : x)),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }
    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter((x) => x.blog !== action.payload) };
    case CART_EMPTY_ITEMS:
      return { cartItems: [], shipping: {}, payment: {} };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}
export { cartReducer };
