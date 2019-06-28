import React, { useState, useEffect} from 'react';
import axios from 'axios';

import './Articles.css';
import ArticleItem from '../../components/ArticleItem/ArticleItem';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('search?api-key=test&show-fields=thumbnail')
            .then((res) => {
                setArticles(res.data.response.results);
            })
            .catch(() => {});
    }, []);

    return (
        <div className="articles">
            {articles.map((article) => (
                <ArticleItem key={article.id} article={article} />
            ))}
        </div>
    )
};

export default Articles;
