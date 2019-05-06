import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { compose } from 'recompose';
import { withTracker } from 'meteor/react-meteor-data';
import { FormGroup, Label, Input, Collapse, Button } from 'reactstrap';
import Subscriptions from '/imports/api/subscriptions/collection';
import { toast } from 'react-toastify';

class UsersFilter extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: false };
	}

	toggle() {
		this.setState((state) => ({ collapse: !state.collapse }));
	}

	static propTypes = {
		selectedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
		setSelectedUsers: PropTypes.func.isRequired
	};

	onChange = (_id, checked) => {
		const { selectedUsers, setSelectedUsers } = this.props;
		const usersSet = new Set(selectedUsers);
		if (checked) {
			usersSet.add(_id);
		} else {
			usersSet.delete(_id);
		}
		setSelectedUsers([ ...usersSet ]);
	};

	showSubscriptionsPosts = (checked) => {
		const { selectedUsers, setSelectedUsers, subscriptions } = this.props;
		const usersSet = [];
		if (checked) {
			if (subscriptions.length < 1) return toast.info('You are not following to any author.');
			usersSet.push(subscriptions);
			this.toggle();
		} else {
			if (subscriptions.length < 1) return;
			usersSet.push([]);
		}
		setSelectedUsers(...usersSet);
	};

	render() {
		const { users, selectedUsers } = this.props;
		return (
			<div>
				<Button color="link" onClick={this.toggle}>
					{'Filter by users'}
				</Button>
				<Collapse isOpen={this.state.collapse}>
					<FormGroup check>
						<Label check className="m-1">
							<Input
								type="checkbox"
								value="following"
								onChange={(e) => this.showSubscriptionsPosts(e.target.checked)}
							/>
							My following authors
						</Label>
					</FormGroup>
					{users.map(({ _id, username }) => (
						<FormGroup check key={_id}>
							<Label check className="m-1">
								<Input
									type="checkbox"
									value={_id}
									checked={selectedUsers.includes(_id)}
									onChange={(e) => this.onChange(_id, e.target.checked)}
								/>
								{username}
							</Label>
						</FormGroup>
					))}
				</Collapse>
			</div>
		);
	}
}

export default compose(
	withTracker((props) => {
		const handlers = [ Meteor.subscribe('usersList'), Meteor.subscribe('subscriptions') ];

		const subscriptions = Subscriptions.find().fetch();
		let subs = [];
		if (subscriptions.length > 0) {
			if (subscriptions[0].hasOwnProperty('following')) {
				subs = subscriptions[0].following;
			}
		}
		return {
			subscriptions: subs,
			users: Meteor.users.find({}, { sort: { username: 1 } }).fetch()
		};
	})
)(UsersFilter);
