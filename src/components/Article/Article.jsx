import styles from "./Article.module.css";
import { Link } from "@reach/router";
import { getArticle, deleteArticleByID } from "../../api";
import Comments from "../Comments/Comments";
import Votes from "../Votes/Votes";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import ArticleDeleter from "../ArticleDeleter/ArticleDeleter";

import React, { Component } from "react";

class Article extends Component {
	state = {
		article: {},
		loading: true,
		err: null,
		deleted: null
	};
	render() {
		const { article, loading, err, deleted } = this.state;
		const {
			created_at,
			title,
			author,
			topic,
			comment_count,
			body,
			votes,
			article_id
		} = article;
		const time = new Date(created_at);
		if (err) return <ErrorPage err={err} />;
		if (deleted) return <h1>Article succesfully deleted</h1>;
		if (loading) {
			return <Loading />;
		} else {
			return (
				<div>
					<section className={styles.article}>
						<section>
							<h1>{title}</h1>
							<h4 className={styles.subHeader}>
								<Link to={`/users/${author}/articles`}>{author}</Link> @{" "}
								{time.toLocaleDateString()} Topic:{" "}
								<Link to={`/topic/${topic}/articles`}>{topic}</Link>
								{this.props.LoggedInUser === author ? (
									<ArticleDeleter
										article_id={article_id}
										deleteArticle={this.deleteArticle}
									/>
								) : null}
							</h4>
							<p>{body}</p>
						</section>
						<section className={styles.bottom}>
							<Votes votes={votes} id={article_id} type={"article"} />
						</section>
					</section>
					<section className={styles.comments}>
						<Comments
							id={this.props.id}
							LoggedInUser={this.props.LoggedInUser}
							comment_count={comment_count}
						/>
					</section>
				</div>
			);
		}
	}
	componentDidMount() {
		getArticle(this.props.id)
			.then(({ article }) => {
				this.setState({ article, loading: false });
			})
			.catch(err => {
				this.setState({ err, loading: false });
			});
	}

	deleteArticle = article_id => {
		deleteArticleByID(article_id);
		this.setState({ article: {}, loading: false, deleted: true });
	};
}

export default Article;
