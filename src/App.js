import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Router } from "@reach/router";
import Articles from "./components/Articles/Articles.jsx";
import Article from "./components/Article/Article.jsx";
import Footer from "./components/Footer/Footer";

class App extends Component {
	state = {
		LoggedInUser: "jessjelly"
	};
	render() {
		const { LoggedInUser } = this.state;
		return (
			<div className="App">
				<Header />
				<Router>
					<Articles path="/" LoggedInUser={LoggedInUser} />
					<Articles path="/articles/:topic" LoggedInUser={LoggedInUser} />
					<Article path="/article/:id" LoggedInUser={LoggedInUser} />
					<Articles path="/:author/articles" LoggedInUser={LoggedInUser} />
				</Router>
				<Footer setUser={this.setUser} />
			</div>
		);
	}

	setUser = event => {
		const { value } = event.target;
		this.setState({ LoggedInUser: value });
	};
}

export default App;
