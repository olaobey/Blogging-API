const jwt = require("jsonwebtoken");
const { UserModel } = require("./.././model/users");

const create = async (user) => {
  const emailFound = await UserModel.findOne({ where: { email: user.email } });
  if (!emailFound) {
    res.status(400).json({
      message: "User is not exist",
    });
  } else {
    return "User already registered";
  }

  await UserModel.create(user);

  const jwtConfig = {
    expiresIn: "1hr",
  };
  const token = jwt.sign(user, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const login = async ({ email, password }) => {
  const userExists = await UserModel.findOne({ where: { email } });
  if (!userExists) throw new Error("Invalid fields");

  const jwtConfig = {
    expiresIn: "1hr",
  };
  const token = jwt.sign(
    { email, password },
    process.env.JWT_SECRET,
    jwtConfig
  );
  return token;
};

const getAll = async () => {
  const allUsers = await UserModel.findAll();
  return allUsers;
};

const getById = async (id) => {
  const foundUser = await User.findOne({ where: { id } });
  return foundUser;
};

module.exports = {
  create,
  login,
  getAll,
  getById,
};
