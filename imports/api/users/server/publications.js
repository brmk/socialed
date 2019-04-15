import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function(userIds) {
  if (!this.userId) return this.ready();
  return Meteor.users.find({
    _id: { $in: userIds }
  })
});

