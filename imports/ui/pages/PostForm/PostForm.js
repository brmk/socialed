import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const PostForm = (props) => (
	<Fragment>
		<Form onSubmit={props.handleSubmit}>
			<FormGroup>
				<Label for="bodyInput">Message</Label>
				<Input
					valid={props.validBody}
					type="textarea"
					name="body"
					id="bodyInput"
					onChange={props.onChangeBody}
					placeholder="Yesterday I..."
				/>
			</FormGroup>
			<Button>Submit</Button>
		</Form>
	</Fragment>
);

export default PostForm;
