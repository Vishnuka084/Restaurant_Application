import express from "express";
import { send_reservation,get_all_reservations, update_reservation, delete_reservation }  from "../controller/reservation.js";
import { admin_login } from "../controller/admin.js";
import { isAuthenticatedAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Admin login ---->
router.post("/admin/login", admin_login);

// save reservation ------->
router.post("/send", send_reservation);

// list all reservation ----->
router.get("/list", get_all_reservations);

// Updated reservation ----------->
router.put("/update/:id", update_reservation);

// delete reservation ----------->
router.delete("/delete/:id" , delete_reservation);


// Protect routes that require admin authentication
router.use(isAuthenticatedAdmin);

// Save reservation (protected)
router.post("/send", isAuthenticatedAdmin, send_reservation);

// List all reservations (protected)
router.get("/list", isAuthenticatedAdmin, get_all_reservations);

// Update reservation (protected)
router.put("/update/:id", isAuthenticatedAdmin, update_reservation);

// Delete reservation (protected)
router.delete("/delete/:id", isAuthenticatedAdmin, delete_reservation);

export default router;