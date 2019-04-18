import React, { Fragment } from 'react';
import { Post } from '../../components';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import Comments from '../Comments';
import uuid from 'uuid';

const Feed = ({ posts, redirect, loading, page, postsCount, changePage }) => {
	// if (loading) return <h1>...Loading</h1>

	return (
		<div>
			<Button onClick={redirect}>
				<Link to="/new">New Post +</Link>
			</Button>
			<Card>
				<CardHeader>
					Page:{page} Count:{postsCount}
				</CardHeader>
				<CardBody id="postsList">
					{posts.map((post, index) => (
						<Card key={index}>
							<CardBody>
								<Post {...post} key={post._id} />
								<Comments key={uuid()} postId={post._id} />
							</CardBody>
						</Card>
					))}
				</CardBody>
			</Card>
			<Button onClick={() => scroll(0, 0)}>Up</Button>
		</div>
	);
};

export default Feed;
