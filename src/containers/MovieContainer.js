import React, { Component } from "react";
import MovieCard from "../components/MovieCard.js";
import { Container, Menu, Input, Card } from "semantic-ui-react";

export default class MovieContainer extends Component {
	state = {
		movies: [{
           "vote_count": 7331,
           "id": 1891,
           "video": false,
           "vote_average": 8.3,
           "title": "The Empire Strikes Back",
           "popularity": 21.629623,
           "poster_path": "/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg",
           "original_language": "en",
           "original_title": "The Empire Strikes Back",
           "genre_ids": [
               12,
               28,
               878
           ],
           "backdrop_path": "/amYkOxCwHiVTFKendcIW0rSrRlU.jpg",
           "adult": false,
           "overview": "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.",
           "release_date": "1980-05-20"
       },{
              "vote_count": 7331,
              "id": 1891,
              "video": false,
              "vote_average": 8.3,
              "title": "The Empire Strikes Back",
              "popularity": 21.629623,
              "poster_path": "/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg",
              "original_language": "en",
              "original_title": "The Empire Strikes Back",
              "genre_ids": [
                  12,
                  28,
                  878
              ],
              "backdrop_path": "/amYkOxCwHiVTFKendcIW0rSrRlU.jpg",
              "adult": false,
              "overview": "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.",
              "release_date": "1980-05-20"
          },
     ]
	};



	componentDidMount() {
		this.fetchMovies(this.props.searchTerm);
		console.log(this.state.movies);
	}

	componentWillReceiveProps(nextProps) {
		this.fetchMovies(nextProps.searchTerm);
	}

	fetchMovies(searchTerm) {
		fetch(
			`http://localhost:4000/search?${this.generateSearchParams(searchTerm)}`
		)
			.then(res => res.json())
			.then(movies =>
				this.setState({ movies: movies.results }, () => {
					console.log(this.state.movies);
				})
			);
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

	render() {
		const movies = this.state.movies.map(movie => {
			return <MovieCard movie={movie} />;
		});
		return (
			<Container>
				<Card.Group>{movies}</Card.Group>
			</Container>
		);
	}
}
