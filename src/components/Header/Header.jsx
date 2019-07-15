import React from "react";
import styles from "./Header.module.css";
import { Link } from "@reach/router";

const Header = () => {
	return (
		<nav className={styles.navbar}>
			<h1>NC News</h1>
			<div className={styles.links}>
				<Link to="/articles/cooking" className={styles.links}>
					Cooking
				</Link>
				<Link to="/articles/football" className={styles.links}>
					Football
				</Link>
				<Link to="/articles/coding" className={styles.links}>
					Coding
				</Link>
			</div>
		</nav>
	);
};

export default Header;
