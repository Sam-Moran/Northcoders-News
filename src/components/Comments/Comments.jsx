import styles from "./Comments.module.css";
import { Link } from "@reach/router";
import { articleComments } from "../../api";

import React, { Component } from "react";
import CommentAdder from "../CommentAdder/CommentAdder";

class Comments extends Component {
	state = {
		comments: []
	};
	render() {
		const { comments } = this.state;
		return (
			<div>
				{comments.map(comment => {
					const { comment_id, author, votes, created_at, body } = comment;
					const time = new Date(created_at);
					return (
						<ul>
							<li key={comment_id}>
								<div>
									<b>
										<Link to={`/${author}/articles`}>{author}</Link> @{" "}
										{time.toDateString()}{" "}
									</b>
									{time.toLocaleTimeString()}:
								</div>
								{body}
							</li>
						</ul>
					);
				})}
				<CommentAdder
					LoggedInUser={this.props.LoggedInUser}
					id={this.props.id}
					addNewComment={this.addNewComment}
				/>
			</div>
		);
	}
	componentDidMount() {
		articleComments(this.props.id).then(({ comments }) => {
			this.setState({ comments });
		});
	}
	addNewComment = comment => {
		this.setState(state => ({ comments: [comment].concat(state.comments) }));
	};
}

export default Comments;
