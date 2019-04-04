import React, { Component } from 'react';
import Feed from './Feed';
import feedCollection from '../../collections/feed';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

class FeedContainer extends Component {
	state = {
		posts: []
	};

	async componentDidMount() {
		const posts = await this.getPosts();
		await this.setState({ posts });
	}

	async getPosts() {
		try {
			const posts = await new Promise((resolve, reject) => {
				feedCollection.items.length == 0 ? reject('empty feed') : resolve(feedCollection.items);
			});
			return posts;
		} catch (e) {
			console.log(e);
			return [];
		}
	}

	redirect = () => {
		console.log(this.props);
	};

	render() {
		const { posts, text } = this.state;
		const { loading, isLoggedIn } = this.props;
		if (loading) {
			return <h1>Loading</h1>;
		}
		if (!isLoggedIn) {
			return <Redirect to="/login" />;
		}
		return <Feed {...this.props} posts={posts} text={text} redirect={this.redirect} />;
	}
}

export default withTracker((props) => {
	return {
		user: Meteor.user(),
		loading: Meteor.loggingIn(),
		isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
	};
})(FeedContainer);
