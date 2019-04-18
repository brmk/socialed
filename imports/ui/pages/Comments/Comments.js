import React from 'react';
import Comments from '../../../api/comments/collection';

const Comment = ({ handleTyping, handleSubmit, comments, postId }) => {
	return (
		<div>
			{comments.length > 0 ? (
				comments.map((comment, index) => (
					<div key={index}>
						<p>
							<b>
								{comment.userId}
								{': '}
							</b>
							{comment.message}
						</p>
					</div>
				))
			) : (
				'no comments'
			)}
			<form onSubmit={handleSubmit}>
				<label>
					<input type="text" onChange={handleTyping} placeholder="Add comment" />
				</label>
			</form>
		</div>
	);
};

export default Comment;
