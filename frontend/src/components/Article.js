import React from 'react';
import { Link } from 'react-router-dom';


const Article = props => (
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

  <li className="article" >
    <div className="list_inner">
      <div className="image_wrap">
        <a href={props.articleLink}>
          <img src={props.articleImg} alt="images" />
        </a>
      </div>
    </div>
    <div className="definition_portfolio">
      <span className="first">
      <a href={props.articleLink}>
        <p>{props.articleHeadline}</p>
        </a>
      </span>
      <span className="second">
       <p>{props.publication}</p>
      </span>
    </div>
  </li>
);
export default Article;
