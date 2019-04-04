import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import { NavBar } from '../components';

const AppLayout = ({ children }) => {
	return (
		<Fragment>
			<NavBar />
			<Container>
				<div className="content">{children}</div>
			</Container>
		</Fragment>
	);
};

export default AppLayout;
