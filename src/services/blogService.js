const { BlogModel } = require("./../model/blogs");

const getAllBlogs = async () => {
  return await BlogModel.findAll();
};

const createBlog = async (blogInfo) => {
  const { email, password } = blogInfo;
  const result = await BlogModel.findone({ email: email, password: password });
  const userId = result.users.id;
  const createPost = await BlogModel.create({ ...blogInfo, userId });
  const postId = createPost.users.id;
  return postId.users;
};

const editBlog = async (blogInfo) => {
  const { email, password } = blogInfo;
  const result = await BlogModel.findone({ email: email, password: password });
  const userId = result.users.id;
  const editPost = await BlogModel.edit({ ...blogInfo, userId });
  const editId = editPost.users.id;
  return editId.users;
};

const updateBlog = async (blogInfo) => {
  const { email, password } = blogInfo;
  const result = await BlogModel.findone({ email: email, password: password });
  const userId = result.users.id;
  const updatePost = await BlogModel.update({ ...blogInfo, userId });
  const updateId = updatePost.users.id;
  return updateId.users;
};

const deleteBlog = async (blogInfo) => {
  const { email, password } = blogInfo;
  const result = await BlogModel.findone({ email: email, password: password });
  const userId = result.users.id;
  const deletePost = await BlogModel.delete({ ...blogInfo, userId });
  const deleteId = deletePost.users.id;
  return deleteId.users;
};

module.exports = {
  getAllBlogs,
  createBlog,
  editBlog,
  updateBlog,
  deleteBlog,
};
