import React from 'react';

const Author = ({ author, id, handleCheck }) => {
	return (
		<div>
			<label>
				<input type="checkbox" onChange={handleCheck} value={id} />
				{author}
			</label>
		</div>
	);
};

export default Author;
