import React, { Component } from "react";
import MovieCard from "../components/MovieCard.js";
import FavoriteContainer from "./FavoriteContainer";
import uuid from "uuid";
import { Container, Card, Grid, Segment } from "semantic-ui-react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class MovieContainer extends Component {
  onDragStart = () => {
    /*...*/
  };
  onDragUpdate = update => {
    // console.log(update);
  };
  onDragEnd = result => {
    // console.log(result);
    if (!result.destination && result.source.droppableId === "search-results") {
      return;
    }

    if (result.source.droppableId === "list") {
      if (result.destination === null) {
        let foundMovie = this.props.movies.find(
          movie => movie.id === parseInt(result.draggableId.split("-")[1])
        );
        this.props.removeFromList(foundMovie);
        return;
      }
      const favoriteList = reorder(
        this.props.favoriteList,
        result.source.index,
        result.destination.index
      );

      this.props.updateFavoriteList(favoriteList);
    } else if (result.source.droppableId === "search-results") {
      let foundMovie = this.props.movies.find(
        movie => movie.id === result.draggableId
      );
      if (!this.props.favoriteList.includes(foundMovie)) {
        let newArray = [...this.props.favoriteList];
        newArray.splice(result.destination.index, 0, foundMovie);

        this.props.updateFavoriteList(newArray);
      }
    }
  };

  render() {
    const movies = this.props.movies.map((movie, index) => {
      return (
        <MovieCard
          key={uuid()}
          movie={movie}
          handleAdd={this.props.addToList}
          index={index}
          id={movie.id}
          fromWhere={'MovieList'}
        />
      );
    });
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Grid>
          <Grid.Column width={5}>
            <Segment>
              <FavoriteContainer
                listToUpdate={this.props.listToUpdate}
                favoriteList={this.props.favoriteList}
                handleRemove={this.props.removeFromList}
                clearFavoriteList={this.props.clearFavoriteList}
              />
            </Segment>
          </Grid.Column>

          <Grid.Column width={11}>
            <Segment basic>
            <Droppable droppableId="search-results" type="MOVIE" isDropDisabled>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Card.Group itemsPerRow={4}>
                    {movies}
                  {provided.placeholder}
                </Card.Group>
                </div>
              )}
            </Droppable>
            </Segment>
          </Grid.Column>
        </Grid>
      </DragDropContext>
    );
  }
}
