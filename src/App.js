import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Router, Link } from "@reach/router";
import Articles from "./components/Articles/Articles.jsx";

class App extends Component {
	state = {
		LoggedInUser: ""
	};
	render() {
		const { LoggedInUser } = this.state;
		return (
			<div className="App">
				<Header />
				<Router>
					<Articles path="/" LoggedInUser={LoggedInUser} />
					<Articles path="/articles/:topic" LoggedInUser={LoggedInUser} />
				</Router>
			</div>
		);
	}
}

export default App;
