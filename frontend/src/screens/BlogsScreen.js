import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import {
  listBlogs,
  saveBlog,
  deleteBlog,
} from '../actions/blogActions';

function BlogsScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [headline, setheadline] = useState('');
  // const [brand, setBrand] = useState('');
  const [blogPost, setblogPost] = useState('');
  // const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  // const [countInStock, setCountInStock] = useState(0);
  const showModal = (blog) => {
    setId(blog._id);
    setimageUrl(blog.imageUrl);
    setheadline(blog.headline);
    // setBrand(blog.brand);
    setblogPost(blog.blogPost);
    // setPrice(blog.price);
    setCategory(blog.category);
    // setCountInStock(blog.countInStock);
    setModalVisible(true);
  };
  const uploadImageFile = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      })
      .then((response) => {
        setblogPost(response.data);
        setUploading(false);
      })
      .catch((response) => {
        console.log('Upload Error', response);
        setUploading(false);
      });
  };
  const deleteHandler = (blog) => {
    dispatch(deleteBlog(blog));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveBlog({
        _id: id,
        imageUrl,
        blogPost,
        headline,
      })
    );
  };
  const blogList = useSelector((state) => state.blogList);
  const blogSave = useSelector((state) => state.blogSave);
  const blogDelete = useSelector((state) => state.blogDelete);

  const { loading, blogs, error } = blogList;
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = blogSave;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = blogDelete;

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }

    dispatch(listBlogs());
    return () => {
      //
    };
  }, [successSave, successDelete]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox message={error} />
  ) : (
    <div className="content content-margined">
      <div className="blogs-header">
        <h3>Blogs</h3>
        <button
          type="button"
          className="button primary"
          onClick={() => showModal({})}
        >
          Create Blog
        </button>
      </div>

      {modalVisible && (
        <div className="modal">
          <h3>Create Blog</h3>
          {errorSave && <ErrorBox message={error} />}
          {loading && <LoadingBox />}
          <form onSubmit={submitHandler}>
            <ul className="form-container">
            <li>
                <label htmlFor="headline">headline</label>
                <input
                  required
                  name="headline"
                  id="headline"
                  value={headline}
                  onChange={(e) => {
                    setheadline(e.target.value);
                  }}
                />
              </li>
              
              <li>
                <label htmlFor="imageUrl">imageUrl (680 X 830)</label>
                <input
                  name="imageUrl"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => {
                    setimageUrl(e.target.value);
                  }}
                />
                <input
                  type="file"
                  name="imageFile"
                  onChange={uploadImageFile}
                />
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="blogPost">blogPost</label>
                <textarea
                  name="blogPost"
                  id="blogPost"
                  value={blogPost}
                  onChange={(e) => {
                    setblogPost(e.target.value);
                  }}
                />
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'} Blog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setModalVisible(false);
                  }}
                  className="button"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      {blogs.length === 0 ? (
        <div className="empty-list">There is no blogs.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>imageUrl</th>
              <th>headline</th>
              <th>blogPost</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog._id}</td>
                <td>{blog.imageUrl}</td>
                <td>{blog.headline}</td>
                <td>{blog.blogPost}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => showModal(blog)}
                    className="button"
                  >
                    Edit
                  </button>{' '}
                  <button
                    type="button"
                    onClick={() => deleteHandler(blog)}
                    className="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default BlogsScreen;
