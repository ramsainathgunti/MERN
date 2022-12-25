const express = require("express");
const router = express.Router();
const roomController = require("../controller/roomController");
const { verifyJWT, verifyUser, verifyAdmin } = require("../utils/verifyJWT");

router.get("/", roomController.getAllRooms);
router.put("/availability/:id", roomController.updateRoomAvailability);
router.route("/:hotelid").post(verifyAdmin, roomController.createRoom);
router.delete("/:id/:hotelid", verifyAdmin, roomController.deleteRoom);

router
    .route("/:id")
    .get(roomController.getSingleRoom)
    .put(verifyAdmin, roomController.updateRoom);

module.exports = router;