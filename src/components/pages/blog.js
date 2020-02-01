import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);

        window.addEventListener("scroll", this.onScroll, false);

        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(
            this
        );
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        window.addEventListener("scroll", this.onScroll, false);
    }

    handleDeleteClick(blog) {
        axios
            .delete(
                `https://evan.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
                { withCredentials: true }
            )
            .then(response => {
                this.setState({
                    blogItems: this.state.blogItems.filter(blogItem => {
                        return blog.id !== blogItem.id;
                    })
                });
            })
            .catch(error => {
                console.log("handleDeleteClick() from blog.js", error);
            });
    }

    handleSuccessfulNewBlogSubmission(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        });
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        });
    }

    handleNewBlogClick() {
        this.setState({
            blogModalIsOpen: true
        });
    }

    onScroll() {
        const totalHeight = document.documentElement.offsetHeight;
        const currentScroll = Math.round(document.documentElement.scrollTop);
        const windowHeight = window.innerHeight;
        const sumHeight = windowHeight + currentScroll;

        if (
            this.state.isLoading ||
            this.state.blogItems.length === this.state.totalCount
        ) {
            return;
        } else if (sumHeight === totalHeight) {
            this.getBlogItems();
        }
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });

        axios
            .get(
                `https://evan.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
                {
                    withCredentials: true
                }
            )
            .then(response => {
                this.setState({
                    blogItems: this.state.blogItems.concat(
                        response.data.portfolio_blogs
                    ),
                    totalCount: response.data.meta.total_records,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log("getBlogItems: ", error);
            });
    }

    componentWillMount() {
        this.getBlogItems();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            if (this.props.loggedInStatus === "LOGGED_IN") {
                return (
                    <div key={blogItem.id} className="admin-blog-wrapper">
                        
                        <BlogItem key={blogItem.id} blogItem={blogItem} />
						<a
                            onDoubleClick={() =>
                                this.handleDeleteClick(blogItem)
                            }
                        >
                            <FontAwesomeIcon icon="trash" style={{color: "#922a2a"}}/>
                        </a>

                    </div>
                );
            } else {
                return <BlogItem key={blogItem.id} blogItem={blogItem} />;
            }
        });

        const paddingTop = {
            paddingTop: "2rem"
        };
        return (
            <div className="blog-container">
                <BlogModal
                    handleSuccessfulNewBlogSubmission={
                        this.handleSuccessfulNewBlogSubmission
                    }
                    handleModalClose={this.handleModalClose}
                    modalIsOpen={this.state.blogModalIsOpen}
                />

                {this.props.loggedInStatus === "LOGGED_IN" ? (
                    <div className="new-blog-link">
                        <a onClick={this.handleNewBlogClick}>
                            <FontAwesomeIcon icon="plus-circle" />
                        </a>
                    </div>
                ) : null}

                <div className="content-container" style={paddingTop}>
                    {blogRecords}
                    {this.state.blogItems.length < this.state.totalCount ? (
                        <h3 className="load-more">Load more posts</h3>
                    ) : (
                        <h3 className="load-more">No more posts 😑</h3>
                    )}
                </div>
                <div className="spinner">
                    {this.state.isLoading ? (
                        <FontAwesomeIcon icon="spinner" spin />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Blog;
