import "./BookForRentModal.css";

import { useEffect, useRef, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { XIcon } from "@animateicons/react/lucide";
import bookingService from "../../services/bookingService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bookingAvailabilityService
from "../../services/bookingAvailabilityService";
import { CalendarDays } from "lucide-react";

const CustomDateInput = forwardRef(
  ({ value, onClick, placeholder }, ref) => (
    <button
      type="button"
      className="custom-date-input"
      onClick={onClick}
      ref={ref}
    >
      <span>
        {value || "Select Date"}
      </span>

      <CalendarDays size={18} />
    </button>
  )
);

CustomDateInput.displayName =
  "CustomDateInput";

const BookForRentModal = ({ isOpen, onClose, bookingData, currentUser }) => {
  console.log("BOOK MODAL", {
    isOpen,
    bookingData,
    currentUser,
  });
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRentalOption, setSelectedRentalOption] = useState(null);
const [startDate, setStartDate] =
  useState(null);

const [returnDate, setReturnDate] =
  useState(null);

const [excludedDates, setExcludedDates] =
  useState([]);
  /* -------------------------------- */
  /* Prefill Data */
  /* -------------------------------- */

  useEffect(() => {
    if (!bookingData) return;

    setSelectedSize(bookingData.selectedSize || "");

    const matchedRental =
      bookingData.product?.rentalOptions?.find(
        (option) => option.days === bookingData.rentalDuration,
      ) || null;

    setSelectedRentalOption(matchedRental);

    setValue(
      "startDate",
      bookingData.startDate ? bookingData.startDate.slice(0, 10) : "",
    );

    setValue(
      "returnDate",
      bookingData.returnDate ? bookingData.returnDate.slice(0, 10) : "",
    );

    if (currentUser) {
      setValue("fullName", currentUser.name || "");
      setValue("email", currentUser.email || "");
    }
  }, [bookingData, currentUser, setValue]);

  useEffect(() => {

  if (!bookingData?.product?._id)
    return;

  const bookings =
    bookingAvailabilityService
      .getProductBookings(
        bookingData.product._id
      );

  const blockedDates = [];

  bookings.forEach(
    (booking) => {

      const start =
        new Date(
          booking.rental.startDate
        );

      const end =
        new Date(
          booking.rental.returnDate
        );

      const current =
        new Date(start);

      while (
        current <= end
      ) {

        blockedDates.push(
          new Date(current)
        );

        current.setDate(
          current.getDate() + 1
        );
      }
    }
  );

  setExcludedDates(
    blockedDates
  );

}, [bookingData]);

  /* -------------------------------- */
  /* ESC Close */
  /* -------------------------------- */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  /* -------------------------------- */
  /* Click Outside Close */
  /* -------------------------------- */

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  /* -------------------------------- */
  /* Submit Booking */
  /* -------------------------------- */

  const onSubmit = async (data) => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (!selectedRentalOption) {
      alert("Please select rental duration");
      return;
    }

    const booking = {
      bookingId: `RAJ-${Date.now()}`,

      createdAt: new Date().toISOString(),

      status: "pending",

      paymentStatus: "pending",

      user: {
        userId: currentUser?.id || null,
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        email: data.email,
      },

      address: {
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
      },

      rental: {
        startDate: data.startDate,
        returnDate: data.returnDate,
      },

      product: {
        productId: bookingData.productId || bookingData.product?._id,

        productName: bookingData.productName || bookingData.product?.name,

        productSlug: bookingData.product?.slug || "",

        productCategory: bookingData.product?.category || "",

        productBrand: bookingData.product?.brand || "",

        productImage: bookingData.product?.images?.[0] || "",

        productUrl: bookingData.product?.slug
          ? `${window.location.origin}/products/${bookingData.product.slug}`
          : "",

        selectedSize,

        rentalDuration: selectedRentalOption.days,

        rentalPrice: selectedRentalOption.price,

        securityDeposit: bookingData.securityDeposit || 0,
      },
    };

    const adminNumber = "918806431717";

    try {
      await bookingService.createBooking(booking);

      const existingBookings =
        JSON.parse(localStorage.getItem("rajanya_bookings")) || [];

      localStorage.setItem(
        "rajanya_bookings",
        JSON.stringify([...existingBookings, booking]),
      );

      console.log("BOOKING CREATED", booking);

      const message = `
*🌟 NEW RENTAL ENQUIRY 🌟*

━━━━━━━━━━━━━━━━━━
👤 CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━

Name: ${data.fullName}

Mobile: ${data.mobileNumber}

Email: ${data.email}

City: ${data.city}

State: ${data.state}

Pincode: ${data.pinCode}

━━━━━━━━━━━━━━━━━━
👗 PRODUCT DETAILS
━━━━━━━━━━━━━━━━━━

Product Name:
${booking.product.productName}

Product ID:
${booking.product.productId}

Category:
${booking.product.productCategory}

Brand:
${booking.product.productBrand}

Size:
${booking.product.selectedSize}

Rental Duration:
${booking.product.rentalDuration} Days

Rental Price:
₹${booking.product.rentalPrice}

Security Deposit:
₹${booking.product.securityDeposit}

━━━━━━━━━━━━━━━━━━
📅 BOOKING DETAILS
━━━━━━━━━━━━━━━━━━

Rent Date:
${data.startDate}

Return Date:
${data.returnDate}

━━━━━━━━━━━━━━━━━━
🖼 PRODUCT IMAGE
━━━━━━━━━━━━━━━━━━

${booking.product.productImage}

━━━━━━━━━━━━━━━━━━
🔗 PRODUCT LINK
━━━━━━━━━━━━━━━━━━

${booking.product.productUrl}
`;

      const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("BOOKING ERROR", error);

      alert("Failed to create booking.");

      return;
    }
    /*
      Future Payment Integration

      Step 1:
      Create Booking API

      Step 2:
      Open Razorpay

      Step 3:
      Update paymentStatus
    */

    alert("Booking submitted successfully.");

    onClose();
  };

  if (!isOpen || !bookingData) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="book-rent-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="book-rent-modal"
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 40,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          {/* Header */}

          <div className="book-rent-header">
            <div className="book-rent-header-content">
    <h2>Book For Rent</h2>
    <p>
      Complete the form below to reserve your outfit
    </p>
  </div>
            <button onClick={onClose} className="book-rent-close">
              <XIcon size={34} duration={1} color="#000000ff" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="book-rent-content">
            {/* LEFT */}

            <div className="book-rent-form-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Full name required",
                    })}
                    placeholder="Enter Full Name "
                  />

                  {errors.fullName && (
                    <span className="error">{errors.fullName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>

                  <input
                    type="tel"
                    {...register("mobileNumber", {
                      required: "Mobile number required",
                    })}
                    placeholder="Enter Mobile Number"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Email Address</label>

                  <input
                    type="email"
                    {...register("email", {
                      required: "Email required",
                    })}
                    placeholder="Enter Email Address"
                  />
                </div>

                {/* Size */}

                <div className="form-group">
                  <label>City</label>

                  <input
                    type="text"
                    {...register("city", {
                      required: true,
                    })}
                    placeholder="Enter City"
                  />
                </div>

                <div className="form-group">
                  <label>State</label>

                  <input
                    type="text"
                    {...register("state", {
                      required: true,
                    })}
                    placeholder="Enter State"
                  />
                </div>

                <div className="form-group">
                  <label>Pin Code</label>

                  <input
                    type="text"
                    {...register("pinCode", {
                      required: true,
                    })}
                    placeholder="Enter Pincode"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Select Size</label>

                  <div className="size-options">
                    {bookingData.product?.sizes?.map((size) => (
                      <button
                        type="button"
                        key={size}
                        className={`size-btn ${
                          selectedSize === size ? "active" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rental */}

                <div className="form-group full-width">
                  <label>Rental Duration</label>

                  <select
                    value={selectedRentalOption?.days || ""}
                    onChange={(e) => {
                      const option = bookingData.product.rentalOptions.find(
                        (item) => item.days === Number(e.target.value),
                      );

                      setSelectedRentalOption(option);
                    }}
                  >
                    <option value="">Select Rental Duration</option>

                    {bookingData.product?.rentalOptions?.map((option) => (
                      <option key={option.days} value={option.days}>
                        {option.days} Days — ₹{option.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>ENTER DATE TO RENT</label>


  <DatePicker
  selected={startDate}
  onChange={(date) => {
    setStartDate(date);

    setValue(
      "startDate",
      date?.toISOString()?.split("T")[0]
    );
  }}
  minDate={new Date()}
  excludeDates={excludedDates}
  dateFormat="dd/MM/yyyy"
  customInput={<CustomDateInput />}
/>
                </div>

                <div className="form-group">
                  <label>ENTER DATE TO RETURN PRODUCT</label>

                  <DatePicker
  selected={returnDate}
  onChange={(date) => {

    setReturnDate(date);

    setValue(
      "returnDate",
      date
        ?.toISOString()
        ?.split("T")[0]
    );

  }}
  minDate={
    startDate ||
    new Date()
  }
  excludeDates={
    excludedDates
  }
  placeholderText="Select Return Date"
  dateFormat="dd/MM/yyyy"
  customInput={
    <CustomDateInput />
  }
/>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-card">
                <img
                  src={bookingData.product?.images?.[0]}
                  alt={bookingData.productName}
                  className="summary-product-image"
                />
                <h4>{bookingData.productName}</h4>

                <div className="summary-row">
                  <span>Size</span>

                  <span>{selectedSize || "-"}</span>
                </div>

                <div className="summary-row">
                  <span>Rental Days</span>

                  <span>{selectedRentalOption?.days} Days</span>
                </div>

                <div className="summary-row">
                  <span>Rental Price</span>

                  <span>₹{selectedRentalOption?.price}</span>
                </div>

                <div className="summary-row">
                  <span>Security Deposit</span>

                  <span>₹{bookingData.securityDeposit || 0}</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>

                  <span>
                    ₹
                    {(
                      (selectedRentalOption?.price || 0) +
                      (bookingData.securityDeposit || 0)
                    ).toLocaleString()}
                  </span>
                </div>

                <button type="submit" className="confirm-booking-btn">
                  ENQUIRE NOW ON WHATSAPP
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookForRentModal;
