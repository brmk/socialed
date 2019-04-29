import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import PostsCollection from '../collection';

publishComposite('posts', function({ page, selectedUsers }) {
	if (!this.userId) return this.ready();
	return {
		find() {
			return PostsCollection.find(
				{
					...(selectedUsers.length ? { userId: { $in: selectedUsers } } : {})
				},
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
					return Meteor.users.find(post.userId, {
						fields: { 'profile.fullName': 1, emails: 1 }
					});
				}
			}
		]
	};
});
