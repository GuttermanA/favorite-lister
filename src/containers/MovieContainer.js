import React, { Component } from "react";
import MovieCard from "../components/MovieCard.js";
import FavoriteContainer from "./FavoriteContainer";
import uuid from "uuid";
// import { reorder } from "../globalFunctions"
import { Card, Grid, Dimmer, Loader } from "semantic-ui-react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Redirect } from "react-router-dom";


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class MovieContainer extends Component {

  onDragEnd = result => {
    if (!result.destination && result.source.droppableId === "search-results") {
      return;
    }

    if (result.source.droppableId === "list") {
      if (result.destination === null) {
        let foundMovie = this.props.movies.find(movie => movie.title === result.draggableId.split("-")[0]);
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
      let foundMovie = this.props.movies.find(movie => movie.title === result.draggableId.split("-")[0]);
      const favoriteListTitles = this.props.favoriteList.map(movie => movie.title)
      if (!favoriteListTitles.includes(foundMovie.title)) {
        let newArray = [...this.props.favoriteList];
        newArray.splice(result.destination.index, 0, foundMovie);

        this.props.updateFavoriteList(newArray);
      }
    }
  };

  render() {
    const getListStyle = isDraggingOver => ({
      display: "flex"
    });
    const movies = this.props.movies.map((movie, index) => {
      return (
        <MovieCard
          key={uuid()}
          movie={movie}
          handleAdd={this.props.addToList}
          index={index}
          id={`${movie.title}-${movie.id}-search`}
          fromWhere={'MovieList'}
        />
      );
    });
      return (
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
        <Dimmer active={this.props.loading}>
          <Loader />
        </Dimmer>
          <Grid columns={2} >
            <Grid.Row>
              <Grid.Column  computer={4} widescreen={3} tablet={3}>
              {
                <FavoriteContainer
                  listToUpdate={this.props.listToUpdate}
                  favoriteList={this.props.favoriteList}
                  handleRemove={this.props.removeFromList}
                  clearFavoriteList={this.props.clearFavoriteList}
                  listToEdit={this.props.listToEdit}
                />
              }

              </Grid.Column>

              <Grid.Column computer={11} widescreen={13} tablet={7}   >
                {
                  <Droppable droppableId="search-results" type="MOVIE" isDropDisabled>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card.Group centered>
                          {movies}
                        {provided.placeholder}
                      </Card.Group>
                      </div>
                    )}
                  </Droppable>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </DragDropContext>
      );



  }
}
