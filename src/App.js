import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Router } from "@reach/router";
import Articles from "./components/Articles/Articles.jsx";
import Article from "./components/Article/Article.jsx";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./components/ErrorPage/ErrorPage";

class App extends Component {
	state = {
		LoggedInUser: null
	};
	render() {
		const { LoggedInUser } = this.state;
		return (
			<div className="App">
				<Header setUser={this.setUser} LoggedInUser={LoggedInUser} />
				<Router>
					<Articles path="/" LoggedInUser={LoggedInUser} />
					<Articles path="/topic/:topic/articles" LoggedInUser={LoggedInUser} />
					<Article path="/article/:id" LoggedInUser={LoggedInUser} />
					<Articles
						path="/users/:author/articles"
						LoggedInUser={LoggedInUser}
					/>
					<ErrorPage default />
				</Router>
				<Footer />
			</div>
		);
	}

	setUser = event => {
		const { value } = event.target;
		this.setState({ LoggedInUser: value });
	};
}

export default App;
