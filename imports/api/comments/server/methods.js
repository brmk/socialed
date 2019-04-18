import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import CommentsCollection from '../collection';
import PostsCollection from '../../posts/collection';

Meteor.methods({
	'comments.insert': function(comment) {
		if (!this.userId) {
			throw Meteor.Error('Not authorized');
		}
		const { message, postId } = comment;

		if (typeof message !== 'string' || message.length <= 3) {
			throw Meteor.Error('Comment should be longer than 3 characters');
		}

		const _id = CommentsCollection.insert({
			message,
			postId,
			userId: this.userId,
			createdAt: new Date()
		});

		return _id;
	},

	'comments.count'() {
		if (!this.userId) {
			throw Meteor.Error('Not authorized');
		}

		return CommentsCollection.find().count();
	},

	'comments.clear'() {
		if (!this.userId) {
			throw Meteor.Error('Not authorized');
		}

		if (!Meteor.users.findOne(this.userId).isAdmin) {
			throw Meteor.Error('Access Denied!');
		}
		CommentsCollection.remove({});
	},

	'comments.populate'(number = 10) {
		if (!this.userId) {
			throw Meteor.Error('Not authorized');
		}

		const userIds = Meteor.users.find().map((u) => u._id);
		const postIds = PostsCollection.find().map((p) => p._id);
		for (let i = 0; i < number; i++) {
			CommentsCollection.insert({
				message: faker.lorem.sentence(),
				postId: faker.random.arrayElement(postIds),
				userId: faker.random.arrayElement(userIds),
				createdAt: faker.date.recent()
			});
		}
	}
});
