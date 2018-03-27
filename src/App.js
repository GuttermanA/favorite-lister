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
    userLists: [],
    showFaves: true,
    favoriteList: [],
    movies: [
      {
        vote_count: 7331,
        id: 1891,
        video: false,
        vote_average: 8.3,
        title: "The Empire Strikes Back",
        popularity: 21.629623,
        poster_path: "/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg",
        original_language: "en",
        original_title: "The Empire Strikes Back",
        genre_ids: [12, 28, 878],
        backdrop_path: "/amYkOxCwHiVTFKendcIW0rSrRlU.jpg",
        adult: false,
        overview:
          "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.",
        release_date: "1980-05-20"
      }
    ]
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
    this.setState({favoriteList:[]})
  }

  fetchMovies(searchTerm) {
    if (searchTerm) {
      fetch(
        `http://localhost:4000/search?${this.generateSearchParams(searchTerm)}`
      )
        .then(res => res.json())
        .then(movies =>
          this.setState({ movies: movies.results })
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

  componentDidMount() {
    this.fetchList();

  }

  fetchList = () => {
    fetch("http://localhost:4000/lists")
      .then(res => res.json())
      .then(response =>
        this.setState({
          userLists: response
        },() => console.log(this.state.userLists))
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
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar search={this.search} searchTerm={this.state.searchTerm} fetchLists={this.fetchList}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/results"
            render={() => <MovieContainer searchTerm={this.state.searchTerm} addToList={this.addToList} removeFromList={this.removeFromList} movies={this.state.movies} favoriteList={this.state.favoriteList} updateFavoriteList={this.updateFavoriteList} clearFavoriteList={this.clearFavoriteList}/>}
          />
        <Route exact path="/lists" render={()=> <UserLists userLists={this.state.userLists}/>} />
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
        </Switch>
      </div>
    );
  }
}

export default App;
