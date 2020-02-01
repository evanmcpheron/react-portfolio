import React, { Component } from "react";
import ReactModal from "react-modal";
import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper"); //For screen readers. pass class name from index.html as arg

export default class BlogModal extends Component {
	constructor(props) {
		super(props);

		this.customStyles = {
			content: {
				top: "50%",
				left: "50%",
				right: "auto",
				marginRight: "-50%",
				transform: "translate(-50%, -50%)",
				width: "900px",
                backgroundColor: "#dfdfdf",
                height: "80%"
			},
			overlay: {
				backgroundColor: "rgba(1,1,1,.7)"
			}
		};

		this.handleSuccessfullFormSubmission = this.handleSuccessfullFormSubmission.bind(
			this
		);
	}

	handleSuccessfullFormSubmission(blog) {
		this.props.handleSuccessfulNewBlogSubmission(blog);
	}

	render() {
		return (
			<ReactModal
				style={this.customStyles}
				onRequestClose={() => {
					this.props.handleModalClose();
				}}
				isOpen={this.props.modalIsOpen}
			>
				<BlogForm
					handleSuccessfullFormSubmission={this.handleSuccessfullFormSubmission}
				/>
			</ReactModal>
		);
	}
}
