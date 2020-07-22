import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import {
  listArticles,
  saveArticle,
  deleteArticle
} from '../actions/articleActions';

function ArticlesScreen() {
  const dispatch = useDispatch();
  
  // const [id, setId] = useState('');
  // const [articleHeadline, setarticleHeadline] = useState('');
  // const [articleImg, setarticleImg] = useState('');
  // const [articleLink, setarticleLink] = useState('');
  // const [publication, setpublication] = useState('');
 
  
 
  const articleList = useSelector((state) => state.articleList);
  

  const { loading, articles, error } = articleList;
 

  useEffect(() => {
    
    dispatch(listArticles());
    return () => {
      //
    };
  }, []);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox message={error} />
  ) : (
    <div className="content content-margined">
     

     
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
