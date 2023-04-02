const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const mostLikes = blogs.reduce((maxLikes, blog) => maxLikes < blog.likes? blog.likes : maxLikes, blogs[0].likes);
  return blogs.filter(blog => blog.likes === mostLikes)[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorWithLikes = blogs.reduce((authorWithLikes, blog) => {
    authorWithLikes[blog.author] = (authorWithLikes[blog.author] || 0) + 1;
    return authorWithLikes;
  }, {});

  const maxCount = Math.max(...Object.values(authorWithLikes));
  const author = Object.keys(authorWithLikes).filter(k => authorWithLikes[k] === maxCount);

  return {
    'author': author[0],
    'blogs': maxCount,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorWithLikes = blogs.reduce((authorWithLikes, blog) => {
    authorWithLikes[blog.author] = (authorWithLikes[blog.author] || 0) + blog.likes;
    return authorWithLikes;
  }, {});

  const maxCount = Math.max(...Object.values(authorWithLikes));
  const author = Object.keys(authorWithLikes).filter(k => authorWithLikes[k] === maxCount);

  return {
    author: author[0],
    likes: maxCount
  };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};