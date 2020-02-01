import React, { Component } from "react";
import axios from "axios";
import PortfolioForm from "../portfolio/portfolio-form";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";

export default class PortfolioManager extends Component {
	constructor() {
		super();

		this.state = {
			portfolioItems: [],
            portfolioToEdit: [],
			isTop: false,
		};

		this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
		this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
		this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
        this.activateHeight();
	}

	clearPortfolioToEdit() {
		this.setState({
			portfolioToEdit: {}
		});
	}

	handleEditClick(portfolioItem) {
		this.setState({
			portfolioToEdit: portfolioItem
		});
	}

	handleDeleteClick(portfolioItem) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
				{
					withCredentials: true
				}
			)
			.then(response => {
				this.setState({
					portfolioItems: this.state.portfolioItems.filter(item => {
						return item.id !== portfolioItem.id;
					})
				});

				return response.data;
			})
			.catch(error => {
				console.log("handleDelete click error:", error);
			});
	}

	handleEditFormSubmission() {
		this.getPortfolioItems();
	}

	handleNewFormSubmission(portfolioItem) {
		this.setState({
			portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
		});
	}

	handleFormSubmissionError(error) {
		console.log("handleFormSubmissionError", error);
	}

	getPortfolioItems() {
		axios
			.get(
				"https://evan.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
				{
					withCredentials: true
				}
			)
			.then(response => {
				this.setState({
					portfolioItems: [...response.data.portfolio_items]
				});

				return response.data;
			})
			.catch(error => {
				console.log("error in getPortfolioItems", error);
			});
	}

	componentDidMount() {
		this.getPortfolioItems();
    }
    
	activateHeight() {
		window.onscroll = () => {
			document.addEventListener("scroll", () => {
				const isTop = window.scrollY < 90;
				if (isTop !== this.state.isTop) {
					this.setState({ isTop });
				}
			});
		};
	}

	render() {
		return (
			<div className="portfolio-manager-wrapper">
				<div style={!this.state.isTop ? {height:"100vh"} : null} className="left-column">
					<PortfolioForm
						handleNewFormSubmission={this.handleNewFormSubmission}
						handleFormSubmissionError={this.handleFormSubmissionError}
						clearPortfolioToEdit={this.clearPortfolioToEdit}
						portfolioToEdit={this.state.portfolioToEdit}
						handleEditFormSubmission={this.handleEditFormSubmission}
					/>
				</div>
				<div className="right-column">
					<PortfolioSidebarList
						handleDeleteClick={this.handleDeleteClick}
						data={this.state.portfolioItems}
						handleEditClick={this.handleEditClick}
					/>
				</div>
			</div>
		);
	}
}
