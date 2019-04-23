import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { compose } from 'recompose';
import { withTracker } from 'meteor/react-meteor-data';
import { FormGroup, Label, Input } from 'reactstrap';

class UsersFilter extends Component {
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

	render() {
		const { users, selectedUsers } = this.props;
		return (
			<div>
				{users.map(({ _id, profile: { fullName } }) => (
					<FormGroup check key={_id}>
						<Label check className="m-1">
							<Input
								type="checkbox"
								value={_id}
								checked={selectedUsers.includes(_id)}
								onChange={(e) => this.onChange(_id, e.target.checked)}
							/>
							{fullName}
						</Label>
					</FormGroup>
				))}
			</div>
		);
	}
}

export default compose(
	withTracker((props) => {
		const handlers = [ Meteor.subscribe('usersList') ];

		return {
			users: Meteor.users.find({}, { sort: { 'profile.fullName': 1 } }).fetch()
		};
	})
)(UsersFilter);
