import React from 'react';
import { Link } from 'react-router-dom';

import './PinnedArticleItem.css';

const PinnedArticleItem = props => {
    return (
        <Link to={`article/${props.article.id}`} className="pinned-article">
            {props.article.fields && (
                <img className="pinned-article__img" src={props.article.fields.thumbnail} alt=""/>
            )}

            <div className="pinned-article__title">
                { props.article.webTitle }
            </div>

            <div className="pinned-article__category">{ props.article.sectionName }</div>
        </Link>
    )
};

export default PinnedArticleItem;
