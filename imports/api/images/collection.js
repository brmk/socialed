import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
	storagePath: 'assets/app/uploads/Images',
	downloadRoute: '/files',
	collectionName: 'Images',
	permissions: 777,
	allowClientCode: true,
	cacheControl: 'public, max-age=31536000',

	onbeforeunloadMessage() {
		return 'Upload is still in progress! Upload will be aborted if you leave this page!';
	},
	onBeforeUpload(file) {
		if (file.size <= 10485760 && /png|jpe?g/i.test(file.ext)) {
			return true;
		}
		return 'Please upload image, with size equal or less than 10MB';
	},
	downloadCallback(fileObj) {
		if (this.params.query.download == 'true') {
			// Increment downloads counter
			Images.update(fileObj._id, { $inc: { 'meta.downloads': 1 } });
		}
		// Must return true to continue download
		return true;
	}
});

// Export FilesCollection instance, so it can be imported in other files
export default Images;
