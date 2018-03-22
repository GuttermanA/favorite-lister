import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    movies:[]
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies() {
    fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=star%20wars&language=en-US&api_key=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
