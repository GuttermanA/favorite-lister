import React from "react";
import { Card, List, Button } from "semantic-ui-react";
import uuid from "uuid";
import { Link } from "react-router-dom";

const ListCard = props => {
  const { title, updated_at, id } = props.list;

  const movieTitles = props.list.movies.map(movie => (
    <List.Item as="li" key={uuid()}>
      {movie.title}
    </List.Item>
  ), () => console.log(props.list.movies));

  const deleteList = (event) => {
    event.stopPropagation();
    let options = {
      method: "DELETE",
      headers: {
        Accepts: "application/json",
        "Content-type": "application/json"
      }
    };
    fetch(`https://favorite-lister-backend.herokuapp.com/lists/${id}`, options)
    .then(res => res.json())
    .then(response => props.deleteFromUserList(id))
  }

  const editList = () => {
    props.editList(props.list)
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header as={Link} to={`/lists/${props.list.id}`}>{title}</Card.Header>
        <Card.Meta>{updated_at}</Card.Meta>
        <Card.Description>{movieTitles}</Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button onClick={deleteList} toggle>
            Delete List
          </Button>
          <Button as={Link} to={`/lists/${props.list.id}/update`} onClick={editList} toggle>
            Edit List
          </Button>
      </Card.Content>


    </Card>
  );
};

export default ListCard;

// <NavLink to={`/lists/${id}/update`}>Update</NavLink>
// <Card.Content extra>
//     <Button as={Link} to={`/lists/${id}/update`} toggle>
//       Update
//     </Button>
// </Card.Content>
