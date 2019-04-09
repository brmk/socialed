import React from 'react';
import {Link} from 'react-router-dom';
import { Card, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const SignUp = ({ onSubmit, email, password, confirmPassword, fullName, onChange, isLogin }) => (
  <Card>
    <CardBody>
      <Form onSubmit={onSubmit}>
        { !isLogin ? (
          <FormGroup>
            <Label for="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              value={fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </FormGroup>
        ) : null}
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="user@example.com"
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
            placeholder="**********"
          />
        </FormGroup>
        { !isLogin ? (
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
              placeholder="**********"
            />
          </FormGroup>
        ) : null }
        <Button>
          { isLogin ? 'Login' : 'Register' }
        </Button>
      </Form>
        { isLogin ? 
          <div>
            New?
            <Link to="/register"> Register</Link> 
          </div>
        : 
          <div>
            Are you have acount?
            <Link to="/login"> Login</Link>
          </div>
            }

    </CardBody>
  </Card>
);

export default SignUp;
