import React, { Component } from "react";
import ListCard from "./ListCard";
import uuid from "uuid";
import { Container, Card } from "semantic-ui-react";

export default class UserLists extends Component {

  componentDidMount() {
    this.props.fetchLists()
  }

  render() {
    const listBlock = this.props.userLists.map(list => {
      return <ListCard key={uuid()} list={list} deleteFromUserList={this.props.deleteFromUserList} editList={this.props.editList}/>;
    });
    return (
      <Container fluid>
        <Card.Group centered>{listBlock}</Card.Group>
      </Container>
    );
  }
}
