import React from "react";
import styles from "./ErrorPage.module.css";

const ErrorPage = ({ err }) => {
	return (
		<div className={styles.error}>
			<h1>Something went wrong...</h1>
			<p>{err.message}</p>
		</div>
	);
};

export default ErrorPage;
