import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

<<<<<<< HEAD
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
=======

const PostForm = props => (
  <Fragment>
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label for="bodyInput">Message</Label>
        <Input invalid={isUndefined(props.validBody) ? undefined /* For neutral color of form before first onChange */ : !props.validBody}
          valid={props.validBody} type="textarea" name="body" id="bodyInput" onChange={props.onChangeBody} placeholder="Yesterday I..." />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  </Fragment>
);
>>>>>>> 538bdcfb790a0548b72961330cb763a562e47b32

export default PostForm;
