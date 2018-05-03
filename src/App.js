import React, { Component } from "react";
import NavBar from "./components/NavBar";
import MovieContainer from "./containers/MovieContainer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import NotFoundPage from "./components/NotFoundPage"
import UserLists from "./components/UserLists";
import ListPage from "./components/ListPage";


import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    searchTerm: "Love",
    userLists: [],
    showFaves: true,
    favoriteList: [],
    listToEdit: null,
    movies: [],
    loading: false,
  };

  componentDidMount() {
    console.log("mounting app");
    this.homeFetch()
    this.fetchLists()

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.history.location.pathname.includes("update") && !this.state.listToEdit && prevState.userLists.length) {
      const foundList = this.state.userLists.find(list => list.id === parseInt(this.props.history.location.pathname.split("/")[2], 10))
      this.editList(foundList)
    }
  }



  addToList = movieData => {
    console.log("adding to list");
    const favoriteListTitles = this.state.favoriteList.map(movie => movie.title)
    if (!favoriteListTitles.includes(movieData.title)) {
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
      this.setState({loading: true})
      fetch(
        `https://favorite-lister-backend.herokuapp.com/search?${this.generateSearchParams(searchTerm)}`
      )
        .then(res => res.json())
        .then(movies =>
          this.setState({ loading: false, movies: movies.results.filter(movie => movie.poster_path !== null)})
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
    this.setState({loading: true})
    fetch(
      `https://favorite-lister-backend.herokuapp.com/default`
    )
      .then(res => res.json())
      .then(movies =>
        this.setState({loading: false, movies: movies.results })
      );
  }



  fetchLists = () => {
    this.setState({loading: true})
    fetch("https://favorite-lister-backend.herokuapp.com/lists")
      .then(res => res.json())
      .then(response =>
        this.setState({
          userLists: response,
          loading: false,
        })
      );
  }

  search = searchTerm => {
    this.setState({ searchTerm });
    this.fetchMovies(searchTerm);
  };

  updateFavoriteList = (newArray) => {
    this.setState({
    	favoriteList: newArray
    })
  }

  editList = (list) => {
    this.setState({
      favoriteList: list.movies,
      listToEdit: {id: list.id, title: list.title}
    })
  }

  deleteFromUserList = (id) => {
    const newUserList = this.state.userLists.filter(list => list.id !== parseInt(id, 10))
    this.setState({
      userLists: newUserList
    })
  }

  render() {
    return (
      <div>
        <NavBar search={this.search} searchTerm={this.state.searchTerm} clearFavoriteList={this.clearFavoriteList}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route
            exact
            path="/results"
            render={() => <MovieContainer
                            searchTerm={this.state.searchTerm}
                            addToList={this.addToList}
                            removeFromList={this.removeFromList}
                            movies={this.state.movies}
                            favoriteList={this.state.favoriteList}
                            updateFavoriteList={this.updateFavoriteList}
                            clearFavoriteList={this.clearFavoriteList}
                            listToEdit={this.state.listToEdit}
                            loading={this.state.loading}
                          />
                        }
          />
          <Route exact path="/lists" render={()=> <UserLists userLists={this.state.userLists} deleteFromUserList={this.deleteFromUserList} editList={this.editList} fetchLists={this.fetchLists}/>}/>
          <Route
            exact
            path="/lists/:id"
            render={renderProps => {
              let id = renderProps.match.params.id;
              let foundList = this.state.userLists.find(list => {
                return list.id === parseInt(id, 10);
              });
              return <ListPage listToShow={foundList}/>;


            }}
          />

          <Route exact path="/lists/:id/update" render={renderProps => {
              return (
                <MovieContainer editing={true} searchTerm={this.state.searchTerm} addToList={this.addToList} removeFromList={this.removeFromList} movies={this.state.movies} favoriteList={this.state.favoriteList} updateFavoriteList={this.updateFavoriteList} clearFavoriteList={this.clearFavoriteList} listToEdit={this.state.listToEdit}/>
              )
          }}/>
          <Route component={NotFoundPage}/>

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
