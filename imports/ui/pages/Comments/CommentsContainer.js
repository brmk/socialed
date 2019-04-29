import React, { Component } from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import Comments from './Comments';
import { toast } from 'react-toastify';
import CommentsCollection from '/imports/api/comments/collection';
import { withTracker } from 'meteor/react-meteor-data';
import { compose, withState } from 'recompose';

class CommentsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSubmitBtnHidden: true,
			comments: [ { message: '' } ],
			newComment: [ { message: '' } ]
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();

		let comment = {
			message: this.state.newComment.message,
			postId: this.props.currentPostId
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
		if (e.currentTarget.value.length > 2) {
			this.setState({ isSubmitBtnHidden: false });
		} else {
			this.setState({ isSubmitBtnHidden: true });
		}
	};

	deleteComment = (comment) => {
		console.log(comment);
		if (Meteor.userId() === comment.userId) {
			Meteor.call('comments.remove', comment._id, (error) => {
				if (error) {
					toast.error(`Comment removing error: ${error.message}`);
				} else {
					toast.success('Comment removed');
				}
			});
		}
	};

	render() {
		return (
			<Comments
				comments={this.props.comments}
				handleTyping={this.handleTyping}
				handleSubmit={this.handleSubmit}
				deleteComment={this.deleteComment}
				isSubmittable={this.state.isSubmitBtnHidden}
			/>
		);
	}
}

export default compose(
	withState('postID', 'setPostID', ''),
	withTracker((props) => {
		const { currentPostId } = props;

		const handlers = [ Meteor.subscribe('commentsForPost', currentPostId) ];
		const comments = CommentsCollection.find({ postId: currentPostId }).fetch();
		const commentsWithUsers = comments.map((c) => {
			const user = Meteor.users.findOne(c.userId);
			return { ...c, commentator: user };
		});

		return {
			comments: commentsWithUsers,
			user: Meteor.user(),
			loading: Meteor.loggingIn() || handlers.some((h) => !h.ready()),
			isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
		};
	})
)(CommentsContainer);
