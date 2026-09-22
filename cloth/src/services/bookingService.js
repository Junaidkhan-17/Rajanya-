import api from "./api";

class BookingService {
  /*
  ========================================
  Create Booking
  ========================================
  */

  async createBooking(bookingData) {
    const response = await api.post(
      "/bookings",
      bookingData
    );

    return response.data;
  }

  /*
  ========================================
  Get My Bookings
  ========================================
  */

  async getMyBookings() {
    const response = await api.get(
      "/bookings/my-bookings"
    );

    return response.data;
  }

  /*
  ========================================
  Get Booking By ID
  ========================================
  */

  async getBookingById(bookingId) {
    const response = await api.get(
      `/bookings/${bookingId}`
    );

    return response.data;
  }

  /*
  ========================================
  Get Product Booking Availability
  ========================================
  */

  async getBookingAvailability(productId) {
    const response = await api.get(
      `/bookings/availability/${productId}`
    );

    return response.data;
  }

  /*
  ========================================
  Update Booking
  ========================================
  */

  async updateBooking(
    bookingId,
    bookingData
  ) {
    const response = await api.put(
      `/bookings/${bookingId}`,
      bookingData
    );

    return response.data;
  }

  /*
  ========================================
  Update Booking Status
  ========================================
  */

  async updateBookingStatus(
    bookingId,
    status
  ) {
    const response = await api.put(
      `/bookings/${bookingId}`,
      {
        bookingStatus: status,
      }
    );

    return response.data;
  }

  /*
  ========================================
  Delete Booking
  ========================================
  */

  async deleteBooking(bookingId) {
    const response = await api.delete(
      `/bookings/${bookingId}`
    );

    return response.data;
  }
}

export default new BookingService();