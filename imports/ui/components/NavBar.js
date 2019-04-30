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
import { compose } from 'recompose';

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
			<Navbar color="light" light expand="md">
				<Container>
					<NavbarBrand onClick={() => this.props.history.push('/')}>
						<img src="/socialed-logo.png" height="50" />
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle disabled={!this.props.isLoggedIn} nav caret>
									{this.props.isLoggedIn ? this.props.user.profile.fullName : 'Not logged in'}
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem
										onClick={() => {
											this.props.history.push('/profile');
										}}
									>
										Profile
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem
										onClick={() => {
											Meteor.logout();
											this.props.history.push('/login');
											toast.success('Successfully logged out');
										}}
									>
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
