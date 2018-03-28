import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

export default class FavoriteForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: props.listToEdit !== {} ? props.listToEdit.title : "",
			message: null,
			createdListTitle: ""
		};
		console.log(props);
	}

	// componentWillReceiveProps = (nextProps) => {
	// 	if (nextProps.updateList) {
	// 		console.log(nextProps.updateList);
	// 		this.setState({
	// 			name: this.props.updateList.title
	// 		})
	// 	}
	// }

	postList = () => {
		let body = {title: this.state.name, movies: this.props.favoriteList}
		let options = {
			method: "POST",
			header:{
				"Content-type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify(body)

		}
		fetch(`http://localhost:4000/lists`, options)
			.then(res => res.json())
			.then(json => {
				alert(json.message)
				if (json.message === "Success") {
					this.setState({
						name:"",
						createdListTitle: json.list_title
					})
					this.props.clearFavoriteList()
				}
			})
	}

	handleChange = (e, { value, name }) => {
		this.setState({
			[name]: value
		})
	}

	generatePath = () => {
		return `/lists/${this.state.createdListTitle}`
	}

	// let myLabel = {this.props.listToUpdate ? 'Update List' : 'New List'}
	render() {
		return (
			<div className='center'>
				<Form onSubmit={this.postList}>
					<Form.Group>
						<Form.Input placeholder="name your list" onChange={this.handleChange} name="name" value={this.state.name}/>
					<Form.Button type="submit" content={this.props.listToUpdate ? 'Update' : 'Create'}></Form.Button>
				</Form.Group>
				</Form>
			</div>

		);
	}
}
