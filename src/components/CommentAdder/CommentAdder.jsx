import React, { Component } from "react";
import { postComment } from "../../api.js";

class CommentAdder extends Component {
	state = {
		body: ""
	};
	render() {
		const { body } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="body">Comment:</label>
				<input
					type="text"
					name="body"
					id="body"
					value={body}
					onChange={this.handleChange}
				/>
				<button>Add Comment</button>
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
