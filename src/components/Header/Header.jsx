import React from "react";
import styles from "./Header.module.css";
import { Link } from "@reach/router";
import logo from "../../images/northcoders.png";
import home from "../../images/001-home.png";
import footy from "../../images/002-sport.png";
import code from "../../images/003-code.png";
import pot from "../../images/004-pot.png";
import UserSelection from "../UserSelection/UserSelection";

const Header = ({ setUser, LoggedInUser }) => {
	return (
		<nav className={styles.navbar}>
			<img src={logo} className={styles.Header} alt="Northcoders Logo" />
			<div className={styles.login}>
				<UserSelection setUser={setUser} className={styles.login} />
				{LoggedInUser ? <p>Logged in as: {LoggedInUser}</p> : null}
			</div>
			<div className={styles.Links}>
				<Link to="/" className={styles.link}>
					<img src={home} alt="Home" className={styles.image} />
				</Link>
				<Link to="/topic/football/articles" className={styles.link}>
					<img src={footy} alt="Football" className={styles.image} />
				</Link>
				<Link to="/topic/cooking/articles" className={styles.link}>
					<img src={pot} alt="Cooking" className={styles.image} />
				</Link>
				<Link to="/topic/coding/articles" className={styles.link}>
					<img src={code} alt="Coding" className={styles.image} />
				</Link>
			</div>
		</nav>
	);
};

export default Header;
