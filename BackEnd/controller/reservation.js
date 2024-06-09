import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";

// Function to save reservations
export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    return next(error);
  }
};


// Function to get all reservations
export const get_all_reservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Function to updated a reservation 
export const update_reservation = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, date, time, phone } = req.body;

  if( !firstName || !lastName || !email || !date || !time || !phone ) {
    return next(new ErrorHandler("Please Fill Full Reservation Form !", 400));
  }

  try {
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { firstName, lastName, email, date, time, phone },
      { new: true, runValidators: true }
    );

    if( !reservation) {
      return next( new ErrorHandler("Reservation not Found", 404))
    }
    res.status(200).json({
      success: true,
      message: "Reservation Updated Successsfully",
      reservation,
    });
  } catch (error) {
    if (error.name === 'ValidationError'){
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    return next(error);
  }

};

