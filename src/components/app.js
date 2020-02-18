import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Icons from "../helpers/icons";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./catch-all";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faTwitter,
    faGithub
} from "@fortawesome/free-brands-svg-icons";

export default class App extends Component {
    constructor(props) {
        super(props);

        Icons();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            mobileMode: "DESKTOP_MODE"
        };

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
        this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    }

    handleSuccessfulLogin() {
        this.setState({
            loggedInStatus: "LOGGED_IN"
        });
    }

    handleUnsuccessfulLogin() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
        });
    }

    handleSuccessfulLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
        });
    }

    checkLoginStatus() {
        return axios
            .get("https://api.devcamp.space/logged_in", {
                withCredentials: true
            })
            .then(response => {
                const loggedIn = response.data.logged_in;
                const loggedInStatus = this.state.loggedInStatus;

                // If loggedIn and status LOGGED_IN => return data
                // If loggedIn status NOT_LOGGED_IN => update state
                // If not loggedIn and status LOGGED_IN => update state

                if (loggedIn && loggedInStatus === "LOGGED_IN") {
                    return loggedIn;
                } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
                    this.setState({
                        loggedInStatus: "LOGGED_IN"
                    });
                } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
                    this.setState({
                        loggedInStatus: "NOT_LOGGED_IN"
                    });
                }
            })
            .catch(error => {
                console.log("Error", error);
            });
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    authorizedPages() {
        return [
            <Route
                key="portfolio-manager"
                path="/portfolio-manager"
                component={PortfolioManager}
            />
        ];
    }

    updateDimensions() {
        if(window.innerWidth <= 900) {
          this.setState({ mobileMode: "MOBILE_MODE" });
        } else {
          this.setState({ mobileMode: "DESKTOP_MODE" });
        }
      }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
      }
    
     
      componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
      }

    render() {
        const iconStyle = {
            position: "fixed",
            zIndex: "999",
            bottom: "2rem",
            right: "2rem"
        };

        return (
            <div className="container">
                <Router>
                    <div>
                        <NavigationContainer
                            loggedInStatus={this.state.loggedInStatus}
                            handleSuccessfulLogout={this.handleSuccessfulLogout}
                            mobileMode={this.state.mobileMode}
                        />

                        <div style={iconStyle}>
                            <a
                                href="https://github.com/evanmcpheron"
                                target="_blank"
                                className="social-media-link"
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/evan-mcpheron/"
                                target="_blank"
                                className="social-media-link"
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a
                                href="https://twitter.com/EvanMcPheron"
                                target="_blank"
                                className="social-media-link"
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </div>

                        <Switch>
                            <Route exact path="/" component={Home} />

                            <Route
                                path="/auth"
                                render={props => (
                                    <Auth
                                        {...props}
                                        handleSuccessfulLogin={
                                            this.handleSuccessfulLogin
                                        }
                                        handleUnsuccessfulLogin={
                                            this.handleUnsuccessfulLogin
                                        }
                                    />
                                )}
                            />

                            <Route path="/about" component={About} />

                            <Route
                                path="/blog"
                                render={props => (
                                    <Blog
                                        {...props}
                                        loggedInStatus={
                                            this.state.loggedInStatus
                                        }
                                    />
                                )}
                            />

                            <Route
                                path="/b/:slug"
                                render={props => (
                                    <BlogDetail
                                        {...props}
                                        loggedInStatus={
                                            this.state.loggedInStatus
                                        }
                                    />
                                )}
                            />

                            <Route path="/contact" component={Contact} />

                            {this.state.loggedInStatus === "LOGGED_IN"
                                ? this.authorizedPages()
                                : null}

                            <Route
                                exact
                                path="/portfolio/:slug"
                                component={PortfolioDetail}
                            />
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
