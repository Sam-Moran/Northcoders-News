import styles from "./Comments.module.css";
import { Link } from "@reach/router";
import { articleComments, deleteComment } from "../../api";

import React, { Component } from "react";
import CommentDeleter from "../CommentDeleter/CommentDeleter";
import CommentAdder from "../CommentAdder/CommentAdder";

class Comments extends Component {
	state = {
		comments: []
	};
	render() {
		const { comments } = this.state;
		return (
			<div>
				<CommentAdder
					LoggedInUser={this.props.LoggedInUser}
					id={this.props.id}
					addNewComment={this.addNewComment}
				/>
				{comments.map(comment => {
					const { comment_id, author, votes, created_at, body } = comment;
					const time = new Date(created_at);
					return (
						<ul key={comment_id}>
							<li className={styles.comments}>
								<div>
									<b>
										<Link to={`/${author}/articles`}>{author}</Link> @{" "}
										{time.toDateString()}{" "}
									</b>
									{time.toLocaleTimeString()}:
								</div>
								{body}
								{this.props.LoggedInUser === comment.author ? (
									<CommentDeleter
										comment_id={comment_id}
										filterDeletedComment={this.filterDeletedComment}
									/>
								) : null}
							</li>
						</ul>
					);
				})}
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

	filterDeletedComment = comment_id => {
		deleteComment(comment_id);

		this.setState(prevState => {
			const filteredComments = prevState.comments.filter(
				comment => comment_id !== comment.comment_id
			);
			return { comments: filteredComments };
		});
	};
}

export default Comments;
