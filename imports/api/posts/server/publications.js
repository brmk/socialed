import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import PostsCollection from '../collection';

publishComposite('posts', function(page) {
	if (!this.userId) return this.ready();
	return {
		find() {
			return PostsCollection.find(
				{},
				{
					sort: {
						createdAt: -1
					},
					limit: 10,
					skip: (page - 1) * 10
				}
			);
		},
		children: [
			{
				find(post) {
					return Meteor.users.find(post.userId);
				}
			}
			// {
			//   find(post){
			//     return customElements.find({postId: post._id})
			//   },

			// }
		]
	};
});
