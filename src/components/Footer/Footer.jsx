import React from "react";
import styles from "./Footer.module.css";
import UserSelection from "../UserSelection/UserSelection";

const Footer = ({ setUser, LoggedInUser }) => {
	return (
		<div className={styles.foot}>
			<UserSelection setUser={setUser} className={styles.login} />
			{LoggedInUser ? <p>Logged in as: {LoggedInUser}</p> : null}
		</div>
	);
};

export default Footer;
