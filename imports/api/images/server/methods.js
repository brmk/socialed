import { Meteor } from 'meteor/meteor';
import Images from '../collection';

Meteor.methods({
	'file.remove': function(id) {
		Images.remove({ _id: id }, function(error) {
			if (error) {
				console.error("File wasn't removed, error: " + error.reason);
			} else {
				console.info('File successfully removed');
			}
		});
	},
	'files.clear'() {
		if (!this.userId) {
			throw new Meteor.Error('Not authorized');
		}
		Images.remove({});
	}
});
