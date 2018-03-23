import React, { Component } from "react";
import { Container } from "semantic-ui-react";
// import { NavLink } from "react-router-dom"

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
    const listBlock =   this.state.userLists.map(list => {
        console.log(list.title);
        return <p>{list.title}</p>
      })
    console.log("render", this.state.userLists);
		return (
			<Container>
      {this.state.userLists ?
        listBlock : null }
			</Container>

		);
	}
}
