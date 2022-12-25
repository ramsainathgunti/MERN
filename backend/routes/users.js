const express = require("express");
const router = express.Router();
const { verifyJWT, verifyUser, verifyAdmin } = require("../utils/verifyJWT");

const userController = require("../controller/userController");

// router.get("/checkauthentication", verifyJWT, (req, res, next) => {
//     res.send("You are authenticated");
//     next();
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello, you are loggedIn and you are allowed to delete");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, you are loggedIn and you are allowed to delete");
// });

router.route("/").get(verifyAdmin, userController.getAllUsers);

router
    .route("/:id")
    .put(verifyUser, userController.updateUser)
    .delete(verifyUser, userController.deleteUser)
    .get(verifyUser, userController.getSingleUser);

module.exports = router;