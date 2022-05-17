import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();
//CREATE NEW HOTEL

router.post("/", createHotel);

//UPDATE HOTEL DETAILS
router.put("/:id", updateHotel);

//DELETE A SINGLE HOTEL
router.delete("/:id", deleteHotel);
//GET A SINGLE HOTEL
router.get("/:id", getHotel);
//GET ALL HOTEL LISTINGS
router.get("/", getHotels);

export default router;
