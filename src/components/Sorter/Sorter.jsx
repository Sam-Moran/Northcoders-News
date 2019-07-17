import React from "react";

const Sorter = ({ setSort, type }) => {
	return (
		<div>
			<select onChange={setSort}>
				<option value="created_at">Date</option>
				<option value="votes">Votes</option>
				{type === "articles" ? (
					<option value="comment_count">Comments</option>
				) : null}
			</select>
		</div>
	);
};

export default Sorter;
