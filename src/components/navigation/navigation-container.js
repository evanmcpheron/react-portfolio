import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class NavigationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleSignOut = this.handleSignOut.bind(this);
        this.hideNav = this.hideNav.bind(this);
    }
    mobile = this.props.mobileMode;

    hideNav() {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    dynamicLink = (route, LinkText) => {
        return (
            <div className="nav-link-wrapper mobile">
                <NavLink to={`/${route}`} onClick={this.hideNav}>
                    {LinkText}
                </NavLink>
            </div>
        );
    };

    handleSignOut = () => {
        axios
            .delete("https://api.devcamp.space/logout", {
                withCredentials: true
            })
            .then(response => {
                if (response.status === 200) {
                    this.props.history.push("/");
                    this.props.handleSuccessfulLogout();
                }
                // return data;
            })
            .catch(error => {
                console.log("LOGOUT ERROR", error);
            });
    };

  

    isMobile = () => {};

    mobileStyleContainer = {
        fontSize: "2.75rem",
        background: "#dfdfdf",
        textAlign: "center",
        position: "fixed",
        top: "200px",
        left: "0",
        width: "100vw",
        zIndex: "500"
    };

    render() {
        return (
            <div className="navigation-component-wrapper">
                {/* NAVIGATION OPEN */}
                {this.props.mobileMode === "MOBILE_MODE" ? (
                    <div style={{ position: "relative" }}>
                        {this.state.open ? (
                            <FontAwesomeIcon
                                // OPEN ICON
                                icon={faBars}
                                style={{
                                    zIndex: "999",
                                    position: "fixed",
                                    fontSize: "3rem",
                                    color: "#dfdfdf",
                                    cursor: "pointer",
                                    marginTop: "2rem",
                                    marginLeft: "2rem",
                                    color: "#222"
                                }}
                                onClick={this.hideNav}
                            />
                        ) : (
                            <FontAwesomeIcon
                                // CLOSED ICON
                                icon={faBars}
                                style={{
                                    zIndex: "799",
                                    position: "fixed",
                                    fontSize: "3rem",
                                    color: "#26bfd4",
                                    cursor: "pointer",
                                    marginTop: "2rem",
                                    marginLeft: "2rem"
                                }}
                                onClick={this.hideNav}
                            />
                        )}
                        {this.state.open ? (
                            <div>
                                <div
                                    // OPEN NAV STATE
                                    onClick={this.hideNav}
                                    style={{
                                        position: "fixed",
                                        top: "0",
                                        left: "0",
                                        zIndex: "300",
                                        height: "100vh",
                                        width: "100vw",
                                        backgroundColor: "#26bfd4",
                                        opacity: ".4",
                                        cursor: "pointer"
                                    }}
                                ></div>
                                <div
                                    style={{
                                        fontSize: "2.75rem",
                                        background: "#dfdfdf",
                                        textAlign: "center",
                                        position: "fixed",
                                        top: "0px",
                                        left: "0",
                                        width: "100vw",
                                        zIndex: "500"
                                    }}
                                >
                                    <div className="nav-link-wrapper mobile">
                                        <NavLink
                                            exact
                                            to="/"
                                            onClick={this.hideNav}
                                        >
                                            Home
                                        </NavLink>
                                    </div>
                                    <div className="nav-link-wrapper mobile">
                                        {/* <NavLink
                                            to="/about"
                                            onClick={this.hideNav}
                                        >
                                            About
                                        </NavLink> */}
                                    </div>

                                    <div className="nav-link-wrapper mobile">
                                        <NavLink
                                            to="/contact"
                                            onClick={this.hideNav}
                                        >
                                            Contact
                                        </NavLink>
                                    </div>

                                    <div className="nav-link-wrapper mobile">
                                        <NavLink
                                            to="/blog"
                                            onClick={this.hideNav}
                                        >
                                            Blog
                                        </NavLink>
                                    </div>

                                    {this.props.loggedInStatus === "LOGGED_IN"
                                        ? this.dynamicLink(
                                              "portfolio-manager",
                                              "Portfolio Manager"
                                          )
                                        : null}
                                    <h2
                                        style={{ marginBottom: "1.5rem" }}
                                        className="mobile"
                                    >
                                        Evan McPheron
                                    </h2>

                                    {this.props.loggedInStatus ===
                                    "LOGGED_IN" ? (
                                        <a
                                            className="logout-btn"
                                            onClick={this.handleSignOut}
                                        >
                                            <FontAwesomeIcon
                                                className="sign-icon"
                                                icon="sign-out-alt"
                                            />
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        ) : (
                            // CLOSED MOBILE NAV
                            <div>
                                <div
                                    // OPEN NAV STATE
                                    onClick={this.hideNav}
                                    style={{
                                        position: "fixed",
                                        top: "0",
                                        left: "0",
                                        zIndex: "300",
                                        height: "100vh",
                                        width: "100vw",
                                        backgroundColor: "#222222",
                                        opacity: ".7",
                                        display: "none"
                                    }}
                                ></div>
                                <div
                                    style={{
                                        fontSize: "2.75rem",
                                        background: "#dfdfdf",
                                        textAlign: "center",
                                        position: "fixed",
                                        top: "-300px",
                                        left: "0",
                                        width: "100vw",
                                        zIndex: "500"
                                    }}
                                >
                                    <div className="nav-link-wrapper mobile">
                                        <NavLink
                                            exact
                                            to="/"
                                            onClick={this.hideNav}
                                        >
                                            Home
                                        </NavLink>
                                    </div>
                                    <div className="nav-link-wrapper mobile">
                                        <NavLink
                                            to="/about"
                                            onClick={this.hideNav}
                                        >
                                            About
                                        </NavLink>
                                    </div>

                                    <div className="nav-link-wrapper mobile">
                                        <NavLink
                                            to="/contact"
                                            onClick={this.hideNav}
                                        >
                                            Contact
                                        </NavLink>
                                    </div>

                                    <div className="nav-link-wrapper mobile">
                                        <NavLink
                                            to="/blog"
                                            onClick={this.hideNav}
                                        >
                                            Blog
                                        </NavLink>
                                    </div>

                                    {this.props.loggedInStatus === "LOGGED_IN"
                                        ? this.dynamicLink(
                                              "portfolio-manager",
                                              "Portfolio Manager"
                                          )
                                        : null}
                                    <h2
                                        // style={{ fontSize: "4rem" }}
                                        className="mobile"
                                    >
                                        Evan McPheron
                                    </h2>

                                    {this.props.loggedInStatus ===
                                    "LOGGED_IN" ? (
                                        <a
                                            className="logout-btn"
                                            onClick={this.handleSignOut}
                                        >
                                            <FontAwesomeIcon
                                                className="sign-icon"
                                                icon="sign-out-alt"
                                            />
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="nav-wrapper">
                        <div className="left-side">
                            <div className="nav-link-wrapper">
                                <NavLink exact to="/">
                                    Home
                                </NavLink>
                            </div>
                            {/* <div className="nav-link-wrapper">
                                <NavLink to="/about">About</NavLink>
                            </div> */}

                            <div className="nav-link-wrapper">
                                <NavLink to="/contact">Contact</NavLink>
                            </div>

                            <div className="nav-link-wrapper">
                                <NavLink to="/blog">Blog</NavLink>
                            </div>

                            {this.props.loggedInStatus === "LOGGED_IN"
                                ? this.dynamicLink(
                                      "portfolio-manager",
                                      "Portfolio Manager"
                                  )
                                : null}
                        </div>
                        <div className="right-side">
                            <h2 style={{ display: "initial" }}>
                                Evan McPheron
                            </h2>

                            {this.props.loggedInStatus === "LOGGED_IN" ? (
                                <a
                                    className="logout-btn"
                                    onClick={this.handleSignOut}
                                >
                                    <FontAwesomeIcon
                                        className="sign-icon"
                                        icon="sign-out-alt"
                                    />
                                </a>
                            ) : null}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(NavigationComponent);
