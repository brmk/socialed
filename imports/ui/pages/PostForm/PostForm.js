import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import FileUpload from './components/FileUpload';

const PostForm = ({ handleSubmit, imagesLinks, validBody, onChangeBody, uploadIt, inProgress, loaded }) => {
	console.log(imagesLinks);
	return (
		<Fragment>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="bodyInput">Message</Label>
					<Input
						valid={validBody}
						type="textarea"
						name="body"
						id="bodyInput"
						onChange={onChangeBody}
						placeholder="Yesterday I..."
					/>
				</FormGroup>
				{loaded ? <FileUpload uploadIt={uploadIt} inProgress={inProgress} /> : ''}
				{imagesLinks && imagesLinks.length ? (
					<p className="d-flex">
						<img
							src={`http://localhost:3000/files/Images/${imagesLinks[0].id}/original/${imagesLinks[0]
								.id}${imagesLinks[0].ext}`}
							style={{ maxHeight: '300px' }}
							className="ml-auto mr-auto"
						/>
					</p>
				) : (
					''
				)}
				<Button className="mb-2">Submit</Button>
			</Form>
		</Fragment>
	);
};

export default PostForm;
