import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { Card, CardText, CardBody, CardImg, Button, Form, Input, Collapse } from 'reactstrap';

const Comment = ({ handleTyping, handleSubmit, comments, deleteComment, isSubmittable }) => {
	function onKeyDown(e) {
		if (e.keyCode == 13 && e.metaKey) {
			handleSubmit();
		}
	}

	const options = {
		secure: true,
		size: 50,
		default: 'mm'
	};
	const imageStyles = {
		width: options.size,
		margin: '3px',
		marginRight: '10px'
	};

	const [ collapse, toggle ] = useState(false);

	return (
		<div>
			{comments.length > 0 ? (
				<Fragment>
					<Button color="link" onClick={() => toggle(!collapse)}>
						{collapse ? (
							'Hide comments'
						) : comments.length > 1 ? (
							`View all ${comments.length} comments`
						) : (
							'View comment'
						)}
					</Button>
					<Collapse isOpen={collapse}>
						{comments.map((comment, index) => (
							<Card key={index} className="m-3">
								<CardBody>
									<CardText>
										<CardImg
											src={Gravatar.imageUrl(
												Gravatar.hash(comment.commentator.emails[0].address),
												options
											)}
											style={imageStyles}
										/>
										{comment.commentator.profile.fullName || comment.userId}
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
						))}
					</Collapse>
				</Fragment>
			) : null}
			<Form onSubmit={handleSubmit}>
				<Input
					type="textarea"
					name="text"
					placeholder="Leave your comment..."
					onChange={handleTyping}
					onKeyDown={onKeyDown}
				/>
				<Button className="mt-1" type="submit" hidden={isSubmittable}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Comment;
