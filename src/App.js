import React, { Component } from "react";
import NavBar from "./components/NavBar";
import MovieContainer from "./containers/MovieContainer";
import HomePage from "./components/HomePage";
import UserLists from "./components/UserLists";
import ListPage from "./components/ListPage";

import { Route, Switch } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    searchTerm: "",
    userLists: []
  };

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    fetch("http://localhost:4000/lists")
      .then(res => res.json())
      .then(response =>
        this.setState({
          userLists: response
        })
      );
    // console.log(response))
  }

  search = searchTerm => {
    this.setState({ searchTerm });
  };

  render() {
    return (
      <div className="App">
        <NavBar search={this.search} searchTerm={this.state.searchTerm} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/results"
            render={() => <MovieContainer searchTerm={this.state.searchTerm} />}
          />
          <Route exact path="/lists" component={UserLists} />
					{this.state.userLists.length > 0 ? (
          <Route
            exact
            path="/lists/:title"
            render={renderProps => {
              let title = renderProps.match.params.title;
              // console.log("renderProps", renderProps.match.params.id);
              let foundList = this.state.userLists.find(list => {
                return list.title === title;
              });
              return <ListPage listToShow={foundList} />;
            }}
          />): null}
        </Switch>
      </div>
    );
  }
}

export default App;
