import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from '../actions/productActions';

function ProductsScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [headline, setheadline] = useState('');
  // const [brand, setBrand] = useState('');
  const [linkUrl, setlinkUrl] = useState('');
  // const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  // const [countInStock, setCountInStock] = useState(0);
  const showModal = (product) => {
    setId(product._id);
    setimageUrl(product.imageUrl);
    setheadline(product.headline);
    // setBrand(product.brand);
    setlinkUrl(product.linkUrl);
    // setPrice(product.price);
    setCategory(product.category);
    // setCountInStock(product.countInStock);
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
        setlinkUrl(response.data);
        setUploading(false);
      })
      .catch((response) => {
        console.log('Upload Error', response);
        setUploading(false);
      });
  };
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        imageUrl,
        linkUrl,
        headline,
      })
    );
  };
  const productList = useSelector((state) => state.productList);
  const productSave = useSelector((state) => state.productSave);
  const productDelete = useSelector((state) => state.productDelete);

  const { loading, products, error } = productList;
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }

    dispatch(listProducts());
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
      <div className="products-header">
        <h3>Products</h3>
        <button
          type="button"
          className="button primary"
          onClick={() => showModal({})}
        >
          Create Product
        </button>
      </div>

      {modalVisible && (
        <div className="modal">
          <h3>Create Product</h3>
          {errorSave && <ErrorBox message={error} />}
          {loading && <LoadingBox />}
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <label htmlFor="linkUrl">linkUrl</label>
                <input
                  name="linkUrl"
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => {
                    setlinkUrl(e.target.value);
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
                <label htmlFor="headline">headline</label>
                <textarea
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
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'} Product
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
      {products.length === 0 ? (
        <div className="empty-list">There is no products.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>imageUrl</th>
              <th>headline</th>
              <th>linkUrl</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.imageUrl}</td>
                <td>{product.headline}</td>
                <td>{product.linkUrl}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => showModal(product)}
                    className="button"
                  >
                    Edit
                  </button>{' '}
                  <button
                    type="button"
                    onClick={() => deleteHandler(product)}
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
export default ProductsScreen;
