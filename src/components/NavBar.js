import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Menu,
  Input,
} from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {
    activeItem: 'home',
    searchTerm: "",
   }

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  handleChange = (event, { value }) => this.setState({ searchTerm: value },()=>console.log(this.state))

  handleSearch = (event) => {
    this.props.search(this.state.searchTerm)
    this.setState({
      searchTerm: ""
    })
  }

  render() {

      return (
        <Menu inverted
          pointing
          size='large'
        >
          <Container>
            <Menu.Item as={NavLink} exact to="/" name='home' onClick={this.handleItemClick} />
            <Menu.Item position='right'>
              <Input icon='search' placeholder='Movie name...' value={this.state.name} onChange={this.handleChange}/>
              <NavLink className="ui button" exact to="/results" onClick={this.handleSearch}>Search</NavLink>
            </Menu.Item>
          </Container>
        </Menu>
    )
  }
}
