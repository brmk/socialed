import React, { Fragment } from 'react';
import { CardBody, CardTitle, CardText, Card, Button, CardImg } from 'reactstrap';
import { Meteor } from 'meteor/meteor';

const Profile = ({ user, logout }) => {
	const email = Gravatar.hash(user.emails[0].address);

	const options = {
		secure: true,
		size: 250,
		default: 'mm'
	};
	return (
		<div>
			<Card>
				<CardBody>
					<CardImg src={Gravatar.imageUrl(email, options)} style={{ width: options.size }} />
					{Meteor.userId() === user._id ? (
						<CardText>
							<a href="https://en.gravatar.com/gravatars/new/computer" target="_blank">
								Change photo
							</a>
						</CardText>
					) : null}
					<CardTitle>
						{user.profile.fullName} <span className="username">@{user.username}</span>
					</CardTitle>
					{Meteor.userId() === user._id ? (
						<Fragment>
							<CardText>{user.emails[0].address}</CardText>
							<Button onClick={logout}>Logout</Button>
						</Fragment>
					) : null}
				</CardBody>
			</Card>
		</div>
	);
};

export default Profile;
