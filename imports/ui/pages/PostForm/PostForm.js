import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const PostForm = (props) => (
	<Fragment>
		<Form onSubmit={props.handleSubmit}>
			<FormGroup>
				<Label for="bodyInput">Message</Label>
				<Input
					invalid={
						isUndefined(props.validBody) ? (
							undefined /* For neutral color of form before first onChange */
						) : (
							!props.validBody
						)
					}
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
