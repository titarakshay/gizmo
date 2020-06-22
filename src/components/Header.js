import React from "react";
import Sources from "./Sources";
import Footer from "./Footer";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchArticles: null,
      newsSources: null,
      customFeed: null,
      headlines: null,
    };
  }
  componentDidMount() {
    var promise1 = fetch(
      "https://newsapi.org/v2/sources?language=en&country=us&apiKey=540ed52664374c5f8a0b7c24fc451d72"
    )
      .then((res) => res.json())
      .then((data) => data);
    var promise2 = fetch(
      "https://newsapi.org/v2/everything?sources=the-times-of-india&pageSize=100&apiKey=540ed52664374c5f8a0b7c24fc451d72"
    )
      .then((res) => res.json())
      .then((data) => data);
    var promise3 = fetch(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=540ed52664374c5f8a0b7c24fc451d72"
    )
      .then((res) => res.json())
      .then((data) => data.articles);

    Promise.all([promise1, promise2, promise3]).then((values) => {
      var newsSources = this.random(values[0].sources, 10);
      var customFeed = this.random(values[1].articles, 30);
      var headlines = this.random(values[2], 13);
      this.setState({ newsSources, customFeed, headlines });
    });
  }
  random = (data, count = 0) => {
    var sourcesArray = [];

    for (let i = 0; i < count; i++) {
      var n = Math.floor(Math.random() * Math.floor(data.length));
      sourcesArray.push(data[n]);
    }
    var uniqueArray = [];

    // Loop through array values
    for (var value of sourcesArray) {
      if (uniqueArray.indexOf(value) === -1) {
        uniqueArray.push(value);
      }
    }
    
    return uniqueArray;
  };

  //   feed news by sources
  feedNews = (id) => {
    fetch(
      `
      https://newsapi.org/v2/everything?sources=${id}&apiKey=540ed52664374c5f8a0b7c24fc451d72`
    )
      .then((res) => res.json())
      .then((Sourcedata) => this.setState({ customFeed: Sourcedata.articles }));
  };

  // handle search submit
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`
    https://newsapi.org/v2/everything?q=${this.state.search}&apiKey=540ed52664374c5f8a0b7c24fc451d72`)
      .then((res) => res.json())
      .then((data) => this.setState({ customFeed: data.articles }));
  };

  // handle change word
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
      
    return this.state.newsSources ? (
      <>
        <div className="heading">
          <h1>GIZMO</h1>
          <div className="search-en">
            <form className="search-form">
              <input
                type="text"
                name="search"
                onChange={this.handleChange}
                value={this.state.search}
              />
              <button type="submit" onClick={this.handleSubmit}>
               Search
              </button>
            </form>
            <button className="en">EN</button>
          </div>
        </div>

        <div>
          <button
            onClick={() => this.feedNews("the-times-of-india")}
            className="source-btn"
          >
            India
          </button>
          {this.state.newsSources.slice(0, 5).map((source) => {
            return (
              <button
                onClick={() => this.feedNews(source.id)}
                className="source-btn"
              >
                {source.name}
              </button>
            );
          })}
        </div>
        <Sources
          customFeed={this.state.customFeed}
          headlines={this.state.headlines}
        />
        <Footer/>
      </>
    ) : (
      <div className="loading">
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
