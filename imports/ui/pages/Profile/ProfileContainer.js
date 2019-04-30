import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Profile from './Profile';
import { withTracker } from 'meteor/react-meteor-data';

class ProfileContainer extends Component {
	logout() {
		Meteor.logout();
	}

	render() {
		const { loading, isLoggedIn, user } = this.props;
		if (loading) {
			return <h1>Loading</h1>;
		}
		if (!isLoggedIn) {
			return <Redirect to="/login" />;
		}
		if (!user) {
			return <Redirect to="/profile" />;
		}
		return <Profile {...this.props} logout={this.logout} />;
	}
}

export default withTracker((props) => {
	const handlers = [ Meteor.subscribe('usersList') ];
	const { username } = props.match.params;
	let user;
	if (!username) {
		user = [ Meteor.user() ];
	} else {
		user = Meteor.users.find({ username }).fetch();
	}
	return {
		user: user[0],
		loading: Meteor.loggingIn() || handlers.some((h) => !h.ready()),
		isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
	};
})(ProfileContainer);
