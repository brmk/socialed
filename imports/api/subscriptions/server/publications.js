import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import Subscriptions from '../collection';

publishComposite('subscriptions', function() {
	if (!this.userId) return this.ready();
	return {
		find() {
			return Subscriptions.find({ user: this.userId });
		}
	};
});
