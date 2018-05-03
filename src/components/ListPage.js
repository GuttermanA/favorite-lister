import React, { Component } from "react";
import MovieCard from "./MovieCard.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reorder } from '../globalFunctions'
import { Button, Header, Container, Segment, Divider } from "semantic-ui-react";
import { withRouter } from 'react-router-dom'
import uuid from "uuid";



class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.listToShow
    }
  }

  fetchList = (listId) => {
    fetch(`https://favorite-lister-backend.herokuapp.com/lists/${listId}`)
      .then(res => res.json())
      .then(response => {
          if (response.message) {
            alert(response.message)
            this.props.history.push("/lists")
          } else {
            this.setState({
              list: response,
            })
          }
        }
      );
    }

  componentDidMount() {
    if (!this.state.list) {
      this.fetchList(this.props.match.params.id)
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
    fetch(`https://favorite-lister-backend.herokuapp.com/lists/${this.state.list.id}`, options)
      .then(res => res.json())
      .then(response => alert(response.message, "The list was updated."))
  };

  render() {
    const style = isDraggingOver => ({
      display: "flex",
      overflow: "auto",
      // width: '50%',
      // margin: "auto",
    });
    const movies = this.state.list ? this.state.list.movies.map((movie, index) => (<MovieCard key={uuid()} movie={movie} index={index} id={movie.id} handleRemove={this.removeFromList}/>)) : null;

    return (
      <Container as={Segment} basic fluid>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Header size="huge" >List: {this.state.list && this.state.list.title}</Header>
        <Button.Group>
          <Button onClick={this.updateList} >Save Changes</Button>
          <Button onClick={this.props.history.goBack} >Return to Lists</Button>
        </Button.Group>

        <Divider hidden />
        <Droppable
          direction="horizontal"
          droppableId="listcard"
          type="MOVIE"
          ignoreContainerClipping
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={style(snapshot.isDraggingOver)}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
            >
              {movies}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

      </DragDropContext>
    </Container>
    );
  }
}

export default withRouter(ListPage)
