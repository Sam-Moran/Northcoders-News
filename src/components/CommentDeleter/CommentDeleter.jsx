import React from "react";

const CommentDeleter = ({ comment_id, filterDeletedComment }) => {
	return (
		<div>
			<button onClick={() => filterDeletedComment(comment_id)}>
				Delete Comment
			</button>
		</div>
	);
};

export default CommentDeleter;
