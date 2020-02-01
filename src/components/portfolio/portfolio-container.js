import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";
import axios from "axios";

export default class PortfolioContainer extends Component {
	constructor() {
		super();

		this.state = {
			pageTitle: "Welcome to my portfolio.",
			isLoading: false,
			data: []
		};

		this.handleFilter = this.handleFilter.bind(this);
	}

	getPortfolioItems() {
		axios
			.get("https://evan.devcamp.space/portfolio/portfolio_items")
			.then(response => {
				this.setState({
					data: response.data.portfolio_items
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	handleFilter(filter) {
		this.setState({
			data: this.state.data.filter(item => {
				return item.category === filter;
			})
		});
	}

	portfolioItems() {
		return this.state.data.map(item => {
			return (
				<div key={item.id} className="portfolio-item-container">
					<PortfolioItem item={item} />
				</div>
			);
		});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		}

		return (
			<div className="portfolio-items-wrapper">
				{/* <button className="btn" onClick={() => this.handleFilter("Scheduling")}>
					Scheduling
				</button>
				<button className="btn" onClick={() => this.handleFilter("eCommerce")}>
					eCommerce
				</button>
				<button className="btn" onClick={() => this.handleFilter("Enterprise")}>
					Enterprise
				</button> */}

				{this.portfolioItems()}
			</div>
		);
	}
}
