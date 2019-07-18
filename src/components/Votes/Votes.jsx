import React, { Component } from "react";
import { voteUpdater } from "../../api";
import up from "../../images/005-upload.png";
import down from "../../images/down.png";
import styles from "./Votes.module.css";

class Votes extends Component {
	state = {
		voteModifier: 0
	};
	render() {
		const { voteModifier } = this.state;
		const { votes, id, type } = this.props;
		return (
			<div className={styles.vote}>
				<button
					onClick={() => this.handleVotes(1, id, type)}
					disabled={voteModifier === 1}
					className={styles.button}
				>
					<img src={up} alt="Up arrow" height="25" />
				</button>
				<p className={styles.voteCount}>Votes: {votes + voteModifier}</p>
				<button
					onClick={() => this.handleVotes(-1, id, type)}
					disabled={voteModifier === -1}
					className={styles.button}
				>
					<img src={down} alt="Up arrow" height="25" />
				</button>
			</div>
		);
	}

	handleVotes = (vote, id, type) => {
		voteUpdater(id, vote, type);
		this.setState(state => {
			return { voteModifier: vote + state.voteModifier };
		});
	};
}

export default Votes;
