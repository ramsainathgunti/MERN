const createError = require("../utils/error");
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        const newRoom = await Room.create(req.body);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });
        } catch (err) {
            next(err);
        }
        res.status(201).json(newRoom);
    } catch (err) {
        next(err);
    }
};

const getAllRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(createError(401, "Not Authenticated"));
    }
};

const updateRoom = async(req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

const updateRoomAvailability = async(req, res) => {
    try {
        await Room.updateOne({ "roomNumbers._id": req.params.id }, { $push: { "roomNumbers.$.unavailableDates": req.body.dates } });
        res.status(200).json("Room Status has been updated");
    } catch (err) {
        next(err);
    }
};

const deleteRoom = async(req, res) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err);
    }
};

const getSingleRoom = async(req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom,
    updateRoomAvailability,
};