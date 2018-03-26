import React, { Component } from "react";
import uuid from "uuid";
import MovieCard from "../components/MovieCard.js";
import FavoriteForm from "../components/FavoriteForm.js";
import { Container} from "semantic-ui-react";
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../components/Constants'

const cardTarget = {
	drop() {
		return { name: 'List' }
	},
}

const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
})



class FavoriteContainer extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	}

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
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}
		return (
			<Container style={{backgroundColor}}>
				<FavoriteForm favoriteList={this.props.favoriteList} clearFavoriteList={this.props.clearFavoriteList}/>
				{this.moviesExists()}
				{isActive ? 'Release to drop' : 'Drag a box here'}
			</Container>
		);
	}
}

export default DropTarget(ItemTypes.MOVIE, cardTarget, collect)(FavoriteContainer);
