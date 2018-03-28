import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

export default class FavoriteForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: props.listToEdit ? props.listToEdit.title : "",
			message: null,
			editingList: props.listToEdit ? true : false,
			createdListTitle: ""
		};
		console.log(this.state);
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
		let body = {title: this.state.name, id:this.props.listToEdit ? this.props.listToEdit.id : "", movies: this.props.favoriteList}
		let options = {
			method: this.state.editingList ? "PATCH" : "POST",
			header:{
				"Content-type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify(body)

		}
		if (this.state.editingList) {
			fetch(`http://localhost:4000/lists/${this.props.listToEdit.id}`, options)
				.then(res => res.json())
				.then(json => {
					alert(json.message)
					if (!json.message.includes("Fail")) {
						this.setState({
							name:"",
							createdListTitle: json.list_title,
							editingList: false
						})
						this.props.clearFavoriteList()
					}
				})

		} else {
			fetch(`http://localhost:4000/lists`, options)
				.then(res => res.json())
				.then(json => {
					alert(json.message)
					if (json.message === "Success") {
						this.setState({
							name:"",
							createdListTitle: json.list_title,
							editingList: false
						})
						this.props.clearFavoriteList()
					}
				})
		}
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
					<Form.Button type="submit" content={this.state.editingList ? 'Update' : 'Create'}></Form.Button>
				</Form.Group>
				</Form>
			</div>

		);
	}
}
