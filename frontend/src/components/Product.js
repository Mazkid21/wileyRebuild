import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = props => (
  // <li>
  //   <div className="product">
  //     <div className="product-image">
  //       <Link to={`/product/${props._id}`}>
  //         <img src={props.image} alt="images" />
  //       </Link>
  //     </div>
  //     <div className="product-name">
  //       <Link to={`/product/${props._id}`}>{props.name}</Link>
  //     </div>
  //     <div className="product-brand">{props.brand}</div>
  //     <div className="product-price">${props.price}</div>
  //     <div className="product-rating">
  //       <Rating value={props.rating} text={`${props.numReviews} reviews`} />
  //     </div>
  //   </div>
  // </li>

  <li className="articles" >
    <div className="list_inner">
      <div className="image_wrap">
        <Link to={`/product/${props._id}`}>
          <img src={props.imageUrl} alt="images" />
        </Link>
      </div>
    </div>
    <div className="definition_portfolio">
      <span className="first">
       <Link to={`/product/${props._id}`}>
        <p>{props.headline}</p>
        </Link>
      </span>
      {/* <span className="second">
        {' '}
        <Link to={`/product/${props._id}`}>Link to product (blog) page</Link>
      </span> */}
    </div>
  </li>
);
export default Product;
