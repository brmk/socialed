import React from 'react';
import { CardBody, CardTitle, CardText, Card, Button } from 'reactstrap';

const Profile = ({ user, logout }) => (
	<div>
		<Card>
			<CardBody>
				<CardTitle>{user.profile.fullName}</CardTitle>
				<CardText>
					{user.emails[0].address} {user.emails[0].verified ? '(verified)' : '(not verified)'}
				</CardText>
				<Button onClick={logout}>Logout</Button>
			</CardBody>
		</Card>
	</div>
);

export default Profile;
