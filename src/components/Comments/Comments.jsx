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
import Pagination from "../Pagination/Pagination";

class Comments extends Component {
	state = {
		comments: [],
		sort: "created_at",
		order: "desc",
		loading: true,
		err: null,
		p: 1,
		total: 0
	};
	render() {
		const { comments, err, loading, total } = this.state;
		if (err) return <ErrorPage err={err} />;
		if (loading) {
			return <Loading />;
		} else {
			const { LoggedInUser } = this.props;
			return (
				<div className={styles.column}>
					<h2 className={styles.commentCount}>{total} comments:</h2>
					<section id="comments" className={styles.commentBlock}>
						Sort by: <Sorter type="comments" setSort={this.setSort} />
						Order by: <Order setOrder={this.setOrder} />
						<section className={styles.adder}>
							{this.props.LoggedInUser !== null ? (
								<CommentAdder
									LoggedInUser={this.props.LoggedInUser}
									id={this.props.id}
									addNewComment={this.addNewComment}
								/>
							) : null}
						</section>
					</section>
					{comments.map(comment => {
						const { comment_id, author, votes, created_at, body } = comment;
						const time = new Date(created_at);
						return (
							<ul key={comment_id}>
								<section className={styles.comments}>
									<div>
										<b>
											{" "}
											<Link to={`/${author}/articles`}>{author}</Link> @{" "}
											{time.toLocaleDateString()}{" "}
										</b>
										{time.toLocaleTimeString()}:
									</div>
									{body}
									<section className={styles.bottom}>
										{<Votes votes={votes} id={comment_id} type={"comment"} />}
										{LoggedInUser === comment.author ? (
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

					<p className={styles.changePage}>
						<Pagination
							p={this.state.p}
							total_count={this.state.total}
							setPage={this.setPage}
						/>
					</p>
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
	setPage = num => {
		this.setState({ p: num });
	};

	fetchComments = () => {
		articleComments(
			this.props.id,
			this.state.sort,
			this.state.order,
			this.state.p
		)
			.then(({ comments }) => {
				this.setState({
					comments,
					loading: false,
					total: this.props.comment_count
				});
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
		const pChanged = preState.p !== this.state.p;
		// const totalChanged = preState.total !== this.state.total;

		if (sortChanged || orderChanged || pChanged) {
			this.fetchComments();
		}
	}

	addNewComment = comment => {
		const { total } = this.state;
		const integer = parseInt(total);
		this.setState(state => ({
			comments: [comment].concat(state.comments),
			total: integer + 1
		}));
	};

	filterDeletedComment = comment_id => {
		const { total } = this.state;
		const integer = parseInt(total);

		deleteComment(comment_id);
		this.setState(prevState => {
			const filteredComments = prevState.comments.filter(
				comment => comment_id !== comment.comment_id
			);
			return { comments: filteredComments, total: integer - 1 };
		});
	};
}

export default Comments;
