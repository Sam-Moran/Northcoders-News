import axios from "axios";

const instance = axios.create({
	baseURL: "https://sam-nc-news.herokuapp.com/api/"
});

export const getArticles = (topic, author, sort_by, order, p) => {
	return instance
		.get("/articles", {
			params: {
				topic,
				author,
				sort_by,
				order,
				p
			}
		})
		.then(({ data }) => {
			return data;
		});
};

export const getArticle = id => {
	return instance.get(`/articles/${id}`).then(({ data }) => {
		return data;
	});
};

export const articleComments = (id, sort_by, order) => {
	return instance
		.get(`/articles/${id}/comments`, {
			params: {
				sort_by,
				order
			}
		})
		.then(({ data }) => {
			return data;
		});
};

export const getUser = username => {
	return instance.get(`/users/${username}`).then(({ data }) => {
		return data;
	});
};

export const postComment = (id, comment) => {
	return instance.post(`articles/${id}/comments`, comment).then(({ data }) => {
		return data.comment;
	});
};

export const deleteComment = id => {
	return instance.delete(`comments/${id}`);
};

export const voteUpdater = (id, vote, type) => {
	return instance.patch(`${type}s/${id}`, { inc_votes: vote });
};
