import express from "express";
import { send_reservation,get_all_reservations }  from "../controller/reservation.js";

const router = express.Router();

// save reservation ------->
router.post("/send", send_reservation);

// list all reservation ----->
router.get("/list", get_all_reservations);

// reservation Updated ----------->


export default router;