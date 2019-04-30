import React from 'react';
import { Card, CardHeader, CardImg, CardText, CardBody, Button, CardSubtitle } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
				<p className="authorOfPost">
					<Link to={`/profile/${author.username}`}>
						<img src={Gravatar.imageUrl(email, options)} style={imageStyles} />
					</Link>
					<span className="authorOfPostNames">
						<Link to={`/profile/${author.username}`}>
							<b>{author ? author.profile.fullName : userId}</b>
						</Link>
						<Link to={`/profile/${author.username}`} className="username">
							@{author.username}
						</Link>
					</span>
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
