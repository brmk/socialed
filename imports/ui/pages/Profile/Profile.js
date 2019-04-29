import React from 'react';
import { CardBody, CardTitle, CardText, Card, Button, CardImg } from 'reactstrap';

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
					<CardText>
						<a href="https://en.gravatar.com/gravatars/new/computer" target="_blank">
							Change photo
						</a>
					</CardText>
					<CardTitle>{user.profile.fullName}</CardTitle>
					<CardText>
						{user.emails[0].address} {user.emails[0].verified ? '(verified)' : '(not verified)'}
					</CardText>
					<Button onClick={logout}>Logout</Button>
				</CardBody>
			</Card>
		</div>
	);
};

export default Profile;
