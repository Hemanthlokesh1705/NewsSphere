import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Lodder from "./Lodder";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async fetchNews() {
    this.props.setProgress(0);
    this.setState({ loading: true });

    let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3f64a42ddba8492798649945dc9227e0&page=${this.state.page}&pageSize=6`;

    try {
      this.props.setProgress(50);
      let response = await fetch(api);
      let parsedData = await response.json();

      // Debugging: Log API response
      console.log("Fetched News:", parsedData);

      // Remove duplicate articles before updating state
      const uniqueArticles = parsedData.articles?.filter(
        (article, index, self) =>
          index === self.findIndex((a) => a.url === article.url) // Keep only first occurrence
      );

      this.setState({
        articles: [...this.state.articles, ...(uniqueArticles || [])],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });

      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    document.title = `NewsSphere - ${this.props.category} | ${this.props.country}`;
    await this.fetchNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      await this.fetchNews();
    });
  };

  render() {
    return (
      <div>
        <div className="container text-center mt-2 mb-2">
          <h2 className="d-5 my-3">NewsSphere - Top Headlines</h2>
        </div>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Lodder />}
        >
          <div className="container">
            <div className="row d-flex justify-content-around align-center">
              {this.state.articles
                .filter((article) => article) // Ensure no undefined values
                .map((element, index) => (
                  <div
                    className="col-12 col-md-4 my-4 d-flex justify-content-center"
                    key={element?.url ? `${element.url}-${index}` : `news-item-${index}`} // Ensure unique keys
                  >
                    <Newsitem
                      title={
                        element?.title
                          ? element.title.slice(0, 81) + "..."
                          : "No Title"
                      }
                      desc={
                        element?.description
                          ? element.description.slice(0, 100) + "..."
                          : "No Description"
                      }
                      imageurl={element?.urlToImage || "dummy.png"}
                      newsurl={element?.url || "#"}
                      authour={ element?.author
                        ? element.author.slice(0, 50) + "..."
                        :"No author"}
                      time={
                        element?.publishedAt
                          ? new Date(element.publishedAt).toLocaleString()
                          : "Unknown date"
                      }
                      sources={element?.source?.name || "Unknown"}
                    />
                  </div>
                ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
