import React from "react";
import styles from "./Order.module.css";

const Order = ({ setOrder }) => {
	return (
		<div className={styles.order}>
			<select onChange={setOrder}>
				<option value="desc">Descending</option>
				<option value="asc">Ascending</option>
			</select>
		</div>
	);
};

export default Order;
