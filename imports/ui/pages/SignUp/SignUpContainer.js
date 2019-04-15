import React, { Component } from 'react';
import SignUp from './SignUp';
import { toast } from 'react-toastify';
import Joi from 'joi';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

const EMAIL_VALIDATOR = Joi.string().email({ minDomainAtoms: 2 }).required();
const PASSWORD_VALIDATOR = Joi.string().min(6).max(20).required();

<<<<<<< HEAD
export default class SignUpContainer extends Component {
	state = {
		email: '',
		password: '',
		confirmPassword: '',
		fullName: ''
	};
=======
class SignUpContainer extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  }
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32

	onSubmit = (e) => {
		e.preventDefault();
		const { isLogin } = this.props;
		const { email, password, confirmPassword, fullName } = this.state;

		if (isLogin) {
			this.signIn({ email, password });
		} else {
			this.signUp({ email, password, confirmPassword, fullName });
		}
	};

	signIn = ({ email, password }) => {
		const schema = Joi.object().keys({
			email: EMAIL_VALIDATOR,
			password: PASSWORD_VALIDATOR
		});

		const { error } = Joi.validate({ email, password }, schema);
		if (error) {
			toast.error(error.details[0].message);
			return;
		}

		Meteor.loginWithPassword(email, password, (error) => {
			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Successfully logged in');
				this.props.history.push('/');
			}
		});
	};

	signUp = ({ email, password, confirmPassword, fullName }) => {
		const schema = Joi.object().keys({
			email: EMAIL_VALIDATOR,
			password: PASSWORD_VALIDATOR,
			fullName: Joi.string().min(2).max(20).required()
		});

		const { error } = Joi.validate({ email, password, fullName }, schema);
		if (error) {
			toast.error(error.details[0].message);
			return;
		}

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		Accounts.createUser(
			{
				email,
				password,
				profile: {
					fullName
				}
			},
			(error) => {
				if (error) {
					toast.error(error.message);
				} else {
					toast.success('Successfully registered');
					this.props.history.push('/');
				}
			}
		);
	};

	onChange = (fieldName, value) => {
		this.setState({
			[fieldName]: value
		});
	};

<<<<<<< HEAD
	render() {
		const { email, password, confirmPassword, fullName } = this.state;
		return (
			<SignUp
				onSubmit={this.onSubmit}
				onChange={this.onChange}
				email={email}
				password={password}
				confirmPassword={confirmPassword}
				fullName={fullName}
				{...this.props}
			/>
		);
	}
}
=======
  render() {
    const { email, password, confirmPassword, fullName } = this.state;

    return (
      <SignUp
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        fullName={fullName}
        {...this.props}
      />
    );
  }
}

export default SignUpContainer;
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32
