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

module.exports = { dummy, totalLikes, favoriteBlog };
