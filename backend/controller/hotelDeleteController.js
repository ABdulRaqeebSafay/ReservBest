import reservationModel from '../Models/reservation.js';

class HotelDeleteController {
  static async deleteReservedHotel(req, res) {
    const { _id } = req.body;
    try {
     
      const deletedReservation = await reservationModel.findOneAndDelete({ _id });

      if (!deletedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      return res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (err) {
      console.error("Error in Deleting Reserved Hotel", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default HotelDeleteController;
