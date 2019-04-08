import React from "react";
import { Post } from "../../components";
import { Link } from 'react-router-dom';
import { Button,Container } from 'reactstrap';

const Feed = ({ posts }) => {
  return (
    <div>
      <Container className="text-center">
        <Link to="/new">
          <Button size="lg">
            New Post +
          </Button>
        </Link>
      </Container>
      {posts.map(post => (
        <Post {...post} key={post._id} />
      ))}
    </div>
  );
};

export default Feed;
