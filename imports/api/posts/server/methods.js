import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import PostsCollection from '../collection';

Meteor.methods({
	'posts.insert': function({ body }) {
		if (!this.userId) {
			throw Meteor.Error('Not authorized');
		}

		if (typeof body !== 'string' || body.length <= 5) {
			throw Meteor.Error('Post should be longer than 5 characters');
		}

		const _id = PostsCollection.insert({
			body,
			userId: this.userId,
			createdAt: new Date()
		});

		return _id;
	},

	'posts.count'({ selectedUsers }) {
		if (!this.userId) {
			throw Meteor.Error('Not authorized');
		}

		return PostsCollection.find({
			...(selectedUsers.length ? { userId: { $in: selectedUsers } } : {})
		}).count();
	},

	'posts.clear'() {
		if (!this.userId) {
			throw Meteor.Error('Not authorized');
		}

		if (!Meteor.users.findOne(this.userId).isAdmin) {
			throw Meteor.Error('Access Denied!');
		}
		PostsCollection.remove({});
	},

	'posts.populate'(number = 10) {
		if (!this.userId) {
			throw Meteor.Error('Not authorized');
		}

		const userIds = Meteor.users.find().map((u) => u._id);
		for (let i = 0; i < number; i++) {
			PostsCollection.insert({
				body: faker.lorem.sentence(),
				userId: faker.random.arrayElement(userIds),
				createdAt: faker.date.recent()
			});
		}
	}
});
