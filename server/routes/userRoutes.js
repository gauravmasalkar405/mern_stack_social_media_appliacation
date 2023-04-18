const {
  register,
  login,
  getUser,
  getUserFriends,
  addRemoveFreind,
} = require("../controllers/userControllers");

const multer = require("multer");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);

// READ
router.post("/getuser/:id", getUser);
router.post("/getuserfriends/:id", getUserFriends);

// UPDATE
// patch method is used to update existing data
router.patch("/addremovefriend/:id/:friendId", addRemoveFreind);

module.exports = router;
