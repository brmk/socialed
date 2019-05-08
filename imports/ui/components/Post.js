import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Post = ({ userId, body, createdAt, id, author, handleFollow, subscriptions, imagesLinks }) => {
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
					{author._id !== Meteor.userId() ? (
						<Button className="btn btn-follow ml-auto" onClick={() => handleFollow(author._id)}>
							{subscriptions[0].following.includes(author._id) ? 'Unfollow' : 'Follow'}
						</Button>
					) : null}
				</p>
				<p className="m-3">{body}</p>
				{imagesLinks ? (
					imagesLinks.map((imageLink, index) => (
						<p className="d-flex" key={index}>
							<img
								src={`http://localhost:3000/files/Images/${imageLink.id}/original/${imageLink.id}${imageLink.ext}`}
								className="mb-1 ml-auto mr-auto"
								style={{ maxHeight: '25rem' }}
								alt=" "
							/>
						</p>
					))
				) : (
					''
				)}
				<p>
					<i color="text-muted">{moment(createdAt).fromNow()}</i>
				</p>
			</div>
		</div>
	);
};

export default Post;
