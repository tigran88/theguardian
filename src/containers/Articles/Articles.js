import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";

import { useInterval } from '../../hooks/interval';
import './Articles.css';
import ArticleItem from '../../components/ArticleItem/ArticleItem';
import PinnedArticleItem from '../../components/PinnedArticleItem/PinnedArticleItem';

const Articles = () => {
    const [pinnedArticles, setPinnedArticles] = useState([]);

    const [newPublicationDate, setNewPublicationDate] = useState('');

    const [articles, setArticles] = useState([]);

    const [page, setPage] = useState(1);

    const [isNotificationExisted, setIsNotificationExisted] = useState(false);

    useInterval(() => {
        checkNewItems();
    }, 30000);

    useEffect(() => {
        getPinnedArticles();

        getArticles();
    }, []);

    const getArticles = () => {
        axios.get('search?show-fields=thumbnail&page-size=18&page=' + page)
            .then((res) => {
                setNewPublicationDate(res.data.response.results[0]['webPublicationDate']);

                setArticles(res.data.response.results);
            });
    };

    const getPinnedArticles = () => {
        const pinnedArticlesIds = JSON.parse(localStorage.getItem('pinnedArticlesIds')) || [];

        if (pinnedArticlesIds.length > 0) {
            axios.get('search?show-fields=thumbnail&ids=' + pinnedArticlesIds.join(",")).then((res) => {
                setPinnedArticles(res.data.response.results);
            });
        }
    };

    const fetchMoreArticles = () => {
        setTimeout(() => {
            const newPage = page + 1;
            setPage(page => (page + 1));

            axios.get('search?show-fields=thumbnail&page-size=18&page=' + newPage)
                .then((res) => {
                    setArticles([...articles, ...res.data.response.results]);
            });
        }, 1500);
    };

    const checkNewItems = () => {
        axios.get('search?show-fields=thumbnail&from-date=' + newPublicationDate)
            .then((res) => {
                const articlesArr = res.data.response.results;

                let newArticles = articlesArr.splice(0, articlesArr.length - 1);

                newArticles = newArticles.filter(article => {
                    return !articles.some(item => item.id === article.id)
                });

                if (newArticles.length > 0) {
                    newArticles.map((article) => {
                        article.new = true;
                        return  article;
                    });

                    setNewPublicationDate(newArticles[0]['webPublicationDate']);
                    setArticles([...newArticles, ...articles]);
                    setIsNotificationExisted(true)
                }
            });
    };

    const onScrollToArticles = () => {
        document.getElementById('root').scrollIntoView({ behavior: "smooth" });
        setIsNotificationExisted(false);
    };

    return (
        <div className="articles">
            {isNotificationExisted && <div onClick={onScrollToArticles} className="articles__bell"><i className="fas fa-bell" /></div>}

            {pinnedArticles.length > 0 && (
                <div className="pinned-articles">
                    {pinnedArticles.map((article) => (
                        <PinnedArticleItem key={article.id} article={article} />
                    ))}
                </div>
            )}

            {articles.length > 0 && (
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreArticles}
                hasMore={true}
                loader={<div className="loader"><i className="fas fa-spinner fa-spin"/></div>}
            >
                {articles.map((article, index) => (
                    <ArticleItem key={index + article.id} article={article} />
                ))}
            </InfiniteScroll>
            )}
        </div>
    )
};

export default Articles;
