import React, { Component } from "react";
import MovieCard from "./MovieCard.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { Button, Header, Container } from "semantic-ui-react";
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
    }
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

  removeFromList = movieData => {
    let newList = this.state.list.movies.filter(movie => movie !== movieData)
    this.setState({
      list: {
        ...this.state.list,
        movies: newList
      }
    })
  }


  updateList = () => {
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
      .then(response => alert(response.message, "The list was updated."))
  };

  render() {
    const getListStyle = isDraggingOver => ({
      display: "flex",
      overflow: "auto"
    });
    const movies = this.state.list.movies.map((movie, index) => (
      <MovieCard key={uuid()} movie={movie} index={index} id={movie.id} handleRemove={this.removeFromList}/>
    ));

    return (
      <Container>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Header size="huge">{this.state.list.title}</Header>
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
    </Container>
    );
  }
}
