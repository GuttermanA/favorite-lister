import React, { Component } from "react";
import MovieCard from "./MovieCard.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Card, List } from "semantic-ui-react";
import uuid from "uuid";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class ListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: props.listToShow.movies
    }
    console.log(this.state);
  }

  onDragEnd = result => {
    if (!result.destination) {
  return;
}

const items = reorder(
  this.state.items,
  result.source.index,
  result.destination.index
);

this.setState({
  items,
});
  };

  render() {
    const getListStyle = isDraggingOver => ({
      display: "flex",
    });
    console.log("state", this.state.items.movies);
    const { title, updated_at } = this.state.items;
    const movies = this.state.items.map((movie, index) => (
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
      </DragDropContext>
    );
  }
}
