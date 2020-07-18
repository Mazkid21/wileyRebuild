import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Blog = props => (
  // <li>
  //   <div className="blog">
  //     <div className="blog-image">
  //       <Link to={`/blog/${props._id}`}>
  //         <img src={props.image} alt="images" />
  //       </Link>
  //     </div>
  //     <div className="blog-name">
  //       <Link to={`/blog/${props._id}`}>{props.name}</Link>
  //     </div>
  //     <div className="blog-brand">{props.brand}</div>
  //     <div className="blog-price">${props.price}</div>
  //     <div className="blog-rating">
  //       <Rating value={props.rating} text={`${props.numReviews} reviews`} />
  //     </div>
  //   </div>
  // </li>

  <li className="blog" >
    <div className="list_inner">
      <div className="image_wrap">
        <Link to={`/blog/${props._id}`}>
          <img src={props.imageUrl} alt="images" />
        </Link>
      </div>
    </div>
    <div className="definition_portfolio">
      <span className="first">
       <Link to={`/blog/${props._id}`}>
        <p>{props.headline}</p>
        </Link>
      </span>
      {/* <span className="second">
        {' '}
        <Link to={`/blog/${props._id}`}>Link to blog (blog) page</Link>
      </span> */}
    </div>
  </li>
);
export default Blog;
