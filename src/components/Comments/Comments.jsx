import styles from "./Comments.module.css";
import { Link } from "@reach/router";
import { articleComments, deleteComment } from "../../api";

import React, { Component } from "react";
import CommentDeleter from "../CommentDeleter/CommentDeleter";
import CommentAdder from "../CommentAdder/CommentAdder";
import Votes from "../Votes/Votes";
import Sorter from "../Sorter/Sorter";
import Order from "../Order/Order";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

class Comments extends Component {
	state = {
		comments: [],
		sort: "created_at",
		order: "desc",
		loading: true,
		err: null
	};
	render() {
		const { comments, err, loading } = this.state;
		if (err) return <ErrorPage err={err} />;
		if (loading) {
			return <Loading />;
		} else {
			return (
				<div>
					<section className={styles.commentBlock}>
						Sort by: <Sorter type="comments" setSort={this.setSort} />
						Order by: <Order setOrder={this.setOrder} />
						{this.props.LoggedInUser !== null ? (
							<CommentAdder
								LoggedInUser={this.props.LoggedInUser}
								id={this.props.id}
								addNewComment={this.addNewComment}
							/>
						) : null}
					</section>
					{comments.map(comment => {
						const { comment_id, author, votes, created_at, body } = comment;
						const time = new Date(created_at);
						return (
							<ul key={comment_id}>
								<section className={styles.comments}>
									<div>
										<b>
											<Link to={`/${author}/articles`}>{author}</Link> @{" "}
											{time.toLocaleDateString()}{" "}
										</b>
										{time.toLocaleTimeString()}:
									</div>
									{body}
									<section className={styles.bottom}>
										{<Votes votes={votes} id={comment_id} type={"comment"} />}
										{this.props.LoggedInUser === comment.author ? (
											<CommentDeleter
												comment_id={comment_id}
												filterDeletedComment={this.filterDeletedComment}
											/>
										) : null}
									</section>
								</section>
							</ul>
						);
					})}
				</div>
			);
		}
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
		articleComments(this.props.id, this.state.sort, this.state.order)
			.then(({ comments }) => {
				this.setState({ comments, loading: false });
			})
			.catch(err => {
				this.setState({ err, loading: false });
			});
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
