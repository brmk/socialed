import React from 'react';
import { Card, CardHeader, CardImg, CardText, CardBody, Button, CardSubtitle } from 'reactstrap';
import moment from 'moment';

const Post = ({ userId, body, createdAt, id, author }) => {
	const email = Gravatar.hash(author.emails[0].address);
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

	return (
		<div className="ml-2 mb-5" id={id}>
			<div>
				<p>
					<img src={Gravatar.imageUrl(email, options)} style={imageStyles} />
					<b>{author ? author.profile.fullName : userId}</b>
				</p>
				<p className="m-3">{body}</p>
				<p>
					<i color="text-muted">{moment(createdAt).startOf('day').fromNow()}</i>
				</p>
			</div>
		</div>
	);
};
export default Post;
