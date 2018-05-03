import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { Form } from "semantic-ui-react";

 class FavoriteForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: props.listToEdit ? props.listToEdit.title : "",
			message: null,
			editingList: props.listToEdit ? true : false,
			createdListTitle: ""
		};
	}

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
			fetch(`https://favorite-lister-backend.herokuapp.com/lists/${this.props.listToEdit.id}`, options)
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
						this.props.history.push('/lists')
					}
				})

		} else {
			fetch(`https://favorite-lister-backend.herokuapp.com/lists`, options)
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
						this.props.history.push('/lists')
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

export default withRouter(FavoriteForm)
