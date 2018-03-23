import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

export default class FavoriteForm extends Component {
	state = {
		name:"",
		message:null,
		createdListTitle: ""
	};

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

	render() {
		return (
			<div>
				<Form onSubmit={this.postList}>
					<Form.Field>
						<label>New List</label>
						<Form.Input placeholder="name your list" onChange={this.handleChange} name="name" value={this.state.name}/>
					</Form.Field>
					<Button type="submit">Submit</Button>
				</Form>
			</div>

		);
	}
}
