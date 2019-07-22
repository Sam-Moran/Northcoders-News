# NC-NEWS

This project was to build a React App that that connects to the numerous endpoints found here: [https://sam-nc-news.herokuapp.com/api]. Those end points were used to create a Reddit [https://www.reddit.com/] style news site, populating the site with articles that could be voted and commented on.

## Getting started

### Dependencies

- Reach Router 1.2.1: [https://reach.tech/router]
- axios 0.19.0: [https://github.com/axios/axios]
- React 16.8.6: [https://reactjs.org/]
- ReactDom 16.8.6: [https://reactjs.org/docs/react-dom.html]
- react-scripts 3.0.1: [https://www.npmjs.com/package/react-scripts]

These packages were installed using the following command:

```bash
npx create-react-app *APP-NAME*
npm install axios @reach/router
```

To test this app you would only need to use the following script to get up and running:

```bash
npm i
```

### Avaliable scripts

```js
npm start

// Launches a locally hosted version of the app and listens for changes on the browser
```

## Using the site

The site launches with the the first page of most recent articles, paginated with a limit of 10 per page. From here you sort the articles by Date posted as well as Vote and Comment counts. These can also be ordered by ascending or descending. In header there are four hard coded buttons, these buttons, from left to right, take you back to the home bage, or to articles related to the topics Football, Cooking or Coding.

These topics can also be found in the middle of the page above the first article in the list, these are dynamically created depending on what topics are on the server.

In the middle of the page there is an option to select a user. This is simply changing the state of the user in the app and is not using any authentification but merely highlighting the conditional rendering of the site.

In each article card is the title, author, date, comment count, vote count and the topic. The title links to that particular article page, the author links to all articles by that author while the topic links to all articles with that topic.

Upon clicking the title you are taken to the corresponding article page. Here you can see the entire article and have the ability to vote and if you have logged in, the ability to comment. When selecting a user in the header the comment box will now appear where a non blank comment can be entered. Dynamically the comment count will also increase. Each user has the ability to delete their own comments, again this dynamically updates the count. Comments are also paginated with a limit of ten, and can be sorted and ordered by date and vote count.

## Deployment

Using the following guide [https://github.com/northcoders/fe-nc-news/blob/master/netlify-deployment.md] this app was deployed to Netlify here:[https://nc-news-sam.netlify.com/].

The back end that this site was built from can be found here: [https://github.com/angriestofhippos/nc-news].

## Author

- **Sam Moran** - [Github: angriestofhippos](https://github.com/angriestofhippos)
