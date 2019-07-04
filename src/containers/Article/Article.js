import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import './Article.css';
import ErrorNotFound from '../../components/ErrorNotFound/ErrorNotFound';

const Article = props => {
    const [article, setArticle] = useState({});

    const [error, setError] = useState(false);

    useEffect(() => {
        getArticle();
    }, []);

    const getArticle = () => {
        let articleUrl = props.location.pathname.split(/article\/(.+)/)[1];
        articleUrl = articleUrl + '?show-fields=body,thumbnail';

        axios.get(articleUrl).then((res) => {
            const article = res.data.response.content;

            let img;
            if (article.fields.thumbnail) {
                img = article.fields.thumbnail;
            }

            setArticle({body: article.fields.body, title: article.webTitle, img, url: article.id})
        }).catch(() => {
            setError(true);
        });
    };

    const onPinArticle = () => {
        const pinnedArticles = JSON.parse(localStorage.getItem('pinnedArticlesIds')) || [];

        if (!pinnedArticles.includes(article.url)) {
            pinnedArticles.push(article.url);
            localStorage.setItem('pinnedArticlesIds', JSON.stringify(pinnedArticles));
        }
    };

    return (
        <>
            {!error > 0 ? (
                <div className="article">
                    <div className="pin-box">
                        <i onClick={onPinArticle}  className="fas fa-thumbtack" />
                    </div>

                    <h1 className="article_title">{article.title}</h1>

                    {article.img && (<div className="article_img-box"><img src={article.img} alt="" /></div>)}

                    {ReactHtmlParser(article.body)}
                </div>
            ) : (
                <ErrorNotFound />
            )}
        </>
    )
};

export default Article;
