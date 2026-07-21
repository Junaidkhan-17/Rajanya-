class BookingAvailabilityService {

  getAllBookings() {

    return JSON.parse(
      localStorage.getItem(
        "rajanya_bookings"
      )
    ) || [];
  }

  getProductBookings(
    productId
  ) {

    const bookings =
      this.getAllBookings();

    return bookings.filter(
      (booking) =>
        booking.product
          ?.productId ===
        productId
    );
  }

  getUnavailableDateRanges(
    productId
  ) {

    const bookings =
      this.getProductBookings(
        productId
      );

    return bookings.map(
      (booking) => ({
        startDate:
          booking.bookingDetails
            ?.startDate,

        returnDate:
          booking.bookingDetails
            ?.returnDate,
      })
    );
  }
}

export default new BookingAvailabilityService();