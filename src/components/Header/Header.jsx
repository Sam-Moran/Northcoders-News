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
				<Link to="/" className={styles.link}>
					<img src={home} alt="Home" className={styles.image} />
				</Link>
				<Link to="/articles/football" className={styles.link}>
					<img src={footy} alt="Football" className={styles.image} />
				</Link>
				<Link to="/articles/cooking" className={styles.link}>
					<img src={pot} alt="Cooking" className={styles.image} />
				</Link>
				<Link to="/articles/coding" className={styles.link}>
					<img src={code} alt="Coding" className={styles.image} />
				</Link>{" "}
			</div>
		</nav>
	);
};

export default Header;
