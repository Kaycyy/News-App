import React, { Component } from "react";

export class NewsItem extends Component {
	render() {
		let { title, description, imageUrl, newsUrl, author, date } = this.props;
		return (
			<div className="card my-3" style={{ width: "100%" }}>
				<img
					src={
						imageUrl
							? imageUrl
							: "https://cdn.wionews.com/sites/default/files/2023/01/19/326603-download-5.jpeg"
					}
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{title ? title.slice(0, 35) : ""}...</h5>
					<p className="card-text">{description ? description.slice(0, 85) : ""}...</p>
					<p className="card-text">
						<small className="text-muted">
							{author ? author : "Unknown"} and {new Date(date).toGMTString()}
						</small>
					</p>
					<a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
						Read More
					</a>
				</div>
			</div>
		);
	}
}

export default NewsItem;
