import React, { Fragment } from 'react';
import { Post } from '../../components';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import Comments from '../Comments';
import uuid from 'uuid';
import UsersFilter from './components/UsersFilter';

const Feed = ({ posts, loading, page, postsCount, selectedUsers, setSelectedUsers }) => {
	return (
		<div>
			<Link to="/new" className="btn btn-primary mt-1 mb-1">
				New Post
			</Link>
			<Card style={{ backgroundColor: '#f8f9fa' }}>
				<CardHeader style={{ backgroundColor: '#323A42', color: 'white' }}>
					<UsersFilter selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
				</CardHeader>
				<CardBody id="postsList">
					{posts.map((post, index) => (
						<Card key={index}>
							<CardBody>
								<Post {...post} key={post._id} />
								<Comments key={uuid()} currentPostId={post._id} />
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
