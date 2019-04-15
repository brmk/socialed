import React from 'react';
import { Post } from '../../components';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import { Button, Card, CardHeader, CardBody } from 'reactstrap';

const Feed = ({ posts, redirect, loading, page, postsCount, changePage }) => {
  // if (loading) return <h1>...Loading</h1>
  return (
    <div>
      <Button onClick={redirect}>
        <Link to="/new">
          New Post +
        </Link>
      </Button>
      <Button onClick={() => changePage(-1)}>Prev Page</Button>
      <Button onClick={() => changePage(1)}>Next Page</Button>
      <Card>
        <CardHeader>Page:{page} Count:{postsCount}</CardHeader>
        <CardBody>
          {posts.map(post => (
            <Post {...post} key={post._id} />
          ))}
        </CardBody>
      </Card>

    </div>
  );
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32
};

export default Feed;
