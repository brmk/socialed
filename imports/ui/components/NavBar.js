import React, { Fragment } from 'react';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isLoggedIn: false
		};
	}

	componentDidMount() {
		this.setState({ isLoggedIn: Meteor.loggingIn() });
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const { loading, isLoggedIn, user } = this.props;
		let feed, addPost, profileLink;

		if (isLoggedIn) {
			feed = (
				<NavItem>
					<NavLink href="/">Feed</NavLink>
				</NavItem>
			);

			addPost = (
				<NavItem>
					<NavLink href="/new">Add post</NavLink>
				</NavItem>
			);
		}

		if (!loading && isLoggedIn) {
			profileLink = (
				<NavItem>
					<NavLink href="/profile">
						{user.profile.fullName}
						<span className="caret" />
					</NavLink>
				</NavItem>
			);
		}

		<NavItem>
			<NavLink href="/">Logout</NavLink>
		</NavItem>;

		return (
			<Navbar color="light" light expand="md">
				<Container>
					<NavbarBrand href="/">Socialed</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav navbar className="ml-auto">
							<Router>
								<Route
									exact
									path="/"
									render={(props) => (
										<Fragment>
											{addPost}
											{profileLink}
										</Fragment>
									)}
								/>
								<Route
									exact
									path="/new"
									render={(props) => (
										<Fragment>
											{feed}
											{profileLink}
										</Fragment>
									)}
								/>

								<Route
									exact
									path="/profile"
									render={(props) => (
										<Fragment>
											{feed}
											{addPost}
										</Fragment>
									)}
								/>
								<Route
									path="/edit"
									render={(props) => (
										<Fragment>
											{feed}
											{addPost}
											{profileLink}
										</Fragment>
									)}
								/>
							</Router>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default withTracker((props) => {
	return {
		user: Meteor.user(),
		loading: Meteor.loggingIn(),
		isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
	};
})(NavBar);
