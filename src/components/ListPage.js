import React, { Component } from "react";
import MovieCard from "./MovieCard.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { Button } from "semantic-ui-react";
import uuid from "uuid";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.listToShow
    };
    console.log(this.state.list);
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const movies = reorder(
      this.state.list.movies,
      result.source.index,
      result.destination.index
    );

    this.setState({
      list: {
        ...this.state.list,
        movies: movies
      }
    }, () => console.log(this.state.list));
  };

  updateList = () => {
    console.log(this.state.list.id);
    console.log(JSON.stringify(this.state.list));
    let options = {
      method: "PATCH",
      headers: {
        Accepts: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state.list)
    };
    fetch(`http://localhost:4000/lists/${this.state.list.id}`, options)
      .then(res => res.json())
      .then(response => console.log(response));
  };

  render() {
    const getListStyle = isDraggingOver => ({
      display: "flex"
    });
    const movies = this.state.list.movies.map((movie, index) => (
      <MovieCard key={uuid()} movie={movie} index={index} id={movie.id} />
    ));

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          direction="horizontal"
          droppableId="listcard"
          type="MOVIE"
          ignoreContainerClipping
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
            >
              {movies}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button onClick={this.updateList}>Update</Button>
      </DragDropContext>
    );
  }
}
