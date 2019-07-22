import React from "react";

const ArticleDeleter = ({ article_id, deleteArticle }) => {
	return (
		<div>
			<button onClick={() => deleteArticle(article_id)}>Delete Article</button>
		</div>
	);
};

export default ArticleDeleter;
