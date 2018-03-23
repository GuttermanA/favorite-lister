import React, { Component } from "react";
import uuid from "uuid";
import MovieCard from "../components/MovieCard.js";
import FavoriteForm from "../components/FavoriteForm.js";
import { Container} from "semantic-ui-react";

export default class FavoriteContainer extends Component {
	state = {};

	moviesExists() {
		let movies;
		if (this.props.favoriteList) {
			movies = this.props.favoriteList.map(movie => {
				return <MovieCard key={uuid()} movie={movie} handleRemove={this.props.handleRemove}/>;
			});
			return movies;
		}
	}

	render() {
		return (
			<Container>
				<FavoriteForm favoriteList={this.props.favoriteList} clearFavoriteList={this.props.clearFavoriteList}/>
				{this.moviesExists()}
			</Container>
		);
	}
}
