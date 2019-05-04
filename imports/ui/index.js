import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AppLayout from './layout/AppLayout';
import { ToastContainer } from 'react-toastify';

import { Feed, Profile, PostForm, NotFound, SignUp, Followers, Subscriptions } from './pages';

import 'react-toastify/dist/ReactToastify.css';

import './styles.css';
import { Meteor } from 'meteor/meteor';

export default function App() {
	return (
		<Router>
			<AppLayout>
				<Switch>
					<Route path="/" exact component={Feed} />
					<Route path="/profile" exact component={Profile} />
					<Route path="/followers" exact component={Followers} />
					<Route path="/subscriptions" exact component={Subscriptions} />
					<Route path="/profile/:username" component={Profile} />
					<Route path="/new" exact component={PostForm} />
					<Route path="/register" exact render={(props) => <SignUp {...props} isLogin={false} />} />
					<Route path="/login" exact render={(props) => <SignUp {...props} isLogin />} />
					<Redirect from="/feed" to="/" />
					<Route component={NotFound} />
				</Switch>
				<ToastContainer />
			</AppLayout>
		</Router>
	);
}
