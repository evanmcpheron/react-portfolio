import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationComponent = props => {
	const dynamicLink = (route, LinkText) => {
		return (
			<div className="nav-link-wrapper">
				<NavLink to={`/${route}`}>{LinkText}</NavLink>
			</div>
		);
	};

	const handleSignOut = () => {
		axios
			.delete("https://api.devcamp.space/logout", { withCredentials: true })
			.then(response => {
				if (response.status === 200) {
					props.history.push("/");
					props.handleSuccessfulLogout();
				}
				// return data;
			})
			.catch(error => {
				console.log("LOGOUT ERROR", error);
			});
	};

	return (
		<div className="nav-wrapper">
			<div className="left-side">
				<div className="nav-link-wrapper">
					<NavLink exact to="/">
						Home
					</NavLink>
				</div>
				<div className="nav-link-wrapper">
					<NavLink to="/about">About</NavLink>
				</div>

				<div className="nav-link-wrapper">
					<NavLink to="/contact">Contact</NavLink>
				</div>

				<div className="nav-link-wrapper">
					<NavLink to="/blog">Blog</NavLink>
				</div>

				{props.loggedInStatus === "LOGGED_IN"
					? dynamicLink("portfolio-manager", "Portfolio Manager")
					: null}
			</div>
			<div className="right-side">
				Evan McPheron
				{props.loggedInStatus === "LOGGED_IN" ? (
					<a className="logout-btn" onClick={handleSignOut}>
						{" "}
						<FontAwesomeIcon className="sign-icon" icon="sign-out-alt" />{" "}
					</a>
				) : null}
			</div>
		</div>
	);
};

export default withRouter(NavigationComponent);
