import React from "react";
import { Card, List, Button } from "semantic-ui-react";
import uuid from "uuid";
import { NavLink, Link } from "react-router-dom";

const ListCard = props => {
  const { title, updated_at, id } = props.list;
  const movieTitles = props.list.movies.map(movie => (
    <List.Item as="li" key={uuid()}>
      {movie.title}
    </List.Item>
  ));
  return (
    <Card as={Link} to={`/lists/${props.list.id}`}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{updated_at}</Card.Meta>
        <Card.Description>{movieTitles}</Card.Description>
      </Card.Content>

      <Card.Content extra>
          <Button as={Link} to={`/lists/${id}/update`} toggle>
            Update
          </Button>
      </Card.Content>
    </Card>
  );
};

export default ListCard;

// <NavLink to={`/lists/${id}/update`}>Update</NavLink>
