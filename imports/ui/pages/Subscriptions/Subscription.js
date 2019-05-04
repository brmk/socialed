import React, { Fragment } from 'react';
import { ListGroup, ListGroupItem, Img } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, CardImg, Button } from 'reactstrap';

const Subscription = ({ subscriptions, subscriptionsData, handleFollow }) => {
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

	if (!subscriptionsData.length) return <h3>No subscriptions</h3>;
	return (
		<Fragment>
			<h3 className="text-center">My subscriptions</h3>
			{subscriptionsData.map((follower) => {
				const profileLink = `/profile/${follower.username}`;
				return (
					<ListGroup flush className="container" key={follower._id}>
						<ListGroupItem className="d-flex align-items-center">
							<Link to={profileLink}>
								<CardImg
									src={Gravatar.imageUrl(Gravatar.hash(follower.emails[0].address), options)}
									style={imageStyles}
								/>
							</Link>
							<span className="justify-self-start">
								<Link to={profileLink}>{follower.profile.fullName}</Link>{' '}
								<Link to={profileLink}>
									{'@'}
									{follower.username}
								</Link>
							</span>
							<Button className="btn-follow ml-auto" onClick={() => handleFollow(follower._id)}>
								{subscriptions.following.includes(follower._id) ? 'Unfollow' : 'Follow'}
							</Button>
						</ListGroupItem>
					</ListGroup>
				);
			})}
		</Fragment>
	);
};

export default Subscription;
