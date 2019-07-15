import axios from "axios";

const instance = axios.create({
	baseURL: "https://sam-nc-news.herokuapp.com/api/"
});

const getArticles = topic => {
	return instance
		.get("/articles", {
			params: {
				topic
			}
		})
		.then(({ data }) => {
			return data;
		});
};

export default getArticles;
