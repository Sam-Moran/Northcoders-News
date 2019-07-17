import React, { Component } from "react";
import { voteUpdater } from "../../api";

class Votes extends Component {
	state = {
		voteModifier: 0
	};
	render() {
		const { voteModifier } = this.state;
		const { votes, id, type } = this.props;
		return (
			<div>
				<button
					onClick={() => this.handleVotes(1, id, type)}
					disabled={voteModifier === 1}
				>
					+1
				</button>
				{votes + voteModifier}
				<button
					onClick={() => this.handleVotes(-1, id, type)}
					disabled={voteModifier === -1}
				>
					-1
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
