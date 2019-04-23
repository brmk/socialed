import React from 'react';
import moment from 'moment';
import { Card, CardHeader, CardText, CardBody, Button, CardSubtitle } from 'reactstrap';

const Comment = ({ handleTyping, handleSubmit, comments, deleteComment }) => {
	return (
		<div>
			{comments.length > 0 ? (
				comments.map((comment, index) => (
					<Card key={index} className="m-3">
						<CardBody>
							<CardText>
								{comment.commentator || comment.userId}
								{': '}
								{comment.message}
							</CardText>
							<CardText>
								<i color="text-muted">{moment(comment.createdAt).fromNow()}</i>
							</CardText>
							{Meteor.userId() === comment.userId ? (
								<Button onClick={deleteComment.bind(this, comment)}>Delete</Button>
							) : (
								''
							)}
						</CardBody>
					</Card>
				))
			) : (
				'no comments'
			)}
			<form onSubmit={handleSubmit}>
				<label>
					<input type="text" onChange={handleTyping} placeholder="Add comment" />
				</label>
			</form>
		</div>
	);
};

export default Comment;
