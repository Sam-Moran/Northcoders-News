import React from "react";
import styles from "./Sorter.module.css";

const Sorter = ({ setSort, type }) => {
	return (
		<div className={styles.sorter}>
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
