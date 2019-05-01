import { Meteor } from 'meteor/meteor';
import Subscriptions from '../collection';

Meteor.methods({
	'subscription.follow': function(follow) {
		if (!this.userId) {
			throw new Meteor.Error('Not authorized');
		}
		const { follower, following } = follow;
		let pushed = false;
		if (Subscriptions.find({ user: following, followers: follower }).count() > 0) {
			Subscriptions.update({ user: following }, { $pull: { followers: follower } });
			Subscriptions.update({ user: follower }, { $pull: { following: following } });
		} else {
			Subscriptions.update({ user: following }, { $push: { followers: follower } }, { upsert: true });
			Subscriptions.update({ user: follower }, { $push: { following: following } }, { upsert: true });
			pushed = true;
		}
		return pushed;
	},
	'subscriptions.count'() {
		if (!this.userId) {
			throw new Meteor.Error('Not authorized');
		}

		return Subscriptions.find().count();
	}
});
