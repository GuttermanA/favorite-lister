import React, { Component } from "react";
import uuid from "uuid";
import MovieCard from "../components/MovieCard.js";
import FavoriteForm from "../components/FavoriteForm.js";
import { Container } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class FavoriteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.favoriteList
    });
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  };

  moviesExists() {
    let movies;
    if (this.props.favoriteList) {
      movies = this.props.favoriteList.map(movie => {
        return (
          <MovieCard
            key={uuid()}
            movie={movie}
            handleRemove={this.props.handleRemove}
          />
        );
      });
      return movies;
    }
  }

  clearFavoriteList = () => {
    this.setState({ items: [] });
  };

  render() {
    const movies = this.state.items.map((movie, index) => {
      return (
        <MovieCard
          key={uuid()}
          movie={movie}
          handleAdd={this.addToList}
          index={index}
        />
      );
    });

    console.log(this.state.items);
    return (
      <Container>
        <FavoriteForm
          favoriteList={this.state.items}
          clearFavoriteList={this.clearFavoriteList}
        />

        <Droppable droppableId="droppable" type="list">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {movies}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Container>
    );
  }
}
