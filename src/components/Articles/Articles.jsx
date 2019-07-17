import styles from "./Articles.module.css";
import { Link } from "@reach/router";
import { getArticles } from "../../api";
import Votes from "../Votes/Votes";

import React, { Component } from "react";
import Sorter from "../Sorter/Sorter";
import Order from "../Order/Order";
import Pagination from "../Pagination/Pagination";

class Articles extends Component {
	state = {
		articles: [],
		loading: true,
		sort: "created_at",
		order: "desc",
		p: 1,
		total_count: 0
	};
	render() {
		const { articles, loading, total_count } = this.state;
		if (loading) {
			return <p>Loading articles</p>;
		} else {
			return (
				<div>
					Sort by: <Sorter type="articles" setSort={this.setSort} />
					Order by: <Order setOrder={this.setOrder} />
					{articles.map(article => {
						const {
							created_at,
							title,
							author,
							topic,
							comment_count,
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
									<h3 className={styles.subHeader}>
										<Link to={`/${author}/articles`}>{author}</Link> @{" "}
										{time.toLocaleDateString()}
									</h3>
									Comments: {comment_count} Topic:{" "}
									<Link to={`/articles/${topic}`}>{topic}</Link>
									{this.props.LoggedInUser !== article.author ? (
										<Votes votes={votes} id={article_id} type={"article"} />
									) : (
										<p>{`This has ${votes} votes`}</p>
									)}
								</li>
							</ul>
						);
					})}
					<Pagination total_count={total_count} />
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

	setPage = event => {
		const { value } = event.target;
		this.setState({ p: value });
	};

	componentDidMount() {
		this.fetchArticles();
	}
	componentDidUpdate(preProps, preState) {
		const topicChanged = preProps.topic !== this.props.topic;
		const authorChanged = preProps.author !== this.props.author;
		const sortChanged = preState.sort !== this.state.sort;
		const orderChanged = preState.order !== this.state.order;

		if (topicChanged || authorChanged || sortChanged || orderChanged) {
			this.fetchArticles();
		}
	}
	fetchArticles = () => {
		getArticles(
			this.props.topic,
			this.props.author,
			this.state.sort,
			this.state.order
		).then(({ articles, total_count }) => {
			this.setState({ articles, total_count, loading: false });
		});
	};
}

export default Articles;
