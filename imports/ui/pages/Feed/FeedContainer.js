import React, { Component } from 'react';
import _ from 'lodash';
import { ReactiveVar } from 'meteor/reactive-var';
import Feed from './Feed';
import PostsCollection from '/imports/api/posts/collection';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

const page = new ReactiveVar(1);
class FeedContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postsCount: 0,
			scrolling: false,
			pageNumber: page.get()
		};
	}

	componentDidMount() {
		setInterval(() => {
			Meteor.call('posts.count', (err, res) => {
				if (err) console.log(err);
				this.setState({ postsCount: res });
			});
		}, 1000);
		this.scrollListener = window.addEventListener('scroll', (event) => {
			this.handleScroll(event);
		});
	}

	redirect = () => {
		console.log(this.props);
	};

	handleScroll = (event) => {
		const { postsCount, scrolling, pageNumber } = this.state;
		if (scrolling) return;
		if (pageNumber >= postsCount / 10) return;

		const lastPost = document.querySelector('#postsList > div:last-child');
		if (!lastPost) return;
		const lastPostOffset = lastPost.offsetTop + lastPost.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		let bottomOffset = 0;
		if (pageOffset > lastPostOffset - bottomOffset) {
			this.loadMore();
		}
	};

	loadPage = () => {
		const { pageNumber } = this.state;
		Meteor.subscribe('posts', pageNumber);
		console.log(pageNumber);
		page.set(pageNumber);
		this.setState({ scrolling: false });
	};

	loadMore = () => {
		this.setState(
			(prevState) => ({
				pageNumber: prevState.pageNumber + 1,
				scrolling: true
			}),
			this.loadPage
		);
	};

	render() {
		const { loading, isLoggedIn } = this.props;
		const { postsCount } = this.state;
		if (loading) {
			return <h1>Loading</h1>;
		}
		if (!isLoggedIn) {
			return <Redirect to="/login" />;
		}
		return (
			<Feed
				{...this.props}
				redirect={this.redirect}
				page={page.get()}
				changePage={this.loadPage}
				postsCount={postsCount}
			/>
		);
	}
}

export default withTracker((props) => {
	const posts = PostsCollection.find().fetch();
	const pageCount = page.get();
	const handlers = [ Meteor.subscribe('posts', page.get()) ];

	const postsWithUsers = posts.map((p) => {
		const user = Meteor.users.findOne(p.userId);
		return { ...p, author: user };
	});

	return {
		posts: postsWithUsers,
		user: Meteor.user(),
		loading: Meteor.loggingIn(), // || handlers.some((h) => !h.ready()),
		isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
	};
})(FeedContainer);
