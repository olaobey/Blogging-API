const blogService = require("./../.././services/blogService");
const createBlog = async (req, res) => {
  try {
    const newBlog = newPost({
      ...req.body,
      createdBy: req.user._id,
    });
    await newBlog.save();
    return res.status(201).json({
      message: "Blog successfully created",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const removeBlog = async (req, res) => {
  try {
    const deleted = await blogService.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    return res.status(204).json({
      message: "Item successfully deleted",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    await blogService.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({
      message: "Item successfully updated",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      blogService
        .find({})
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      blogService.count({}),
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);
    return res.status(201).json({
      object: "list",
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const editBlog = async (req, res) => {
  try {
    const blog = await blogService.findById(req.user.id);
    const editedBlog = editedPost({
      ...req.body,
      createdBy: req.user.id,
    });
    await editedBlog.save();
    if (edited) {
      return res.status(200).json(blog);
    }
    return res.status(404).json({
      message: "Blog not edited",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  createBlog,
  removeBlog,
  updateBlog,
  getAllBlogs,
  editBlog,
};
