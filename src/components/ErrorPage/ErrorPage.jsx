import React from "react";
import styles from "./ErrorPage.module.css";

const ErrorPage = ({ err }) => {
	if (err) {
		return (
			<div className={styles.error}>
				<h1>Something went wrong...</h1>
				<p>{err.message}</p>
			</div>
		);
	} else {
		return <h1>Something went wrong...</h1>;
	}
};

export default ErrorPage;
