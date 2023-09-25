const { Router } = require("express");
const { check } = require("express-validator");

const {
  login,
  getAuthStatus,
  getUsers,
  addUser,
  deleteUser,
} = require("../controllers/users");
const validateFields = require("../middlewares/validateFields");
const { register } = require("../controllers/users");
const auth = require("../middlewares/auth");
const verifyRole = require("../middlewares/verifyRole");
// const auth = require("../middlewares/auth");
// const User = require("../models/User");

const router = Router();

router.post(
  "/login",
  [
    check("email").isEmail().isLength({ min: 5, max: 50 }),
    check("password").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/register",
  [
    check("name").not().isEmpty().isString().isLength({ min: 2, max: 30 }),
    check("lastname").not().isEmpty().isString().isLength({ min: 2, max: 30 }),
    check("email").isEmail(),
    check("age").isFloat({ min: 0, max: 150 }),
    check("password")
      .not()
      .isEmpty()
      .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/),
    validateFields,
  ],
  register
);

router.get("/authStatus", auth, getAuthStatus);

router.get("/", auth, getUsers);

router.post("/", auth, verifyRole, addUser);

router.delete("/", auth, verifyRole, deleteUser);

module.exports = router;
