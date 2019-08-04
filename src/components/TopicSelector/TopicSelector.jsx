import styles from "./TopicSelector.module.css";
import { getTopics } from "../../api";
import { Link } from "@reach/router";

import React, { Component } from "react";

class TopicSelector extends Component {
	state = {
		topics: []
	};

	render() {
		const { topics } = this.state;
		return (
			<div>
				<span className={styles.margin}>Filter by topic: </span>
				{topics.map(topic => {
					return (
						<Link
							key={topic.slug}
							to={`/topic/${topic.slug}/articles`}
							className={styles.link}
						>
							<span className={styles.margin}>{topic.slug}</span>
						</Link>
					);
				})}
			</div>
		);
	}

	fetchTopics = () => {
		getTopics().then(({ topics }) => {
			this.setState({ topics });
		});
	};
	componentDidMount() {
		this.fetchTopics();
	}
}

export default TopicSelector;
