const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const result = blogs.map((blog) => blog.likes).reduce((a, b) => a + b);
  return result;
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
  const result = { title: favorite.title, author: favorite.author, likes: favorite.likes };
  return result;
};

const mostBlogs = (blogs) => {
  const authors = [];
  blogs.forEach((blog) => {
    authors[blog.author] = (!authors[blog.author]) ? 1 : authors[blog.author] + 1;
  });
  const obj = Object.entries(authors).map(([k, v]) => ({ author: k, blogs: v }));
  return obj.reduce((a, b) => (a > b ? a : b));
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs,
};
