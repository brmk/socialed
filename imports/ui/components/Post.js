import React from 'react';
import { Card, CardHeader, CardText, CardBody, Button } from 'reactstrap';

<<<<<<< HEAD
const Post = ({ body, title, id }) => (
	<Card className="mb-4" id={id}>
		<CardHeader>
			<h5>{title}</h5>
		</CardHeader>
		<CardBody>
			<CardText>{body}</CardText>
			{/* <Button>Button</Button> */}
		</CardBody>
	</Card>
=======
const Post = ({ userId, body, createdAt, id, author }) => (
  <Card className="mb-4" id={id}>
    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
    <CardBody>
      <CardSubtitle>{author ? author.profile.fullName : userId}</CardSubtitle>
      <CardText>{body}</CardText>
      <CardText>{String(createdAt)}</CardText>
    </CardBody>
  </Card>
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32
);
export default Post;
