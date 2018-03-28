import React, { Component } from "react";
import NavBar from "./components/NavBar";
import MovieContainer from "./containers/MovieContainer";
import HomePage from "./components/HomePage";
import UserLists from "./components/UserLists";
import ListPage from "./components/ListPage";
import { Card, Container } from "semantic-ui-react";


import { Route, Switch } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    searchTerm: "Love",
    userLists: [],
    showFaves: true,
    favoriteList: [],
    listToEdit: null,
    movies: []
  };

  addToList = movieData => {
    if (!this.state.favoriteList.includes(movieData)) {
      this.setState({
        favoriteList: [...this.state.favoriteList, movieData]
      })
    }
  };

  removeFromList = movieData => {
    let newList = this.state.favoriteList.filter(movie => movie !== movieData)
    this.setState({
      favoriteList: newList
    })
  }

  clearFavoriteList = () => {
    this.setState({favoriteList:[], listToEdit:null},()=> console.log(this.state))
  }

  fetchMovies(searchTerm) {
    if (searchTerm) {
      fetch(
        `http://localhost:4000/search?${this.generateSearchParams(searchTerm)}`
      )
        .then(res => res.json())
        .then(movies =>
          this.setState({ movies: movies.results.filter(movie => movie.poster_path !== null)})
        );
    }
  }

  generateSearchParams(searchTerm) {
    let params = {};
    params[`search_term`] = searchTerm;
    let esc = encodeURIComponent;
    let query = Object.keys(params)
      .map(k => esc(k) + "=" + esc(params[k]))
      .join("&");
    return query;
  }

  /////////

  homeFetch() {
    fetch(
      `http://localhost:4000/default`
    )
      .then(res => res.json())
      .then(movies =>
        this.setState({ movies: movies.results })
      );
  }

  componentDidMount() {
    this.homeFetch()
  }

  fetchList = () => {
    fetch("http://localhost:4000/lists")
      .then(res => res.json())
      .then(response =>
        this.setState({
          userLists: response
        },() => console.log("userListsApp", response, this.state.userLists))
      );
    // console.log(response))
  }

  search = searchTerm => {
    console.log(searchTerm);
    this.setState({ searchTerm });
    this.fetchMovies(searchTerm);
  };

  updateFavoriteList = (newArray) => {
    this.setState({
    	favoriteList: newArray
    }, () => console.log("updateFavList", newArray))
  }

  editList = (list) => {
    console.log(list)
    this.setState({
      ...this.state,
      favoriteList: list.movies,
      listToEdit: {id: list.id, title: list.title}
    },()=> console.log(this.state))
  }

  deleteFromUserList = (id) => {
    const newUserList = this.state.userLists.filter(list => list.id !== parseInt(id))
    this.setState({
      userLists: newUserList
    })
  }

  render() {
    return (
      <Container fluid>
        <NavBar search={this.search} searchTerm={this.state.searchTerm} fetchLists={this.fetchList}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/results"
            render={() => <MovieContainer searchTerm={this.state.searchTerm} addToList={this.addToList} removeFromList={this.removeFromList} movies={this.state.movies} favoriteList={this.state.favoriteList} updateFavoriteList={this.updateFavoriteList} clearFavoriteList={this.clearFavoriteList} listToEdit={this.state.listToEdit}/>}
          />
        <Route exact path="/lists" render={()=> <UserLists userLists={this.state.userLists} deleteFromUserList={this.deleteFromUserList} editList={this.editList}/>}/>

        {this.state.userLists.length > 0 ? (
          <Route
            exact
            path="/lists/:id"
            render={renderProps => {
              let id = renderProps.match.params.id;


              let foundList = this.state.userLists.find(list => {
                return list.id === parseInt(id);

              });
              console.log(foundList);
              return <ListPage listToShow={foundList} />;
            }}
          />): null}

          <Route exact path="/lists/:id/update" render={renderProps => {
              let id = renderProps.match.params.id;
              let foundList = this.state.userLists.find(list => {
                return list.id === parseInt(id);

              });
              // console.log(foundList);
              return (
                <MovieContainer searchTerm={this.state.searchTerm} addToList={this.addToList} removeFromList={this.removeFromList} movies={this.state.movies} favoriteList={this.state.favoriteList} updateFavoriteList={this.updateFavoriteList} clearFavoriteList={this.clearFavoriteList} listToUpdate={foundList} />
              )

            }}/>

        </Switch>
      </Container>
    );
  }
}

export default App;
