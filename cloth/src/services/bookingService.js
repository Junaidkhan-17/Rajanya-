class BookingService {
  async createBooking(
    bookingData
  ) {
    /*
      POST /api/bookings
    */

    console.log(
      "CREATE BOOKING API",
      bookingData
    );

    return bookingData;
  }

  async getBookings() {
    /*
      GET /api/bookings
    */

    console.log(
      "GET BOOKINGS API"
    );

    return [];
  }

  async getBookingById(
    bookingId
  ) {
    /*
      GET /api/bookings/:id
    */

    console.log(
      "GET BOOKING",
      bookingId
    );

    return null;
  }

  async updateBookingStatus(
    bookingId,
    status
  ) {
    /*
      PATCH /api/bookings/:id
    */

    console.log(
      "UPDATE BOOKING STATUS",
      bookingId,
      status
    );

    return true;
  }

  async deleteBooking(
    bookingId
  ) {
    /*
      DELETE /api/bookings/:id
    */

    console.log(
      "DELETE BOOKING",
      bookingId
    );

    return true;
  }
}

export default new BookingService();