import React, { Component } from 'react';
import PostForm from './PostForm';
import { Meteor } from 'meteor/meteor';
import { toast } from 'react-toastify';

class PostFormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validBody: undefined
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let post = {
			body: event.currentTarget.body.value
		};

		if (post.body.length < 6) {
			toast.error('Post should be at least 6 characters long');
			return;
		}
		Meteor.call('posts.insert', post, (error) => {
			if (error) {
				toast.error(`Post submittion error: ${error.message}`);
			} else {
				this.props.history.push('/feed');
			}
		});
	};

	onChangeBody = (e) => {
		this.setState({
			validBody: ((t = e.currentTarget.value) => t.length > 5)()
		});
	};

	render() {
		return (
			<PostForm
				onChangeBody={this.onChangeBody}
				handleSubmit={this.handleSubmit}
				validBody={this.state.validBody}
				{...this.props}
			/>
		);
	}
}

export default PostFormContainer;
