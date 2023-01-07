const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const result = blogs.map((blog) => blog.likes).reduce((a, b) => a + b);
  return result;
};

module.exports = { dummy, totalLikes };
