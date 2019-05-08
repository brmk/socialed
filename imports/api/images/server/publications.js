import Images from '../collection';
import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
	Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
	Meteor.publish('files.images.all', function() {
		return Images.find().cursor;
	});
}
