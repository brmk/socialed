import React from 'react';
import { Card, CardHeader, CardText, CardBody, Button } from 'reactstrap';

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
);
export default Post;
