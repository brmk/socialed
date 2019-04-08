import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Col, Row, Button, Container, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Card } from 'reactstrap';


const Profile = ({ user }) => (
  <Card>
    <Row>

      <Col xs="3">
        <img src="https://secure.gravatar.com/avatar/e75cb397404f3bc9bf9b12290df5e3d6?s=100&r=g&d=mm" />
      </Col>
      <Col xs="7">
        <Row tag="h2">
            {user.profile.fullName}
        </Row>
        <Row>
          <Col xs="6">
            Emails:
          </Col>
          <Col xs="6">
            {user.emails[0].address} {user.emails[0].verified ? '(verified)' : '(not verified)'}
          </Col>
        </Row>
      </Col>
      <Col xs="2">
        <Button>Edit profile</Button>
      </Col>
    </Row>
  </Card>
);

export default Profile;


