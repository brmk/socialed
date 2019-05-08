import React, { Component } from 'react';
import PostForm from './PostForm';
import { Meteor } from 'meteor/meteor';
import { toast } from 'react-toastify';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import Images from '/imports/api/images/collection';

class PostFormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validBody: undefined,
			imagesLinks: [],
			uploading: [],
			progress: 0,
			inProgress: false
		};
		this.uploadIt = this.uploadIt.bind(this);
	}

	handleSubmit = (event) => {
		event.preventDefault();

		let post = {
			body: event.currentTarget.body.value,
			imagesLinks: this.state.imagesLinks || ''
		};
		console.log('Submited post:', post);

		if (post.body.length < 6) {
			toast.error('Post should be at least 6 characters long');
			return;
		}
		Meteor.call('posts.insert', post, (error) => {
			if (error) {
				toast.error(`Post submittion error: ${error.message}`);
			} else {
				this.setState({ imagesLinks: [] });
				this.props.history.push('/feed');
			}
		});
	};

	onChangeBody = (e) => {
		this.setState({
			validBody: ((t = e.currentTarget.value) => t.length > 5)()
		});
	};

	uploadIt(e) {
		e.preventDefault();

		let self = this;
		if (e.currentTarget.files && e.currentTarget.files[0]) {
			// We upload only one file, in case
			// there was multiple files selected
			const file = e.currentTarget.files[0];
			if (file) {
				let allowedExtension = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp' ];

				if (!(file.size <= 10485760 && allowedExtension.includes(file.type))) {
					document.querySelector('#fileinput').value = '';
					return toast.error(
						"Please upload image with extensions like: 'jpeg', 'jpg', 'png', 'gif', 'bmp', with size equal or less than 10MB"
					);
				}
				let uploadInstance = Images.insert(
					{
						file: file,
						meta: {
							locator: self.props.fileLocator,
							userId: Meteor.userId() // Optional, used to check on server for file tampering
						},
						streams: 'dynamic',
						chunkSize: 'dynamic',
						allowWebWorkers: true // If you see issues with uploads, change this to false
					},
					false
				);

				self.setState({
					uploading: uploadInstance, // Keep track of this instance to use below
					inProgress: true // Show the progress bar now
				});

				// These are the event functions, don't need most of them, it shows where we are in the process
				uploadInstance.on('start', function() {
					console.log('Starting');
				});

				uploadInstance.on('end', function(error, fileObj) {
					console.log('On end File Object: ', fileObj);
				});

				uploadInstance.on('uploaded', function(error, fileObj) {
					console.log('uploaded: ', fileObj);
					// Remove the filename from the upload box
					// self.refs['fileinput'].value = '';
					// Reset our state for the next file
					self.setState({
						uploading: [],
						progress: 0,
						inProgress: false
					});
					const imagesLinks = [ ...self.state.imagesLinks ];
					imagesLinks.push({ id: fileObj._id, ext: fileObj.extensionWithDot });
					self.setState({ imagesLinks });
				});

				uploadInstance.on('error', function(error, fileObj) {
					console.log('Error during upload: ' + error);
				});

				uploadInstance.on('progress', function(progress, fileObj) {
					console.log('Upload Percentage: ' + progress);
					// Update our progress bar
					self.setState({
						progress: progress
					});
				});

				uploadInstance.start(); // Must manually start the upload
			}
		}
	}

	// This is our progress bar, bootstrap styled
	// Remove this function if not needed
	showUploads() {
		if (!_.isEmpty(this.state.uploading)) {
			return (
				<div>
					{this.state.uploading.file.name}

					<div className="progress progress-bar-default">
						<div
							style={{ width: this.state.progress + '%' }}
							aria-valuemax="100"
							aria-valuemin="0"
							aria-valuenow={this.state.progress || 0}
							role="progressbar"
							className="progress-bar"
						>
							<span className="sr-only">{this.state.progress}% Complete (success)</span>
							<span>{this.state.progress}%</span>
						</div>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<PostForm
					onChangeBody={this.onChangeBody}
					handleImageUpload={this.handleImageUpload}
					handleSubmit={this.handleSubmit}
					uploadIt={this.uploadIt}
					loaded={this.props.files && this.props.docsReadyYet}
					inProgress={this.state.inProgress}
					validBody={this.state.validBody}
					imagesLinks={this.state.imagesLinks}
					{...this.props}
				/>
			</div>
		);
	}
}

export default withTracker((props) => {
	const filesHandle = Meteor.subscribe('files.images.all');
	const docsReadyYet = filesHandle.ready();
	const files = Images.find({}, { sort: { name: 1 } }).fetch();

	return {
		docsReadyYet,
		files
	};
})(PostFormContainer);
