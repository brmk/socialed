import React, { Component } from 'react';
import _ from 'lodash';
import Author from './Author';

class AuthorsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const authors = Object.values(this.props.users);
		return authors.map((author) => (
			<Author {...this.props} id={author._id} author={author.profile.fullName} key={author._id} />
		));
	}
}

export default AuthorsContainer;
