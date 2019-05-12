import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import Users from './Users';
import { withTracker } from 'meteor/react-meteor-data';
import { compose } from 'recompose';
import Subscriptions from '/imports/api/subscriptions/collection';

class UsersContainer extends Component {
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
		return <Users {...this.props} handleFollow={this.handleFollow} />;
	}
}

export default compose(
	withTracker((props) => {
		const handlers = [ Meteor.subscribe('subscriptions'), Meteor.subscribe('usersList') ];
		const users = Meteor.users.find({}, { fields: { 'profile.fullName': 1, emails: 1, username: 1 } }).fetch();
		const subscriptions = Subscriptions.find().fetch();
		let subs = [];
		if (subscriptions.length) {
			if (subscriptions[0].hasOwnProperty('following')) {
				subs = subscriptions[0];
			}
		}

		return {
			users,
			subscriptions: subs,
			user: Meteor.user(),
			loading: Meteor.loggingIn() || handlers.some((h) => !h.ready()),
			isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
		};
	})
)(UsersContainer);
