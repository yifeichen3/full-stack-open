const express = require('express');
const Blog = require('../models/blog');

const blogRouter = express.Router();

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogRouter.post('/', (request, response, next) => {
  const body = request.body;
  if (!body.like) {
    body.like = 0;
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    like: 0
  });

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => next(error));
});

module.exports = blogRouter;

