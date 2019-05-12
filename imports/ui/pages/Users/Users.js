import React, { Fragment } from 'react';
import { ListGroup, ListGroupItem, Img } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, CardImg, Button } from 'reactstrap';

const Users = ({ users, handleFollow, subscriptions }) => {
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

	if (!users.length) return <h3>No users</h3>;
	return (
		<Fragment>
			<h3 className="text-center">Users</h3>
			{users.map((user) => {
				const profileLink = `/profile/${user.username}`;
				return (
					<ListGroup flush className="container" key={user._id}>
						<ListGroupItem
							className={
								user._id === Meteor.userId() ? (
									'd-flex align-items-center active'
								) : (
									'd-flex align-items-center'
								)
							}
						>
							<Link to={profileLink}>
								<CardImg
									src={Gravatar.imageUrl(Gravatar.hash(user.emails[0].address), options)}
									style={imageStyles}
								/>
							</Link>
							<span className="justify-self-start">
								<Link to={profileLink}>{user.profile.fullName}</Link>{' '}
								<Link to={profileLink}>
									{'@'}
									{user.username}
								</Link>
							</span>
							{user._id !== Meteor.userId() ? (
								<Button className="btn-follow ml-auto" onClick={() => handleFollow(user._id)}>
									{subscriptions.following.includes(user._id) ? 'Unfollow' : 'Follow'}
								</Button>
							) : (
								''
							)}
						</ListGroupItem>
					</ListGroup>
				);
			})}
		</Fragment>
	);
};

export default Users;
