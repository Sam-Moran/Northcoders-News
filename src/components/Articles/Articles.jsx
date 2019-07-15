import styles from "./Articles.module.css";
import { Link } from "@reach/router";
import getArticles from "../../api";

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
						<ul>
							<li key={article_id} className={styles.article}>
								<h2>{title}</h2>
								<h3 className={styles.subHeader}>
									{author} @ {time.toString()}
								</h3>
								Comments:{comment_count} Topic: {topic}
							</li>
						</ul>
					);
				})}
			</div>
		);
	}
	componentDidMount() {
		getArticles(this.props.topics).then(({ articles }) => {
			this.setState({ articles, loading: false });
		});
	}
	componentDidUpdate(preProps, preState) {
		if (preProps.topic !== this.props.topic) {
			getArticles(this.props.topic).then(({ articles }) => {
				this.setState({ articles, loading: false });
			});
		}
	}
}

export default Articles;
