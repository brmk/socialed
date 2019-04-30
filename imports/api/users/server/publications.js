import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function(userIds) {
	if (!this.userId) return this.ready();
	return Meteor.users.find(
		{
			_id: { $in: userIds }
		},
		{ fields: { 'profile.fullName': 1 } }
	);
});

Meteor.publish('usersList', function() {
	if (!this.userId) return this.ready();
	return Meteor.users.find({}, { fields: { 'profile.fullName': 1, emails: 1, username: 1 } });
});
