import styles from "./Article.module.css";
import { Link } from "@reach/router";
import { getArticle } from "../../api";
import Comments from "../Comments/Comments";

import React, { Component } from "react";

class Article extends Component {
	state = {
		article: {},
		loading: true
	};
	render() {
		const { article, comments } = this.state;
		const {
			created_at,
			title,
			author,
			topic,
			comment_count,
			body,
			article_id
		} = article;
		const time = new Date(created_at);
		return (
			<div>
				<h1>{title}</h1>
				<h3 className={styles.subHeader}>
					<Link to={`/${author}/articles`}>{author}</Link> @{" "}
					{time.toDateString()} Topic:{" "}
					<Link to={`/articles/${topic}`}>{topic}</Link>
				</h3>
				<p>{body}</p>
				<h2>
					{comment_count ? `${comment_count} comments:` : "Loading Comments"}
				</h2>
				<Comments id={this.props.id} LoggedInUser={this.props.LoggedInUser} />
			</div>
		);
	}
	componentDidMount() {
		getArticle(this.props.id).then(({ article }) => {
			this.setState({ article, loading: false });
		});
	}
}

export default Article;