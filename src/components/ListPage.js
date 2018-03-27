import React from 'react'
import { Card, List } from 'semantic-ui-react'
import uuid from "uuid";

const ListPage = (props) => {
  console.log("List page", props.listToShow);
  const {title, updated_at} = props.listToShow
  const movieTitles = props.listToShow.movies.map(movie => <List.Item as='li' key={uuid()}>{movie.title}</List.Item>)
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {updated_at}
          </span>
        </Card.Meta>
        <Card.Description>
          <List as='ol'>
            {movieTitles}
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default ListPage
