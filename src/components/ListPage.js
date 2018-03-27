import React from "react";
import MovieCard from "./MovieCard.js";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import { Card, List } from "semantic-ui-react";
import uuid from "uuid";

const ListPage = props => {

  const onDragEnd = (result) => {
    console.log(result);
  };

  const getListStyle = isDraggingOver => ({
      display: 'flex',
      // padding: this.props.favoriteList.length,
      // minHeight: this.state.height
    });

  console.log("List page", props.listToShow);
  const { title, updated_at } = props.listToShow;
  const movies = props.listToShow.movies.map((movie, index) => (
    <MovieCard key={uuid()} movie={movie} index={index} id={movie.id} />
  ));
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
    <Droppable direction="horizontal" droppableId="listcard" type="MOVIE" ignoreContainerClipping>
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
};

export default ListPage;
