import React from "react";

export default function Headlines(props) {
  return props.headlines ? (
    <div className="headlines-div">
      <h2 className="headline-heading">Headlines</h2>
      {props.headlines.slice(0,9).map((article) => {
        return (
          <div className="article-div">
            <h5 className="article-source">{article.source.name}</h5>
            <span>
              {new Date(article.publishedAt).toDateString().slice(4, 10)}
            </span>
            <h6 className="article-description">{article.description}</h6>
          </div>
        );
      })}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
