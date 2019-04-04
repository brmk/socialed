import React from 'react';
import { Post } from '../../components';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Meteor } from 'meteor/meteor';

const Feed = ({ posts, text, redirect }) => {
	let renderContent;
	if (posts.length) {
		renderContent = (
			<div className="content">
				<h1> {text}</h1>
				{posts.map((post) => <Post {...post} key={post.id} />)}
			</div>
		);
	} else {
		renderContent = (
			<div className="content">
				<h4>No posts founded</h4>
				<Link to="/new">Add post</Link>
			</div>
		);
	}
	return <div className="container">{renderContent}</div>;
};

export default Feed;
