import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import {
  listArticles,
  saveArticle,
  deleteArticle,
} from '../actions/articleActions';

function ArticlesScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [articleHeadline, setarticleHeadline] = useState('');
  const [articleImg, setarticleImg] = useState('');
  const [articleLink, setarticleLink] = useState('');
  const [publication, setpublication] = useState('');

  const showModal = (article) => {
    setId(article._id);
    setarticleHeadline(article.articleHeadline);
    setarticleImg(article.articleImg);
    // setBrand(blog.brand);
    setarticleLink(article.articleLink);
    // setPrice(blog.price);
    setpublication(article.publication);
    // setCountInStock(blog.countInStock);
    setModalVisible(true);
  };

  const deleteHandler = (article) => {
    dispatch(deleteArticle(article));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveArticle({
        _id: id,
        articleHeadline,
        articleImg,
        articleLink,
        publication,
      }),
    );
  };
  const articleList = useSelector((state) => state.articleList);
  const articleSave = useSelector((state) => state.articleSave);
  const articleDelete = useSelector((state) => state.articleDelete);

  const { loading, articles, error } = articleList;
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = articleSave;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = articleDelete;

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }

    dispatch(listArticles());
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
        <h3>Articles</h3>
        <button
          type="button"
          className="button primary"
          onClick={() => showModal({})}
        >
          Create Article
        </button>
      </div>

      {modalVisible && (
        <div className="modal">
          <h3>Create Article</h3>
          {errorSave && <ErrorBox message={error} />}
          {loading && <LoadingBox />}
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <label htmlFor="articleHeadline">articleHeadline</label>
                <input
                  required
                  name="articleHeadline"
                  id="articleHeadline"
                  value={articleHeadline}
                  onChange={(e) => {
                    setarticleHeadline(e.target.value);
                  }}
                />
              </li>

              <li>
                <label htmlFor="articleImg">articleImg (680 X 830)</label>
                <input
                  name="articleImg"
                  id="articleImg"
                  value={articleImg}
                  onChange={(e) => {
                    setarticleImg(e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="articleLink">articleLink</label>
                <textarea
                  name="articleLink"
                  id="articleLink"
                  value={articleLink}
                  onChange={(e) => {
                    setarticleLink(e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="publication">publication</label>
                <textarea
                  name="publication"
                  id="publication"
                  value={publication}
                  onChange={(e) => {
                    setpublication(e.target.value);
                  }}
                />
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                  {' '}
                  Article
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
      {articles.length === 0 ? (
        <div className="empty-list">There is no articles.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>articleHeadline</th>
              <th>articleImg</th>
              <th>articleLink</th>
              <th>publication</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>{article._id}</td>
                <td>{article.articleHeadline}</td>
                <td>{article.articleImg}</td>
                <td>{article.articleLink}</td>
                <td>{article.publication}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => showModal(article)}
                    className="button"
                  >
                    Edit
                  </button>{' '}
                  <button
                    type="button"
                    onClick={() => deleteHandler(article)}
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
export default ArticlesScreen;
