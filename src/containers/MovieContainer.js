import React, { Component } from "react";
import MovieCard from "../components/MovieCard.js";
import FavoriteContainer from "./FavoriteContainer";
import uuid from "uuid";
import { Container, Card, Grid } from "semantic-ui-react";

export default class MovieContainer extends Component {
	state = {
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

	componentDidMount() {
		this.fetchMovies(this.props.searchTerm);
		// console.log(this.state.movies);
	}

	componentWillReceiveProps(nextProps) {
		this.fetchMovies(nextProps.searchTerm);
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

	render() {
		const movies = this.state.movies.map(movie => {
			return <MovieCard key={uuid()} movie={movie} handleAdd={this.addToList} />;
		});
		return (
			<Grid columns={2} divided>
				<Grid.Column width={5}>
						{this.state.showFaves ? (
							<FavoriteContainer favoriteList={this.state.favoriteList} handleRemove={this.removeFromList}
							clearFavoriteList={this.clearFavoriteList}
								 />
						) : null}
				</Grid.Column>
				<Grid.Column width={11}>
					<Container>
						<Card.Group>{movies}</Card.Group>
					</Container>
				</Grid.Column>
			</Grid>
		);
	}
}
