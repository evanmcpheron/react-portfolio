import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Route, Switch, Router } from 'react-router-dom';
import axios from 'axios';
import Icons from '../helpers/icons';

import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogDetail from './pages/blog-detail';
import PortfolioManager from './pages/portfolio-manager';
import PortfolioDetail from './portfolio/portfolio-detail';
import Auth from './pages/auth';
import NoMatch from './catch-all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedin,
    faTwitter,
    faGithub
} from '@fortawesome/free-brands-svg-icons';
import { createBrowserHistory } from 'history';

ReactGA.initialize('UA-80246531-3', {
    debug: false,
    titleCase: false,
    gaOptions: {
        userId: 123
    }
});

const history = createBrowserHistory();
history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});

export default class App extends Component {
    constructor(props) {
        super(props);

        Icons();

        this.state = {
            loggedInStatus: 'NOT_LOGGED_IN'
        };

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
        this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    }

    componentWillMount() {
        console.log(window.location.pathname + window.location.search);
    }

    handleSuccessfulLogin() {
        this.setState({
            loggedInStatus: 'LOGGED_IN'
        });
    }

    handleUnsuccessfulLogin() {
        this.setState({
            loggedInStatus: 'NOT_LOGGED_IN'
        });
    }

    handleSuccessfulLogout() {
        this.setState({
            loggedInStatus: 'NOT_LOGGED_IN'
        });
    }

    checkLoginStatus() {
        return axios
            .get('https://api.devcamp.space/logged_in', {
                withCredentials: true
            })
            .then(response => {
                const loggedIn = response.data.logged_in;
                const loggedInStatus = this.state.loggedInStatus;

                // If loggedIn and status LOGGED_IN => return data
                // If loggedIn status NOT_LOGGED_IN => update state
                // If not loggedIn and status LOGGED_IN => update state

                if (loggedIn && loggedInStatus === 'LOGGED_IN') {
                    return loggedIn;
                } else if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
                    this.setState({
                        loggedInStatus: 'LOGGED_IN'
                    });
                } else if (!loggedIn && loggedInStatus === 'LOGGED_IN') {
                    this.setState({
                        loggedInStatus: 'NOT_LOGGED_IN'
                    });
                }
            })
            .catch(error => {
                console.log('Error', error);
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

    componentDidMount() {
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        const iconStyle = {
            position: 'fixed',
            zIndex: '999',
            bottom: '2rem',
            right: '2rem'
        };

        return (
            <div className="container">
                <Router history={history}>
                    <div>
                        <NavigationContainer
                            loggedInStatus={this.state.loggedInStatus}
                            handleSuccessfulLogout={this.handleSuccessfulLogout}
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

                            {this.state.loggedInStatus === 'LOGGED_IN'
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
