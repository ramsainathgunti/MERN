const createError = require("../utils/error");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createHotel = async(req, res, next) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json(hotel);
    } catch (err) {
        next(createError(400, "Failed to create Hotel"));
    }
};

const getAllHotels = async(req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 1000 },
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
        next(createError(401, "Not Authenticated"));
    }
};

const updateHotel = async(req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};

const deleteHotel = async(req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
};

const getSingleHotel = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
};

const countByCity = async(req, res, next) => {
    const cities = req.query.cities.split(",");

    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

const countByType = async(req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
        const resortCount = await Hotel.countDocuments({ type: "Resort" });
        const cabinCount = await Hotel.countDocuments({ type: "Cabin" });
        const apartmentCount = await Hotel.countDocuments({ type: "Apartments" });
        const villaCount = await Hotel.countDocuments({ type: "Villa" });

        res.status(200).json([
            { type: "Hotel", count: hotelCount },
            { type: "Resort", count: resortCount },
            { type: "Cabin", count: cabinCount },
            { type: "Apartments", count: apartmentCount },
            { type: "Villa", count: villaCount },
        ]);
    } catch (err) {
        next(err);
    }
};

const getHotelRooms = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createHotel,
    updateHotel,
    getAllHotels,
    getSingleHotel,
    deleteHotel,
    countByCity,
    countByType,
    getHotelRooms,
};