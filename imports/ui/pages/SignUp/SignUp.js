import React, { Fragment } from 'react';
import { Card, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';

const SignUp = ({ onSubmit, email, username, password, confirmPassword, fullName, onChange, isLogin }) => (
	<Card>
		<CardBody>
			<Form onSubmit={onSubmit}>
				{!isLogin ? (
					<Fragment>
						<FormGroup>
							<Label for="fullName">Full Name</Label>
							<Input
								type="text"
								name="fullName"
								id="fullName"
								value={fullName}
								onChange={(e) => onChange('fullName', e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="username">Username</Label>
							<Input
								type="text"
								name="username"
								id="username"
								value={username}
								onChange={(e) => onChange('username', e.target.value)}
							/>
						</FormGroup>
					</Fragment>
				) : null}
				<FormGroup>
					<Label for="email">Email</Label>
					<Input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => onChange('email', e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => onChange('password', e.target.value)}
					/>
				</FormGroup>
				{!isLogin ? (
					<FormGroup>
						<Label for="confirmPassword">Confirm Password</Label>
						<Input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => onChange('confirmPassword', e.target.value)}
						/>
					</FormGroup>
				) : null}
				<Button>{isLogin ? 'Login' : 'Register'}</Button>
				{'  '}
				{isLogin ? <Link to="/register">Create account</Link> : <Link to="/login">I have account</Link>}
			</Form>
		</CardBody>
	</Card>
);

export default SignUp;
