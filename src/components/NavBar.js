import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  Input,
} from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {
    activeItem: 'home',
    searchTerm: "",
   }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name })
      if (name === 'lists') {
        this.props.fetchLists()
    } else if (name === 'home') {
      this.props.clearFavoriteList()
    }

  }

  handleChange = (event, { value }) => this.setState({ searchTerm: value })

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

            <Menu.Item as={NavLink} exact to="/" name='home' onClick={this.handleItemClick} />
            <Menu.Item as={NavLink} exact to="/lists" name='lists' onClick={this.handleItemClick} />
            <Menu.Item position='right'>
              <Input icon='search' placeholder='Movie name...' value={this.state.searchTerm} onChange={this.handleChange}/>
              <NavLink className="ui button" exact to="/results" onClick={this.handleSearch}>Search</NavLink>
            </Menu.Item>

        </Menu>
    )
  }
}
