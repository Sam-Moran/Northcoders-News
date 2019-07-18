import React from "react";
import styles from "./Header.module.css";
import { Link } from "@reach/router";
import logo from "../../images/northcoders.png";
import home from "../../images/001-home.png";
import footy from "../../images/002-sport.png";
import code from "../../images/003-code.png";
import pot from "../../images/004-pot.png";

const Header = ({ setUser }) => {
	return (
		<nav className={styles.navbar}>
			<img src={logo} className={styles.Header} alt="Northcoders Logo" />
			<div className={styles.Links}>
				<Link to="/" className={styles.Link}>
					<img src={home} alt="Home" height="55" />
				</Link>
				<Link to="/articles/football" className={styles.Link}>
					<img src={footy} alt="Football" height="55" />
				</Link>
				<Link to="/articles/cooking" className={styles.Link}>
					<img src={pot} alt="Cooking" height="55" />
				</Link>
				<Link to="/articles/coding" className={styles.Link}>
					<img src={code} alt="Coding" height="55" />
				</Link>{" "}
			</div>
		</nav>
	);
};

export default Header;
