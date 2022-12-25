const express = require("express");
const router = express.Router();
const { verifyJWT, verifyUser, verifyAdmin } = require("../utils/verifyJWT");
const hotelController = require("../controller/hotelController");

router
    .get("/countByCity", hotelController.countByCity)
    .get("/countByType", hotelController.countByType);

router
    .route("/")
    .post(verifyAdmin, hotelController.createHotel)
    .get(hotelController.getAllHotels);

router
    .route("/hotel/:id")
    .put(verifyAdmin, hotelController.updateHotel)
    .delete(verifyAdmin, hotelController.deleteHotel)
    .get(hotelController.getSingleHotel);
router.get("/room/:id", hotelController.getHotelRooms);

module.exports = router;