import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";
import uuid from "uuid";


const MovieCard = props => {
  // console.log("card clicked",props);
  const { poster_path } = props.movie;
  let poster = `http://image.tmdb.org/t/p/w500/${poster_path}`;

  let handleClick = () => {
    if (props.handleAdd) {
      props.handleAdd(props.movie);
    } else if (props.handleRemove) {
      props.handleRemove(props.movie);
    }
  };

  return (
    <Draggable draggableId={uuid()} type="list" index={props.index}>
      {(provided, snapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card onClick={handleClick}>
              <Image src={poster} />
            </Card>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default MovieCard;
