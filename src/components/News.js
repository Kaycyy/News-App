import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
	static defaultProps = {
		country: "in",
		category: "general",
	};

	static propTypes = {
		country: PropTypes.string,
	};

	constructor() {
		super();
		this.state = {
			articles: [],
			loading: false,
			page: 1,
			pageSize: 15,
			totalResults: 0,
		};
	}

	async updateNews() {
		this.props.setProgress(0);
		const url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=21f0db1aefb5483c8f7059813e4f21bb&page=${this.state.page}&pageSize=${this.state.pageSize}`;
		this.setState({ loading: true });
		this.props.setProgress(30);
		let data = await fetch(url);
		this.props.setProgress(50);
		let parsedData = await data.json();
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
		});
		this.props.setProgress(70);

		document.title = this.handleCaps(this.props.category) + " - NewsMonkey";

		this.props.setProgress(100);
	}

	async componentDidMount() {
		this.updateNews();
	}

	fetchData = async () => {
		console.log("Fetched");
		this.setState({ page: this.state.page + 1 });
		const url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${
			this.props.country
		}&apiKey=21f0db1aefb5483c8f7059813e4f21bb&page=${this.state.page + 1}&pageSize=${
			this.state.pageSize
		}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: this.state.articles.concat(parsedData.articles),
			totalResults: parsedData.totalResults,
			loading: false,
		});
	};

	handleCaps = (element) => {
		return element.charAt(0).toUpperCase() + element.slice(1);
	};

	// handleNext = async () => {
	// 	// console.log("Next");

	// 	this.setState({
	// 		page: this.state.page + 1,
	// 	});
	// 	this.updateNews();
	// };

	// handlePrev = async () => {
	// 	this.setState({
	// 		page: this.state.page - 1,
	// 	});
	// 	this.updateNews();
	// };

	render() {
		return (
			<div className="container m-md-5">
				<h2
					className="text-center"
					style={{
						margin: "35px 0",
					}}>
					Top {this.handleCaps(this.props.category)} Headlines!
				</h2>
				<InfiniteScroll
					dataLength={this.state.articles.length} //This is important field to render the next data
					next={this.fetchData}
					hasMore={this.state.articles.length !== this.state.totalResults}
					loader={<Spinner />}>
					<div
						className="row"
						style={{
							margin: "0 auto",
						}}>
						{this.state.articles.map((element) => {
							return (
								<div className="col-md-4" key={element.url}>
									<NewsItem
										title={element.title}
										description={element.description}
										imageUrl={element.urlToImage}
										newsUrl={element.url}
										author={element.author}
										date={element.publishedAt}
									/>
								</div>
							);
						})}
					</div>
				</InfiniteScroll>

				{/* {!this.state.loading && (
					<nav aria-label="Page navigation example ">
						<ul className="pagination d-flex justify-content-center">
							<li className={`page-item ${this.state.page <= 1 ? "disabled" : ""}`}>
								<a className="page-link" href="#" aria-label="Previous" onClick={this.handlePrev}>
									<span aria-hidden="true">&laquo; Prev</span>
								</a>
							</li>
							<li
								className={`page-item ${
									Math.ceil(this.state.totalResults / this.state.pageSize) < this.state.page + 1
										? "disabled"
										: ""
								}`}>
								<a className="page-link" href="#" aria-label="Next" onClick={this.handleNext}>
									<span aria-hidden="true">Next &raquo;</span>
								</a>
							</li>
						</ul>
					</nav>
				)} */}
			</div>
		);
	}
}

export default News;
