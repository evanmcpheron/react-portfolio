import React, { Component } from "react";
import axios from "axios";

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItem: {}
        };
    }

    componentWillMount() {
        this.getPortfolioItem();
    }

    getPortfolioItem() {
        axios
            .get(
                `https://evan.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,
                { withCredentials: true }
            )
            .then(response => {
                this.setState({
                    portfolioItem: response.data.portfolio_item
                });
            })
            .catch(error => {
                console.log("getPortfolioItem from portfolio-detail.js", error);
            });
    }
    render() {
        const {
            banner_image_url,
            category,
            description,
            logo_url,
            name,
            thumb_image_url,
            url
		} = this.state.portfolioItem;
		
		const bannerStyles = {
			backgroundImage: `url(${banner_image_url})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			height: "40vh"
		}

        return (
            <div className="portfolio-detail-wrapper">
                <div className="banner" style={bannerStyles}>
                </div>
                <div className="portfolio-detail-description-wrapper">
                    <div className="description">{description}</div>
                </div>

                <div className="bottom-content-wrapper">
                    <a href={url} target="_blank" className="site-link">
						Visit {name}
					</a>
                </div>
            </div>
        );
    }
}
