import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { detailsBlog, saveBlogReview } from '../actions/blogActions';
import Rating from '../components/Rating';
import { BLOG_REVIEW_SAVE_RESET } from '../constants/blogConstants';

function BlogScreen(props) {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const addToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };
  const dispatch = useDispatch();

  const blogReviewSave = useSelector(state => state.blogReviewSave);
  const {
    loading: loadingSaveReview,
    error: errorSaveReview,
    success: successSaveReview
  } = blogReviewSave;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (successSaveReview) {
      setComment('');
      setRating('');
      alert('Review Submitted');
      dispatch({ type: BLOG_REVIEW_SAVE_RESET });
    } else {
      dispatch(detailsBlog(props.match.params.id));
    }
    return () => {
      //
    };
  }, [successSaveReview]);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveBlogReview(props.match.params.id, { comment, rating }));
  };
  const blogDetails = useSelector(state => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox message={error} />
  ) : (
    <div>
      <div className="back-to-results">
        <Link to="/"> ‹ Back to results</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={blog.imageUrl} alt="blog" />
        </div>
        <div className="details-info">
          <ul>
          <li>
              <div>{blog.headline}</div>
            </li>
            <li>
              <h3>{blog.blogPost}</h3>
            </li>
            <li>
              <a href="#reviews">
                <Rating
                  value={blog.rating}
                  text={`${blog.numReviews} reviews`}
                />
              </a>
            </li>
           
          </ul>
        </div>
        
      </div>
      <div className="content-margined">
        <h2>Reviews</h2>
        {blog.reviews.length === 0 && <div>There is no review.</div>}
        <ul id="reviews" className="review">
          {blog.reviews.map(review => (
            <li key={review._id}>
              <div>
                <b>{review.name}</b>
              </div>
              <div>
                <Rating value={review.rating} />
              </div>
              <div>{review.createdAt.substring(0, 10)}</div>
              <div>{review.comment}</div>
            </li>
          ))}
          <li>
            <h3>Write a customer reviews</h3>

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <ul className="form-container">
                  <li>
                    <label htmlFor="  ">Rating</label>
                    <select
                      required
                      value={rating}
                      name="rating"
                      id="rating"
                      onChange={e => setRating(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="1">1 = Poor</option>
                      <option value="2">2 = Fair</option>
                      <option value="3">3 = Good</option>
                      <option value="4">4 = Very Good</option>
                      <option value="5">5 = Excellent</option>
                    </select>
                  </li>
                  <li>
                    <label htmlFor="comment">Comment</label>

                    <textarea
                      required
                      value={comment}
                      name="comment"
                      id="comment"
                      onChange={e => setComment(e.target.value)}
                    />
                  </li>
                  <li>
                    <button type="submit" className="button primary">
                      Submit
                    </button>
                  </li>
                </ul>
              </form>
            ) : (
              <div>
                Please <Link to="/signin">Signin</Link> to write a review.
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
export default BlogScreen;
