import React, { Component } from 'react';
import _ from 'lodash';
import Feed from './Feed';
import PostsCollection from '/imports/api/posts/collection';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { compose, withState } from 'recompose';

const POSTS_PER_PAGE = 10;
class FeedContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postsCount: 0,
			scrolling: false
		};
	}

	fetchPostsCount = _.debounce(() => {
		const { selectedUsers } = this.props;
		Meteor.call('posts.count', { selectedUsers }, (err, res) => {
			if (err) console.log(err);
			this.setState({ postsCount: res });
		});
	}, 500);

	componentDidMount() {
		this.fetchPostsCount();
		this.scrollListener = window.addEventListener('scroll', (event) => {
			this.handleScroll(event);
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(this.props.selectedUsers, prevProps.selectedUsers)) {
			this.fetchPostsCount();
		}
	}

	redirect = () => {
		console.log(this.props);
	};

	handleScroll = (event) => {
		const { postsCount, scrolling } = this.state;
		const { page } = this.props;
		const currentPage = page;
		if (scrolling) return;
		if (currentPage > Math.ceil(postsCount / POSTS_PER_PAGE)) return;
		const lastPost = document.querySelector('#postsList > div:last-child');
		if (!lastPost) return;
		const lastPostOffset = lastPost.offsetTop + lastPost.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		let bottomOffset = 0;
		if (pageOffset > lastPostOffset - bottomOffset) {
			this.loadMore();
			return;
		}
	};

	loadPage = () => {
		const { page, setPage, selectedUsers } = this.props;
		Meteor.subscribe('posts', { page, selectedUsers });
		setPage(page + 1);
		console.log('page number: ', page);
		this.setState({ scrolling: false });
	};

	loadMore = _.throttle(() => {
		//const { loadPage } = this;
		this.loadPage();
	}, 1000);

	render() {
		const { loading, isLoggedIn } = this.props;
		const { postsCount } = this.state;
		if (loading) {
			return <h1>Loading</h1>;
		}
		if (!isLoggedIn) {
			return <Redirect to="/login" />;
		}
		const posts = _.flatten(this.state.posts);
		return <Feed {...this.props} redirect={this.redirect} changePage={this.loadPage} postsCount={postsCount} />;
	}
}

export default compose(
	withState('isInitialLoading', 'setIsInitialLoading', true),
	withState('selectedUsers', 'setSelectedUsers', []),
	withState('page', 'setPage', 1),
	withTracker((props) => {
		const { page, selectedUsers, isInitialLoading, setIsInitialLoading } = props;

		const handlers = [ Meteor.subscribe('posts', { page, selectedUsers }) ];

		const posts = PostsCollection.find().fetch();

		const postsWithUsers = posts.map((p) => {
			const user = Meteor.users.findOne(p.userId);
			return { ...p, author: user };
		});

		let loading = Meteor.loggingIn() || handlers.some((h) => !h.ready());
		if (!isInitialLoading) {
			loading = false;
		} else {
			if (!loading) {
				setIsInitialLoading(false);
			}
		}

		return {
			posts: postsWithUsers,
			user: Meteor.user(),
			loading,
			isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
		};
	})
)(FeedContainer);
