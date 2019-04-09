import { Meteor } from 'meteor/meteor';

Meteor.publish('profiles', function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find({}, { fields: { 'profile.fullName': true } });
});
