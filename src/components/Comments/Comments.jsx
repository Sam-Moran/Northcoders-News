import styles from "./Comments.module.css";
import { Link } from "@reach/router";
import { articleComments, deleteComment } from "../../api";

import React, { Component } from "react";
import CommentDeleter from "../CommentDeleter/CommentDeleter";
import CommentAdder from "../CommentAdder/CommentAdder";
import Votes from "../Votes/Votes";
import Sorter from "../Sorter/Sorter";
import Order from "../Order/Order";

class Comments extends Component {
	state = {
		comments: [],
		sort: "created_at",
		order: "asc"
	};
	render() {
		const { comments } = this.state;
		return (
			<div>
				Sort by: <Sorter type="comments" setSort={this.setSort} />
				Order by: <Order setOrder={this.setOrder} />
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

	setSort = event => {
		const { value } = event.target;
		this.setState({ sort: value });
	};
	setOrder = event => {
		const { value } = event.target;
		this.setState({ order: value });
	};

	fetchComments = () => {
		articleComments(this.props.id, this.state.sort, this.state.order).then(
			({ comments }) => {
				this.setState({ comments });
			}
		);
	};

	componentDidMount() {
		this.fetchComments();
	}
	componentDidUpdate(preProps, preState) {
		const sortChanged = preState.sort !== this.state.sort;
		const orderChanged = preState.order !== this.state.order;

		if (sortChanged || orderChanged) {
			this.fetchComments();
		}
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
