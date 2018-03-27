import React, { Component } from "react";
import ListCard from './ListCard'
import uuid from "uuid";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom"

export default class UserLists extends Component {
	state = {
    userLists: []
	};

  componentDidMount(){
    this.fetchList();
  }

  fetchList(){
    fetch('http://localhost:4000/lists')
    .then(res => res.json())
    .then(response =>
      this.setState({
        userLists: response
      })
    )
      // console.log(response))
  }

  displayList = () => {

  }



	render() {
    const listBlock = this.state.userLists.map(list => {
        return <Link to={`/lists/${list.title}`}><ListCard key={uuid()} list={list}/></Link>
      })
		return (
			<Container>
      	{listBlock}
			</Container>

		);
	}
}
