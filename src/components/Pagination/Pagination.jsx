import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ total_count, setPage, p, scroll }) => {
	return (
		<div className={styles.Pagination}>
			<button
				className={styles.button}
				disabled={p === 1}
				onClick={() => setPage(p - 1)}
			>
				Previous Page
			</button>
			<p className={styles.number}>Page: {p}</p>
			<button
				className={styles.button}
				disabled={total_count <= p * 10}
				onClick={() => setPage(p + 1)}
			>
				Next Page
			</button>
		</div>
	);
};

export default Pagination;
