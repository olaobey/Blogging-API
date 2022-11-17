const paginatedResults = (model) => {
  return async (req, res, next) => {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {
      currentPage: {
        page: page,
        limit: limit,
      },
    };

    const totalCount = await model.countDocuments().exec();

    results.totalDocs = totalCount;
    if (endIndex < totalCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.totalPages = Math.ceil(totalCount / limit);
    results.lastPage = Math.ceil(totalCount / limit);

    // Sort
    const sort = {};
    if (req.query.sortBy && req.query.OrderBy) {
      sort[req.query.sortBy] =
        req.query.OrderBy.toLowerCase() === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    // Filter
    let filter = {};
    if (req.query.filterBy && req.query.blog) {
      console.log(req.query.blog.toLowerCase());
    } else if (req.query.blog.toLowerCase() === "all blogs") {
      filter = {};
    }

    // Search
    if (req.query.search) {
      filter = {
        $or: [
          { name: { $regex: req.query.search } },
          { price: { $regex: req.query.search } },
          { description: { $regex: req.query.search } },
          { category: { $regex: req.query.search } },
        ],
      };
    }
    console.log("filter", filter);

    try {
      results.results = await model
        .find(filter)
        .select(
          "title description author state read_count read_time tags body "
        )
        .populate("firstName lastName email address islogging timestamp") // populate return merge result
        .limit(limit)
        .sort(sort)
        .skip(startIndex)
        .exec();

      // Add paginated Results to the request

      res.paginatedResults = results;
      next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = paginatedResults;
