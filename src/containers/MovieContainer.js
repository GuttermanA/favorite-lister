import React, { Component } from 'react'



export default class MovieContainer extends Component {
  state = {
    movies:[]
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies() {
    console.log(`http://localhost:4000/search?${this.generateSearchParams()}`);
    fetch(`http://localhost:4000/search?${this.generateSearchParams()}`)
      .then(res => res.json())
      .then(movies => this.setState({ movies: movies.results }))
  }

  generateSearchParams() {
    let params = {}
    params[`search_term`] = this.props.searchTerm
    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return query
  }

  render() {
    const movies = this.state.movies.map(movie => <p>{movie.title}</p>)
    return (
      <div className="movie-list">
        {movies}
      </div>
    )
  }
}
