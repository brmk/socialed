<<<<<<< HEAD
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
=======
import React from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { toast } from 'react-toastify';
import withMousePosition from '/imports/ui/hocs/withMousePosition';
import { compose } from 'recompose';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    console.log(this.props);
    return (
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand onClick={() => this.props.history.push('/')} ><img src="/socialed-logo.png" height="50" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle disabled={!this.props.isLoggedIn} nav caret>
                  {this.props.isLoggedIn ? this.props.user.profile.fullName : 'Not logged in'}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => { this.props.history.push('/profile') }}>
                    Profile
                    </DropdownItem>
                  {/* <DropdownItem>
                    TODO: Option 2
                    </DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem onClick={() => { Meteor.logout(); toast.success('Successfully logged out'); }}>
                    Logout
                    </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}


export default compose(
  withRouter,
  withTracker(() => {
    return {
      user: Meteor.user(),
      loading: Meteor.loggingIn(),
      isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
    };
  })
)(NavBar);
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32
