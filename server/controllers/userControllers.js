const bcrypt = require("bcrypt");
const User = require("../models/userModels");

module.exports.register = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      profilePicPath,
      friends,
      location,
      occupation,
    } = req.body;

    // following will run two promises parallaly which will improve performance and use exists method instead of using findone
    const [usernameExists, emailExists] = await Promise.all([
      User.exists({ username }),
      User.exists({ email }),
    ]);

    if (usernameExists) {
      return res.json({
        msg: "Username is already in use",
        status: false,
      });
    }

    if (emailExists) {
      return res.json({
        msg: "Email is already in use",
        status: false,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      profilePicPath,
      password: passwordHash,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    return res.json({
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// logging in
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return res.json({ msg: "User not found.", status: false });
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return res.json({ msg: "Inavalid password", status: false });
    }

    delete userFound.password;

    return res.json({ userFound, status: true });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: error.message });
  }
};

//getting user
module.exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
    return res.status(404).json({ msg: error.message });
  }
};

//getting friends
module.exports.getUserFriends = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    // user.friends stores only id's of friends and we are maping those id and getting all information of all those friends and storing it in friends array
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // this will get only required information of friends
    const formattedFriends = friends.map(
      ({ _id, username, occupation, location, profilePicPath }) => {
        return { _id, username, occupation, location, profilePicPath };
      }
    );
    return res.json({ status: true, formattedFriends });
  } catch (error) {
    next(error);
    return res.status(404).json({ msg: error.message });
  }
};

//UPDATE

module.exports.addRemoveFreind = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id != friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, username, occupation, location, profilePicPath }) => {
        return { _id, username, occupation, location, profilePicPath };
      }
    );

    return res.json({ status: true, formattedFriends });
  } catch (error) {
    next(error);
    return res.status(404).json({ msg: error.message });
  }
};

// getting all users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      return res.json({ status: true, users });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Error retrieving users" });
  }
};
