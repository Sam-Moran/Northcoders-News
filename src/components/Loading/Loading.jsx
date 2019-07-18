import LoadingGif from "../../images/loading.gif";
import styles from "../Loading/Loading.module.css";

import React from "react";

const Loading = () => {
	return (
		<div className={styles.Loading}>
			<img src={LoadingGif} alt="Loading" className={styles.LoadingGif} />
		</div>
	);
};

export default Loading;
