import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import Follower from './Follower';
import { withTracker } from 'meteor/react-meteor-data';
import { compose } from 'recompose';
import Subscriptions from '/imports/api/subscriptions/collection';

class FollowersContainer extends Component {
	handleFollow = (following) => {
		const follow = { following, follower: Meteor.userId() };
		Meteor.call('subscription.follow', follow, (error, pushed) => {
			if (error) {
				toast.error('Following is not avaible at the moment');
				console.log(error.message);
			}
		});
	};

	render() {
		const { loading, isLoggedIn } = this.props;
		if (loading) {
			return <h1>Loading</h1>;
		}
		if (!isLoggedIn) {
			return <Redirect to="/login" />;
		}
		return <Follower {...this.props} handleFollow={this.handleFollow} />;
	}
}

export default compose(
	withTracker((props) => {
		const handlers = [ Meteor.subscribe('subscriptions'), Meteor.subscribe('usersList') ];
		const subscriptions = Subscriptions.find().fetch();
		let subs = [];
		let followersData = [];
		if (subscriptions.length) {
			if (subscriptions[0].hasOwnProperty('followers')) {
				subs = subscriptions[0];
				followersData = subscriptions[0].followers.map((s) => {
					return Meteor.users.findOne(s);
				});
			}
		}

		return {
			subscriptions: subs,
			followersData,
			user: Meteor.user(),
			loading: Meteor.loggingIn() || handlers.some((h) => !h.ready()),
			isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
		};
	})
)(FollowersContainer);
