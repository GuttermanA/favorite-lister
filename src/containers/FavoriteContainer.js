import React, { Component } from "react";
import uuid from "uuid";
import MovieCard from "../components/MovieCard.js";
import FavoriteForm from "../components/FavoriteForm.js";
import { Card } from "semantic-ui-react";
import { Droppable } from 'react-beautiful-dnd';


export default class FavoriteContainer extends Component {

	state = {
		height: 500
	}

	shouldComponentUpdate(nextProps) {
    if(this.props.favoriteList === nextProps.favoriteList) {
      return false;
    }
    return true;
  }

	render() {
		const movies = this.props.favoriteList.map((movie, index) => {
			let id = `movie-${movie.id}`
			return (
				<MovieCard key={uuid()} movie={movie} handleRemove={this.props.handleRemove} index={index} id={id}/>
			)
		})

		const getListStyle = isDraggingOver => ({
			  background: isDraggingOver ? 'lightblue' : 'lightgrey',
				height: isDraggingOver ? this.setState({height: this.state.height + 500}) : null,
			  padding: this.props.favoriteList.length,
				minHeight: this.state.height
			});

		return (
			<div>
				<FavoriteForm favoriteList={this.props.favoriteList} clearFavoriteList={this.props.clearFavoriteList}/>
					<Droppable droppableId="list" type="MOVIE" ignoreContainerClipping>
					  {(provided, snapshot) => (

					    <div
					      ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
					      {...provided.droppableProps}
								{...provided.dragHandleProps}
					    >
							{movies.length ? (movies):
								(<Card>
									<Card.Content>
										<Card.Header>
											Add Movies
										</Card.Header>
										<Card.Description>
											Add and reorder through drag and drop.
										</Card.Description>
									</Card.Content>
								</Card>)}
							{provided.placeholder}
				    </div>

				  )}
				</Droppable>
			</div>
		);
	}
}

// style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey', minHeight:"500px", display:"inline-block", flexDiretion:"column"}}

// <FavoriteForm favoriteList={this.props.favoriteList} clearFavoriteList={this.props.clearFavoriteList}/>
