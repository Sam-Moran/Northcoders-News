import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Router } from "@reach/router";
import Articles from "./components/Articles/Articles.jsx";
import Article from "./components/Article/Article.jsx";

class App extends Component {
	state = {
		LoggedInUser: ""
	};
	render() {
		const { LoggedInUser } = this.state;
		return (
			<div className="App">
				<Header setUser={this.setUser} />
				<Router>
					<Articles path="/" LoggedInUser={LoggedInUser} />
					<Articles path="/articles/:topic" LoggedInUser={LoggedInUser} />
					<Article path="/article/:id" LoggedInUser={LoggedInUser} />
					<Articles path="/:author/articles" LoggedInUser={LoggedInUser} />
				</Router>
			</div>
		);
	}

	setUser = event => {
		const { value } = event.target;
		this.setState({ LoggedInUser: value });
	};
}

export default App;
