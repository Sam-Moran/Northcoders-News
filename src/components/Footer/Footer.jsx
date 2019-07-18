import React from "react";
import styles from "./Footer.module.css";
import UserSelection from "../UserSelection/UserSelection";

const Footer = ({ setUser }) => {
	return (
		<div className={styles.foot}>
			<UserSelection setUser={setUser} className={styles.login} />
		</div>
	);
};

export default Footer;
