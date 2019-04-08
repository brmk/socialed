import { Meteor } from 'meteor/meteor';
import PostsCollection from '../collection';

Meteor.publish('posts', function () {
  if (!this.userId) return this.ready();
  return PostsCollection.find(
    {}, 
    {
      sort: {
        createdAt: -1
      }
    }
  );
});
Meteor.publish('userById', function (userId) {
  if (!this.userId) return this.ready();
  return Meteor.users.find(
    {
      _id: userId
    }, 
    {fields:{
      profile: 1,
    }}
  );
});

