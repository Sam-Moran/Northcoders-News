import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ total_count, setPage, p }) => {
	return (
		<div className={styles.Pagination}>
			<button
				className={styles.button}
				disabled={p === 1}
				onClick={() => setPage(p - 1)}
			>
				Page Down
			</button>
			<p className={styles.number}>Page: {p}</p>
			<button
				className={styles.button}
				disabled={total_count <= p * 10}
				onClick={() => setPage(p + 1)}
			>
				Page Up
			</button>
		</div>
	);
};

export default Pagination;
