import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { Draggable } from 'react-beautiful-dnd';

const MovieCard = (props) => {
  // console.log("card clicked",props);
  const {poster_path} = props.movie
  let poster = `http://image.tmdb.org/t/p/w500/${poster_path}`

  let handleClick = () => {
    if (props.handleAdd) {
      props.handleAdd(props.movie)
    } 
  }

  let handleDelete = (e) => {
    console.log(e);
    props.handleRemove(props.movie)
  }

  return (
    <Draggable draggableId={props.id} type="MOVIE" index={props.index}>
      {(provided, snapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
          <Card onClick={handleClick}>
            <Image src={poster} />
            { props.fromWhere !== "MovieList" ? <Icon name='delete' inverted size="large" circular onClick={handleDelete}/> : null}

          </Card>
        </div>
        {provided.placeholder}
      </div>
      )}
    </Draggable>
  )
}

export default MovieCard
