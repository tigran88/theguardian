import React from 'react';

import './ArticleItem.css';

const ArticleItem = (props) => {
    return (
        <div className="article">
            <img className="article__img" src={props.article.fields.thumbnail} alt=""/>
            <div className="article__title">
                { props.article.webTitle }
            </div>
            <div className="article__category">{ props.article.sectionName }</div>
        </div>
    )
};

export default ArticleItem;
