import React, { Component } from "react";
import { postComment } from "../../api.js";
import styles from "./CommentAdder.module.css";

class CommentAdder extends Component {
	state = {
		body: ""
	};
	render() {
		const { body } = this.state;
		return (
			<form onSubmit={this.handleSubmit} className={styles.adder}>
				<textarea
					type="text"
					name="body"
					id="body"
					value={body}
					onChange={this.handleChange}
					rows="4"
					cols="30"
					placeholder="Add your own witty musings!"
					required
				/>
				<p>
					<button>Add Comment</button>
				</p>
			</form>
		);
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const { body } = this.state;
		const { id, LoggedInUser, addNewComment } = this.props;
		postComment(id, { body, username: LoggedInUser }).then(comment => {
			addNewComment(comment);
		});
		this.setState({
			body: ""
		});
	};
}

export default CommentAdder;
