import express from "express";
import { send_reservation,get_all_reservations, update_reservation, delete_reservation }  from "../controller/reservation.js";
//import { isAuthenticatedAdmin } from "../middlewares/auth.js";


const router = express.Router();


// save reservation ------->
router.post("/send", send_reservation);

// list all reservation ----->
router.get("/list", get_all_reservations);

// Updated reservation ----------->
router.put("/update/:id", update_reservation);

// delete reservation ----------->
router.delete("/delete/:id" , delete_reservation);

export default router;