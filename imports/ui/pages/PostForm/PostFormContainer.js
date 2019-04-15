<<<<<<< HEAD
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
=======
import React, { Component } from "react";
import PostForm from "./PostForm";
import feedCollection from "../../collections/feed";
import { Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { toast } from 'react-toastify';
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32

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

<<<<<<< HEAD
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
=======
class PostFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validBody: undefined
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let post = {
      body: event.currentTarget.body.value
    };

    Meteor.call('posts.insert', post, (error) => {
      if (error) {
        toast.error(`Post submittion error: ${error.message}`);
      } else {
        this.props.history.push('/feed');
      }
    });
  }

  onChangeBody = (e) => {
    this.setState({
      validBody: ((t = e.currentTarget.value) => (
        (t.length > 5) //length must be longer than 5
      ))()
    })
  }
  
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
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32
}

export default PostFormContainer;
