import React, { Component } from "react";
import MovieCard from "../components/MovieCard.js";
import FavoriteContainer from "./FavoriteContainer";
import uuid from "uuid";
import { Card, Grid, Segment, Container } from "semantic-ui-react";
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
          movie => movie.id === parseInt(result.draggableId.split("-")[1], 10)
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
        <Grid columns={2} >
          <Grid.Row>
            <Grid.Column    computer={4} widescreen={3} tablet={3}>
            {
              // style={{width:"420px"}}
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
                // <Segment basic>
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
              // </Segment>
            }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DragDropContext>
    );
  }
}
