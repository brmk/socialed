import React from 'react';

FileUpload = ({ uploadIt, inProgress }) => (
	<div className="row">
		<div className="col-md-12">
			<p>Upload image for post (optionaly):</p>
			<input
				className="mb-3"
				type="file"
				id="fileinput"
				onChange={uploadIt}
				disabled={inProgress}
				style={{ maxWidth: '100%' }}
			/>
		</div>
	</div>
);

export default FileUpload;
