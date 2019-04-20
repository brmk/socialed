import React from 'react';
import moment from 'moment';

const Comment = ({ handleTyping, handleSubmit, comments }) => {
	return (
		<div>
			{comments.length > 0 ? (
				comments.map((comment, index) => (
					<div key={index}>
						<p>
							<b>
								{comment.commentator || comment.userId}
								{': '}
							</b>
							{comment.message} {'  '}
							<p>
								<i color="text-muted">{moment(comment.createdAt).fromNow()}</i>
							</p>
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
