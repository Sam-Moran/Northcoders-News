import styles from "./TopicSelector.module.css";
import { getTopics } from "../../api";

import React, { Component } from "react";

class TopicSelector extends Component {
	state = {
		topics: []
	};

	render() {
		const { topics } = this.state;
		return <div />;
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
