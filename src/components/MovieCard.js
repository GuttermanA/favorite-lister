import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const MovieCard = (props) => {
  console.log(props);
  const {poster_path} = props.movie
  let poster = `http://image.tmdb.org/t/p/w500/${poster_path}`
  return (
    <Card>
      <Image src={poster} />
    </Card>
  )
}

export default MovieCard
