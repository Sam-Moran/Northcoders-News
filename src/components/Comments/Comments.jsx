import styles from "./Comments.module.css";
import { Link } from "@reach/router";
import { articleComments, deleteComment, voteUpdater } from "../../api";

import React, { Component } from "react";
import CommentDeleter from "../CommentDeleter/CommentDeleter";
import CommentAdder from "../CommentAdder/CommentAdder";
import Votes from "../Votes/Votes";

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
				{comments ? (
					comments.map(comment => {
						const { comment_id, author, votes, created_at, body } = comment;
						const time = new Date(created_at);
						return (
							<ul key={comment_id}>
								<li className={styles.comments}>
									<div>
										<b>
											<Link to={`/${author}/articles`}>{author}</Link> @{" "}
											{time.toLocaleDateString()}{" "}
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
									{this.props.LoggedInUser !== comment.author ? (
										<Votes votes={votes} id={comment_id} type={"comment"} />
									) : (
										<p>{`This has ${votes} votes`}</p>
									)}
								</li>
							</ul>
						);
					})
				) : (
					<p>Loading</p>
				)}
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
