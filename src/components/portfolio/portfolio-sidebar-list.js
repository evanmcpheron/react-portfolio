import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PorfolioSidebarList = props => {
	const portfolioList = props.data.map(portfolioItem => {
		return (
			<div key={portfolioItem.id} className="portfolio-item-thumb">
				<div className="portfolio-thumb-img">
					<img src={portfolioItem.thumb_image_url} />
				</div>
				<div className="port-item-wrapper">
					<h1 className="title">{portfolioItem.name}</h1>
					{/* <h2>{portfolioItem.id}</h2> */}
                    
                    <div className="actions">
					<a onClick={() => props.handleEditClick(portfolioItem)}>
						<FontAwesomeIcon className="icon-edit icon" icon="edit" />
					</a>
					<a onDoubleClick={() => props.handleDeleteClick(portfolioItem)}>
						<FontAwesomeIcon className="icon-trash icon" icon="trash" />
					</a>
                    </div>
				</div>
			</div>
		);
	});

	return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PorfolioSidebarList;
