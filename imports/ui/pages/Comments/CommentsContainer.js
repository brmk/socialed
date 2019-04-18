import React, { Component } from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import Comments from './Comments';
import { toast } from 'react-toastify';
import CommentsCollection from '/imports/api/comments/collection';
import { withTracker } from 'meteor/react-meteor-data';

class CommentsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [ { message: '' } ],
			newComment: [ { message: '' } ]
		};
	}

	componentWillMount = () => {
		let commentsOfPost = [];
		Meteor.subscribe('commentsForPost', this.props.postId);
		commentsOfPost = [ ...CommentsCollection.find({ postId: this.props.postId }).fetch() ];
		this.setState({ comments: commentsOfPost });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		let comment = {
			message: this.state.newComment.message,
			postId: this.props.postId
		};
		if (comment.message.length < 3) return toast.error(`Comment should be at least 3 characters long`);
		Meteor.call('comments.insert', comment, (error) => {
			if (error) {
				toast.error(`Comment submittion error: ${error.message}`);
			} else {
				toast.success('Comment added');
			}
		});
		event.target[0].value = '';
		this.setState({
			newComment: { message: '' }
		});
	};

	handleTyping = (e) => {
		this.setState({
			newComment: { message: e.currentTarget.value }
		});
	};

	render() {
		return (
			<Comments
				comments={this.state.comments}
				postId={this.props.postId}
				handleTyping={this.handleTyping}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

export default withTracker((props) => {
	//const comments = CommentsCollection.find().fetch();
	const handlers = [ Meteor.subscribe('comments') ];

	// const postsWithUsers = posts.map((p) => {
	// 	const user = Meteor.users.findOne(p.userId);
	// 	return { ...p, author: user };
	// });

	return {
		//comments, //: postsWithUsers,
		user: Meteor.user(),
		loading: Meteor.loggingIn(), // || handlers.some((h) => !h.ready()),
		isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
	};
})(CommentsContainer);
