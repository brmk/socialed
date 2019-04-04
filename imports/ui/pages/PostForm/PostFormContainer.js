import React, { Component } from 'react';
import PostForm from './PostForm';
import feedCollection from '../../collections/feed';
import { toast } from 'react-toastify';

class PostFormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			id: '',
			title: '',
			body: '',
			titleValid: false,
			bodyValid: false,
			formValid: false
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const postsString = localStorage.getItem('posts');
		const posts = postsString ? JSON.parse(postsString) : [];
		await this.setState({
			posts: {
				id: posts.length + 1,
				title: this.state.title,
				body: this.state.body
			}
		});
		await posts.push(this.state.posts);
		await localStorage.setItem('posts', [ JSON.stringify(posts) ]);
		await this.setState({ id: '', body: '', title: '' });
		await feedCollection.insert(this.state.posts);
		this.props.history.push('/');
		toast.success('Post has been added');
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => this.validateField(name, value));
	};

	validateField(fieldName, value) {
		let titleValid = this.state.titleValid;
		let bodyValid = this.state.bodyValid;

		switch (fieldName) {
			case 'title':
				titleValid = value.length >= 3;
				break;
			case 'body':
				bodyValid = value.length >= 3;
				break;
			default:
				break;
		}
		this.setState(
			{
				titleValid,
				bodyValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({
			formValid: this.state.titleValid && this.state.bodyValid
		});
	}

	render() {
		return (
			<PostForm
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				formValid={this.state.formValid}
				{...this.props}
			/>
		);
	}
}

export default PostFormContainer;
