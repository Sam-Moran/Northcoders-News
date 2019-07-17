import styles from "./Article.module.css";
import { Link } from "@reach/router";
import { getArticle, voteUpdater } from "../../api";
import Comments from "../Comments/Comments";
import Votes from "../Votes/Votes";

import React, { Component } from "react";

class Article extends Component {
	state = {
		article: {},
		loading: true
	};
	render() {
		const { article, loading } = this.state;
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
		if (loading) {
			return <p>Loading article</p>;
		} else {
			return (
				<div>
					<section className={styles.article}>
						<h1>{title}</h1>
						<h3 className={styles.subHeader}>
							<Link to={`/${author}/articles`}>{author}</Link> @{" "}
							{time.toLocaleDateString()} Topic:{" "}
							<Link to={`/articles/${topic}`}>{topic}</Link>
						</h3>
						<p>{body}</p>
						<Votes votes={votes} id={article_id} type={"article"} />
					</section>
					<section className={styles.comments}>
						<h2>
							{comment_count
								? `${comment_count} comments:`
								: "Loading Comments"}
						</h2>
						<Comments
							id={this.props.id}
							LoggedInUser={this.props.LoggedInUser}
						/>
					</section>
				</div>
			);
		}
	}
	componentDidMount() {
		getArticle(this.props.id).then(({ article }) => {
			this.setState({ article, loading: false });
		});
	}
}

export default Article;
