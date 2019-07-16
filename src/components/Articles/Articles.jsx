import styles from "./Articles.module.css";
import { Link } from "@reach/router";
import { getArticles } from "../../api";

import React, { Component } from "react";

class Articles extends Component {
	state = {
		articles: [],
		loading: true
	};
	render() {
		const { articles } = this.state;
		return (
			<div>
				{articles.map(article => {
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
						<ul key={article_id}>
							<li className={styles.article}>
								<h2>
									<Link to={`/article/${article_id}`}>{title}</Link>
								</h2>
								<h3 className={styles.subHeader}>
									<Link to={`/${author}/articles`}>{author}</Link> @{" "}
									{time.toDateString()}
								</h3>
								Comments: {comment_count} Topic:{" "}
								<Link to={`/articles/${topic}`}>{topic}</Link>
							</li>
						</ul>
					);
				})}
			</div>
		);
	}
	componentDidMount() {
		this.fetchArticles();
	}
	componentDidUpdate(preProps, preState) {
		if (preProps.topic !== this.props.topic) {
			this.fetchArticles();
		} else if (preProps.author !== this.props.author) {
			this.fetchArticles();
		}
	}
	fetchArticles = () => {
		getArticles(this.props.topic, this.props.author).then(({ articles }) => {
			this.setState({ articles, loading: false });
		});
	};
}

export default Articles;
