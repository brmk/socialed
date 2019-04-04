import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const PostForm = (props) => {
	console.log(props.formValid);
	return (
		<Fragment>
			<span className="alert" id="message" />
			<Form onSubmit={props.handleSubmit.bind(props)}>
				<h2>New article</h2>
				<FormGroup>
					<Label for="title">Title</Label>
					<Input type="text" name="title" id="title" value={props.title} onChange={props.handleChange} />
				</FormGroup>
				<FormGroup>
					<Label for="body">Body</Label>
					<Input
						type="textarea"
						name="body"
						id="body"
						rows="5"
						value={props.body}
						onChange={props.handleChange}
					/>
				</FormGroup>
				<Button disabled={!props.formValid}>Submit</Button>
			</Form>
		</Fragment>
	);
};

export default PostForm;
