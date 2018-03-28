import React, { Component } from "react";
import ListCard from "./ListCard";
import uuid from "uuid";
import { Container, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class UserLists extends Component {
  render() {
    const listBlock = this.props.userLists.map(list => {
      return <ListCard key={uuid()} list={list} />;
    });
    return <Container><Card.Group>{listBlock}</Card.Group></Container>;
  }
}
