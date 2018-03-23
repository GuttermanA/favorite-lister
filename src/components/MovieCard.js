import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const MovieCard = (props) => {
  // console.log("card clicked",props);
  const {poster_path} = props.movie
  let poster = `http://image.tmdb.org/t/p/w500/${poster_path}`

  let handleClick = () => {
    if (props.handleAdd) {
      props.handleAdd(props.movie)
    } else if (props.handleRemove) {
      props.handleRemove(props.movie)
    }
  }

  return (
    <Card onClick={handleClick}>
      <Image src={poster} />
    </Card>
  )
}

export default MovieCard
