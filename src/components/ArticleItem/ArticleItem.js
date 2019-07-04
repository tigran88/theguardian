import React from 'react';
import { Link } from 'react-router-dom';

import './ArticleItem.css';

const ArticleItem = props => {
    let className = '';
    if (props.article.new) {
        className = 'article-item__new-article';
    }

    return (
        <Link to={`article/${props.article.id}`} className={`article-item ${className}`}>
            {props.article.fields && (
                <img className="article-item__img" src={props.article.fields.thumbnail} alt=""/>
            )}

            <div className="article-item__title">
                { props.article.webTitle }
            </div>

            <div className="article-item__footer-box">
                <div className="article-item__category">{ props.article.sectionName }</div>
            </div>

            {props.article.new && <div className="article-item__new-box">NEW</div>}
        </Link>
    )
};

export default ArticleItem;
