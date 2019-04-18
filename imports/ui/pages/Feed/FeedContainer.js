import React, { Component } from 'react';
import _ from 'lodash';
import { ReactiveVar } from 'meteor/reactive-var';
import Feed from './Feed';
import PostsCollection from '/imports/api/posts/collection';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import Authors from '../Authors';

const page = new ReactiveVar(1);
class FeedContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postsCount: 0,
			scrolling: false,
			pageNumber: page.get(),
			checkedAuthors: [],
			posts: []
		};
	}

	componentDidMount() {
		setTimeout(() => {
			Meteor.call('posts.count', (err, res) => {
				if (err) console.log(err);
				this.setState({ postsCount: res });
			});
		}, 1000);
		this.scrollListener = window.addEventListener('scroll', (event) => {
			this.handleScroll(event);
		});
		this.loadPage();
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
			return;
		}
	};

	loadPage = () => {
		const { pageNumber, checkedAuthors } = this.state;
		setTimeout(() => {
			Meteor.subscribe('posts', page.get());
			console.log('page number: ', pageNumber);
			page.set(pageNumber);
			this.setState({ scrolling: false });
		}, 300);
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

	handleCheck = (e) => {
		const authorId = e.target.value;
		let checkedAuthors = [ ...this.state.checkedAuthors ];
		if (checkedAuthors.includes(authorId)) {
			_.remove(checkedAuthors, (author) => author == authorId);
		} else {
			checkedAuthors.push(authorId);
		}
		this.setState({ checkedAuthors } /* this.loadData */);
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
		const posts = _.flatten(this.state.posts);
		return (
			<div>
				<Authors users={this.props.users} handleCheck={this.handleCheck} />
				<Feed
					posts={this.props.posts}
					//{...this.props}
					redirect={this.redirect}
					page={page.get()}
					changePage={this.loadPage}
					postsCount={posts.length}
				/>
			</div>
		);
	}
}

export default withTracker((props) => {
	const posts = PostsCollection.find().fetch();
	const users = Meteor.users.find().fetch();
	const pageCount = page.get();
	const handlers = [ Meteor.subscribe('posts', page.get()) ];

	const postsWithUsers = posts.map((p) => {
		const user = Meteor.users.findOne(p.userId);
		return { ...p, author: user };
	});

	return {
		posts: postsWithUsers,
		users,
		user: Meteor.user(),
		loading: Meteor.loggingIn(), // || handlers.some((h) => !h.ready()),
		isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
	};
})(FeedContainer);
