import React, { Component } from "react";
import uuid from "uuid";
import MovieCard from "../components/MovieCard.js";
import FavoriteForm from "../components/FavoriteForm.js";
import { Container, Segment, Card } from "semantic-ui-react";
import { Droppable, Draggable } from 'react-beautiful-dnd';


export default class FavoriteContainer extends Component {

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
				<MovieCard key={uuid()} movie={movie} handleAdd={this.addToList} index={index} id={id}/>
			)
		})
		return (
			<Container>
				<FavoriteForm favoriteList={this.props.favoriteList} clearFavoriteList={this.props.clearFavoriteList}/>
					<Droppable droppableId="list" type="MOVIE">
					  {(provided, snapshot) => (

					    <div
					      ref={provided.innerRef}
					      style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey', height:`${500 + (500 * this.props.favoriteList.length)}px` }}
					      {...provided.droppableProps}
					    >

							{movies.length ? (movies):(<Card style={{height:"300px"}}>
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
			</Container>
		);
	}
}
