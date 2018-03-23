import React, { Component } from "react";
import NavBar from "./components/NavBar";
import MovieContainer from "./containers/MovieContainer";
import HomePage from "./components/HomePage";
import UserLists from "./components/UserLists";
import { Route } from "react-router-dom";
import "./App.css";


class App extends Component {
	state = {
		searchTerm: "",
	};

	search = searchTerm => {
		this.setState({ searchTerm });
	};

	render() {
		return (
			<div className="App">
				<NavBar search={this.search} searchTerm={this.state.searchTerm} />
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/results"
          render={() => (
            <MovieContainer searchTerm={this.state.searchTerm} />
          )}
          />
        <Route exact path="/lists" component={UserLists} />
			</div>
		);
	}
}

export default App;
