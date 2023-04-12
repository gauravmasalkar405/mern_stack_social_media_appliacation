const {
  register,
  login,
  getUser,
  getUserFriends,
  addRemoveFreind,
} = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

// READ
router.get("/getuser/:id", getUser);
router.get("/getuserfriends/:id", getUserFriends);

// UPDATE
// patch method is used to update existing data
router.patch("/addremovefriend/friendId/:id", addRemoveFreind);

module.exports = router;
