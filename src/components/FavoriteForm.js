import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

export default class FavoriteForm extends Component {
	state = {};

	render() {
		return (
			<Form>
				<Form.Field>
					<label>Your List</label>
					<input placeholder="name your list" />
				</Form.Field>
				<Button type="submit">Submit</Button>
			</Form>
		);
	}
}
