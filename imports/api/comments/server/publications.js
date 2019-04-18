import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import CommentsCollection from '../collection';

publishComposite('comments', function() {
	if (!this.userId) return this.ready();
	return {
		find() {
			return CommentsCollection.find(
				{},
				{
					sort: {
						createdAt: -1
					}
				}
			);
		}
	};
});

publishComposite('commentsForPost', function(post) {
	if (!this.userId) return this.ready();
	return {
		find() {
			return CommentsCollection.find(
				{ postId: post },
				{
					sort: {
						createdAt: -1
					}
				}
			);
		}
	};
});
