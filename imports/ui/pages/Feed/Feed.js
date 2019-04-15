import React from 'react';
import { Post } from '../../components';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';

const Feed = ({ posts, redirect, loading, page, postsCount, changePage }) => {
	// if (loading) return <h1>...Loading</h1>
	return (
		<div>
			<Button onClick={redirect}>
				<Link to="/new">New Post +</Link>
			</Button>
			<Button onClick={() => changePage(-1)}>Prev Page</Button>
			<Button onClick={() => changePage(1)}>Next Page</Button>
			<Card>
				<CardHeader>
					Page:{page} Count:{postsCount}
				</CardHeader>
				<CardBody>{posts.map((post) => <Post {...post} key={post._id} />)}</CardBody>
			</Card>
		</div>
	);
};

export default Feed;
