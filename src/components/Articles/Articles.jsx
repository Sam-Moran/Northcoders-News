import styles from "./Articles.module.css";
import { Link } from "@reach/router";
import { getArticles } from "../../api";
import Votes from "../Votes/Votes";

import React, { Component } from "react";

class Articles extends Component {
	state = {
		articles: [],
		loading: true
	};
	render() {
		const { articles, loading } = this.state;
		if (loading) {
			return <p>Loading articles</p>;
		} else {
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
							votes,
							article_id
						} = article;
						const time = new Date(created_at);
						return (
							<ul key={article_id}>
								<li className={styles.article}>
									<h2>
										<Link to={`/article/${article_id}`}>{title}</Link>
									</h2>
									{/* Votes: {votes} this needs to be its own card */}
									<h3 className={styles.subHeader}>
										<Link to={`/${author}/articles`}>{author}</Link> @{" "}
										{time.toDateString()}
									</h3>
									Comments: {comment_count} Topic:{" "}
									<Link to={`/articles/${topic}`}>{topic}</Link>
									<Votes votes={votes} id={article_id} type={"article"} />
								</li>
							</ul>
						);
					})}
					)
				</div>
			);
		}
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
