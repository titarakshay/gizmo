import React from "react";

export default function Topnews(props) {
  
  return (
    <div className="topnews-div">
      {props.news ? (
        <>
          <div className="singleNews-div">
            <div className="news-img">
              <img
                src={props.news[0] ? props.news[0].urlToImage : ""}
              />
            </div>
            <div className="article-div newsdiv">
              <h5 className="article-source">{props.news[0].source.name}</h5>
              <span>
                {new Date(props.news[0].publishedAt)
                  .toDateString()
                  .slice(4, 10)}
              </span>
              <h6 className="article-description">
                {props.news[0].description}
              </h6>
              <p className="para-news">{props.news[0].content}</p>
              <button className="read-more">Read More</button>
            </div>
          </div>
          <h2 className='news-tab'>Top news</h2>
          <div className="news-grid">
            {props.news.slice(1, 13).map((article, index) => {
              return (
                <div className="news-div">
                  <div className="news-img">
                    <img src={article ? article.urlToImage : ""} />
                  </div>
                  <div className="article-div bottom-line">
                    <h5 className="article-source">{article.source.name}</h5>
                    <span>
                      {new Date(article.publishedAt)
                        .toDateString()
                        .slice(4, 10)}
                    </span>
                    <h6 className="article-description">
                      {article.description}
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="next-news">
            <h2 className='news-tab'>The Next Web</h2>
            <div className="news-grid">
              {props.news.slice(14, 17).map((article, index) => {
                return (
                  <div className="news-div">
                    <div className="news-img">
                      <img src={article.urlToImage ? article.urlToImage : ""} />
                    </div>
                    <div className="article-div bottom-line">
                      <h5 className="article-source">{article.source.name}</h5>
                      <span>
                        {new Date(article.publishedAt)
                          .toDateString()
                          .slice(4, 10)}
                      </span>
                      <h6 className="article-description">
                        {article.description}
                      </h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
