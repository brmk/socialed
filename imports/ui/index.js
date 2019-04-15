import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AppLayout from './layout/AppLayout';
import { ToastContainer } from 'react-toastify';

// import Feed from "./pages/Feed";
// import PostForm from "./pages/PostForm"
import { Feed, Profile, PostForm, NotFound, SignUp, SignIn } from './pages';

import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

export default function App() {
<<<<<<< HEAD
	return (
		<AppLayout>
			<Router>
				<Switch>
					<Route path="/" exact component={Feed} />
					<Route path="/profile" exact component={Profile} />
					<Route path="/new" exact component={PostForm} />
					<Route path="/register" exact render={(props) => <SignUp {...props} isLogin={false} />} />
					<Route path="/login" exact render={(props) => <SignUp {...props} isLogin />} />
					<Redirect from="/feed" to="/" />
					<Route component={NotFound} />
				</Switch>
			</Router>
			<ToastContainer />
		</AppLayout>
	);
=======
  return (
    <Router>
      <AppLayout>
          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/new" exact component={PostForm} />
            {/* <Route path="/login" exact component={SignIn} /> */}
            <Route path="/register" exact render={(props) => <SignUp {...props} isLogin={false} />}  />
            <Route path="/login" exact render={(props) => <SignUp {...props} isLogin />} />
            <Redirect from="/feed" to="/" />
            <Route component={NotFound} />
          </Switch>
        <ToastContainer />
      </AppLayout>
    </Router>
  );
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32
}
