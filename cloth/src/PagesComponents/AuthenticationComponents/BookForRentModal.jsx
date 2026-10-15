import "./BookForRentModal.css";

import { useEffect, useRef, useState, forwardRef } from "react";

import { createPortal } from "react-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useForm } from "react-hook-form";

import { XIcon } from "@animateicons/react/lucide";

import bookingService from "../../services/bookingService";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { CalendarDays } from "lucide-react";

/* =========================================================
   CUSTOM DATE INPUT
========================================================= */

const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <button
    type="button"
    className="custom-date-input"
    onClick={onClick}
    ref={ref}
    aria-label={placeholder || "Select date"}
  >
    <span>{value || "Select Date"}</span>

    <CalendarDays size={18} />
  </button>
));

CustomDateInput.displayName = "CustomDateInput";

/* =========================================================
   LOCAL DATE FORMATTER
========================================================= */

const formatLocalDate = (date) => {
  if (!date) return "";

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// =========================================================
// CHECK WHETHER A RENTAL RANGE CONTAINS BLOCKED DATES
// =========================================================

const hasBlockedDateInRange = (start, end, excludedDates) => {
  if (!start || !end) {
    return false;
  }

  const startTime = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  ).getTime();

  const endTime = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  ).getTime();

  return excludedDates.some((excludedDate) => {
    const blockedTime = new Date(
      excludedDate.getFullYear(),
      excludedDate.getMonth(),
      excludedDate.getDate(),
    ).getTime();

    return blockedTime >= startTime && blockedTime <= endTime;
  });
};

/* =========================================================
   BOOK FOR RENT MODAL
========================================================= */

const BookForRentModal = ({ isOpen, onClose, bookingData, currentUser }) => {
  console.log("BOOK MODAL", {
    isOpen,
    bookingData,
    currentUser,
  });

  /* =========================================================
     REFS
  ========================================================= */

  const modalRef = useRef(null);

  /* =========================================================
     FORM
  ========================================================= */

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  /* =========================================================
     STATE
  ========================================================= */

  const [selectedSize, setSelectedSize] = useState("");

  const [calculatedRentalDays, setCalculatedRentalDays] = useState(null);

  const [startDate, setStartDate] = useState(null);

  const [returnDate, setReturnDate] = useState(null);

  const [excludedDates, setExcludedDates] = useState([]);

  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");

  /* =========================================================
     PREFILL DATA
  ========================================================= */

  useEffect(() => {
    if (!bookingData) return;

    /* =====================================================
     SIZE
  ===================================================== */

    setSelectedSize(bookingData.selectedSize || "");

    /* =====================================================
     DATES
  ===================================================== */

    if (bookingData.startDate) {
      const parsedStartDate = new Date(bookingData.startDate);

      if (!Number.isNaN(parsedStartDate.getTime())) {
        setStartDate(parsedStartDate);

        setValue("startDate", formatLocalDate(parsedStartDate));
      }
    } else {
      setStartDate(null);

      setValue("startDate", "");
    }

    if (bookingData.returnDate) {
      const parsedReturnDate = new Date(bookingData.returnDate);

      if (!Number.isNaN(parsedReturnDate.getTime())) {
        setReturnDate(parsedReturnDate);

        setValue("returnDate", formatLocalDate(parsedReturnDate));
      }
    } else {
      setReturnDate(null);

      setValue("returnDate", "");
    }

    /* =====================================================
     USER
  ===================================================== */

    if (currentUser) {
      setValue("fullName", currentUser.name || "");

      setValue("email", currentUser.email || "");
    }
  }, [bookingData, currentUser, setValue]);

  /* =========================================================
   CALCULATE RENTAL DURATION FROM DATES
========================================================= */

  useEffect(() => {
    if (!startDate || !returnDate) {
      setCalculatedRentalDays(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(returnDate);

    const difference = end.getTime() - start.getTime();

    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    setCalculatedRentalDays(days > 0 ? days : null);
  }, [startDate, returnDate]);

  const matchedRentalOption = bookingData?.product?.rentalOptions?.find(
    (option) => option.days === calculatedRentalDays,
  );

  const calculatedRentalPrice = matchedRentalOption?.price ?? 0;

  /* =========================================================
     FETCH BOOKING AVAILABILITY
  ========================================================= */

  // =========================================================
  // FETCH BOOKING AVAILABILITY
  // Refresh whenever the modal opens or the product changes
  // =========================================================

  useEffect(() => {
    let isActive = true;

    const fetchAvailability = async () => {
      if (!isOpen) {
        return;
      }

      const productId = bookingData?.product?._id;

      if (!productId) {
        setExcludedDates([]);
        setAvailabilityError("Unable to identify this product.");
        setIsAvailabilityLoading(false);
        return;
      }

      setIsAvailabilityLoading(true);
      setAvailabilityError("");

      try {
        const response = await bookingService.getBookingAvailability(productId);

        if (!isActive) return;

        if (
          response?.success !== true ||
          !Array.isArray(response?.bookedDates)
        ) {
          throw new Error("Invalid booking availability response.");
        }

        const blockedDates = [];

        // Convert a date into a local calendar date.
        // ISO timestamps are reduced to YYYY-MM-DD first,
        // avoiding UTC/local-time shifts.
        const toLocalDate = (value) => {
          if (!value) return null;

          const dateString =
            typeof value === "string" ? value.slice(0, 10) : "";

          const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);

          if (match) {
            const [, year, month, day] = match;

            return new Date(Number(year), Number(month) - 1, Number(day));
          }

          const parsedDate = new Date(value);

          if (Number.isNaN(parsedDate.getTime())) {
            return null;
          }

          return new Date(
            parsedDate.getFullYear(),
            parsedDate.getMonth(),
            parsedDate.getDate(),
          );
        };

        response.bookedDates.forEach((booking) => {
          const start = toLocalDate(booking.startDate);
          const end = toLocalDate(booking.returnDate);

          if (!start || !end || start > end) {
            return;
          }

          const current = new Date(start);

          while (current <= end) {
            blockedDates.push(new Date(current));

            current.setDate(current.getDate() + 1);
          }
        });

        setExcludedDates(blockedDates);
      } catch (error) {
        console.error("Failed to fetch booking availability:", error);

        if (isActive) {
          setExcludedDates([]);
          setAvailabilityError(
            "Unable to check availability. Please close and reopen the booking form to try again.",
          );
        }
      } finally {
        if (isActive) {
          setIsAvailabilityLoading(false);
        }
      }
    };

    fetchAvailability();

    return () => {
      isActive = false;
    };
  }, [isOpen, bookingData?.product?._id]);

  /* =========================================================
     ESC CLOSE
  ========================================================= */

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* =========================================================
     CLICK OUTSIDE CLOSE
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  /* =========================================================
     SUBMIT BOOKING
  ========================================================= */

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    if (isAvailabilityLoading) {
      alert("Please wait while we check product availability.");
      return;
    }

    if (availabilityError) {
      alert(availabilityError);
      return;
    }

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    if (!startDate || !returnDate || !calculatedRentalDays) {
      alert("Please select valid rental dates.");
      return;
    }

    if (!matchedRentalOption) {
      alert(
        `Rental pricing for ${calculatedRentalDays} days is not configured for this product.`,
      );
      return;
    }

    const product = bookingData?.product || {};
    const productId = bookingData.productId || product._id;
    const productName = bookingData.productName || product.name || "";
    const securityDeposit = Number(bookingData.securityDeposit || 0);

    if (!productId) {
      alert("Unable to identify this product. Please try again.");
      return;
    }

    const booking = {
      user: {
        userId: currentUser?.id || currentUser?._id || null,
        fullName: data.fullName.trim(),
        mobileNumber: data.mobileNumber.trim(),
        email: data.email.trim(),
      },

      address: {
        streetAddress: data.streetAddress.trim(),
        city: data.city.trim(),
        state: data.state.trim(),
        pinCode: data.pinCode.trim(),
      },

      rental: {
        startDate: formatLocalDate(startDate),
        returnDate: formatLocalDate(returnDate),
      },

      product: {
        productId,
        productName,
        productSlug: product.slug || "",
        productCategory: product.category || "",
        productBrand: product.brand || "",
        productImage,
        productUrl: product.slug
          ? `${window.location.origin}/products/${product.slug}`
          : "",
        selectedSize,
        rentalDuration: calculatedRentalDays,
        rentalPrice: Number(calculatedRentalPrice),
        securityDeposit,
      },
    };

    const adminNumber = "9822430452";

    // Open a temporary tab during the user's click so browsers
    // are less likely to block WhatsApp after the API request.
    let whatsappWindow = null;

    try {
      whatsappWindow = window.open("about:blank", "_blank");

      const response = await bookingService.createBooking(booking);

      alert("Booking submitted successfully!");
      // Do not continue if the API explicitly reports failure.
      if (response?.success === false) {
        throw new Error(response.message || "The booking could not be saved.");
      }

      // Use the server response when available.
      const savedBooking =
        response?.booking || response?.data?.booking || response?.data || {};

      const bookingReference =
        savedBooking.bookingId || savedBooking._id || "Pending reference";

      const message = `
*🌟 NEW RENTAL ENQUIRY - RAJANYA 🌟*

━━━━━━━━━━━━━━━━━━
📋 BOOKING REFERENCE
━━━━━━━━━━━━━━━━━━

Booking ID: ${bookingReference}

━━━━━━━━━━━━━━━━━━
👤 CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━

Name: ${booking.user.fullName}
Mobile: ${booking.user.mobileNumber}
Email: ${booking.user.email}

Street Address: ${booking.address.streetAddress}
City: ${booking.address.city}
State: ${booking.address.state}
Pincode: ${booking.address.pinCode}

━━━━━━━━━━━━━━━━━━
👗 PRODUCT DETAILS
━━━━━━━━━━━━━━━━━━

Product Name: ${booking.product.productName}
Product ID: ${booking.product.productId}
Category: ${booking.product.productCategory}
Brand: ${booking.product.productBrand}
Size: ${booking.product.selectedSize}

Rental Duration: ${booking.product.rentalDuration} days
Rental Price: ₹${booking.product.rentalPrice.toLocaleString("en-IN")}
Security Deposit: ₹${booking.product.securityDeposit.toLocaleString("en-IN")}
Total Amount: ₹${(
        booking.product.rentalPrice + booking.product.securityDeposit
      ).toLocaleString("en-IN")}

━━━━━━━━━━━━━━━━━━
📅 RENTAL DATES
━━━━━━━━━━━━━━━━━━

Rent Date: ${booking.rental.startDate}
Return Date: ${booking.rental.returnDate}

━━━━━━━━━━━━━━━━━━
🔗 PRODUCT DETAILS
━━━━━━━━━━━━━━━━━━

Product Image: ${booking.product.productImage || "Not available"}
Product Link: ${booking.product.productUrl || "Not available"}

Please confirm the availability and booking details.
`;

      const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        // Fallback if the browser blocked the new tab.
        window.location.assign(whatsappUrl);
      }

      // Only runs after the booking API succeeds.
      onClose();
    } catch (error) {
      console.error("Booking creation failed:", error);

      // Close the temporary blank tab on failure.
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.close();
      }

      const statusCode = error?.response?.status;
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create booking. Please try again.";

      if (statusCode === 409) {
        const bookedFrom = error?.response?.data?.bookedFrom;
        const bookedTill = error?.response?.data?.bookedTill;

        let message =
          errorMessage ||
          "This product is already booked for the selected dates.";

        if (bookedFrom && bookedTill) {
          const formatDate = (value) =>
            new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

          message += `\nUnavailable period: ${formatDate(
            bookedFrom,
          )} to ${formatDate(bookedTill)}.`;
        }

        alert(message);
        return;
      }

      alert(errorMessage);
    }
  };

  /* =========================================================
     CLOSED STATE
  ========================================================= */

  if (!isOpen || !bookingData) {
    return null;
  }

  const product = bookingData?.product || {};

  const getProductImage = (productData) => {
    const imageCandidates = [
      productData?.mainImage,
      productData?.thumbnailImage,
      productData?.image,
      productData?.imageUrl,
      productData?.thumbnail,
      productData?.galleryImages?.[0],
      productData?.images?.[0],
    ];

    const image = imageCandidates.find(Boolean);

    if (!image) return "";

    if (typeof image === "string") {
      return image;
    }

    if (typeof image === "object") {
      return image.url || image.secure_url || image.src || image.path || "";
    }

    return "";
  };

  const productImage = getProductImage(product);

  /* =========================================================
     MODAL CONTENT
  ========================================================= */

  const modalContent = (
    <AnimatePresence>
      <motion.div
        className="book-rent-overlay"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        role="presentation"
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
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-rent-title"
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="book-rent-header">
            <div className="book-rent-header-content">
              <span className="book-rent-eyebrow">RAJANYA RENTAL</span>

              <h2 id="book-rent-title">Book For Rent</h2>

              <p>Complete the form below to reserve your outfit</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="book-rent-close"
              aria-label="Close booking modal"
            >
              <XIcon size={30} duration={1} color="#000000" />
            </button>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit(onSubmit)} className="book-rent-content">
            {/* =================================================
                LEFT / FORM SECTION
            ================================================= */}

            <div className="book-rent-form-section">
              <div className="form-grid">
                {/* FULL NAME */}

                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>

                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName", {
                      required: "Full name required",
                    })}
                    placeholder="Enter Full Name"
                  />

                  {errors.fullName && (
                    <span className="error">{errors.fullName.message}</span>
                  )}
                </div>

                {/* MOBILE */}

                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number</label>

                  <input
                    id="mobileNumber"
                    type="tel"
                    {...register("mobileNumber", {
                      required: "Mobile number required",
                    })}
                    placeholder="Enter Mobile Number"
                  />

                  {errors.mobileNumber && (
                    <span className="error">{errors.mobileNumber.message}</span>
                  )}
                </div>

                {/* EMAIL */}

                <div className="form-group full-width">
                  <label htmlFor="email">Email Address</label>

                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email required",
                    })}
                    placeholder="Enter Email Address"
                  />

                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </div>

                {/* STREET ADDRESS */}
                <div className="form-group full-width">
                  <label htmlFor="streetAddress">Street Address</label>

                  <input
                    id="streetAddress"
                    type="text"
                    autoComplete="street-address"
                    {...register("streetAddress", {
                      required: "Street address is required",
                      validate: (value) =>
                        value.trim().length > 0 || "Street address is required",
                    })}
                    placeholder="Enter Street Address"
                  />

                  {errors.streetAddress && (
                    <span className="error">
                      {errors.streetAddress.message}
                    </span>
                  )}
                </div>

                {/* CITY */}

                <div className="form-group">
                  <label htmlFor="city">City</label>

                  <input
                    id="city"
                    type="text"
                    {...register("city", {
                      required: true,
                    })}
                    placeholder="Enter City"
                  />
                </div>

                {/* STATE */}

                <div className="form-group">
                  <label htmlFor="state">State</label>

                  <input
                    id="state"
                    type="text"
                    {...register("state", {
                      required: true,
                    })}
                    placeholder="Enter State"
                  />
                </div>

                {/* PIN CODE */}

                <div className="form-group">
                  <label htmlFor="pinCode">Pin Code</label>

                  <input
                    id="pinCode"
                    type="text"
                    inputMode="numeric"
                    {...register("pinCode", {
                      required: true,
                    })}
                    placeholder="Enter Pincode"
                  />
                </div>

                {/* SIZE */}

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

                {/* RENTAL DURATION */}

                <div className="form-group full-width">
                  <label htmlFor="rentalDuration">Rental Duration</label>

                  <input
                    id="rentalDuration"
                    type="text"
                    value={
                      calculatedRentalDays
                        ? `${calculatedRentalDays} Days`
                        : "Select Rental Dates"
                    }
                    readOnly
                  />
                </div>

                {/* RENT DATE */}

                <div className="form-group">
                  <label>ENTER DATE TO RENT</label>

                  <div className="date-picker-wrapper">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        if (
                          date &&
                          excludedDates.some(
                            (excludedDate) =>
                              formatLocalDate(excludedDate) ===
                              formatLocalDate(date),
                          )
                        ) {
                          alert(
                            "This date is already booked. Please select another date.",
                          );
                          return;
                        }

                        setStartDate(date);
                        setValue("startDate", formatLocalDate(date));

                        if (returnDate && date && returnDate < date) {
                          setReturnDate(null);
                          setValue("returnDate", "");
                        }

                        if (
                          date &&
                          returnDate &&
                          hasBlockedDateInRange(date, returnDate, excludedDates)
                        ) {
                          setReturnDate(null);
                          setValue("returnDate", "");
                          alert(
                            "Your selected rental period includes unavailable dates. Please select a new return date.",
                          );
                        }
                      }}
                      minDate={new Date()}
                      excludeDates={excludedDates}
                      dateFormat="dd/MM/yyyy"
                      customInput={<CustomDateInput />}
                      popperPlacement="bottom-start"
                    />
                  </div>

                  {errors.startDate && (
                    <span className="error">Please select rental date</span>
                  )}
                </div>

                {/* RETURN DATE */}

                <div className="form-group">
                  <label>ENTER DATE TO RETURN PRODUCT</label>

                  <div className="date-picker-wrapper">
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => {
                        if (!date) {
                          setReturnDate(null);
                          setValue("returnDate", "");
                          return;
                        }

                        if (
                          hasBlockedDateInRange(startDate, date, excludedDates)
                        ) {
                          alert(
                            "Your selected rental period includes unavailable dates. Please choose another return date.",
                          );
                          return;
                        }

                        setReturnDate(date);
                        setValue("returnDate", formatLocalDate(date));
                      }}
                      minDate={startDate || new Date()}
                      excludeDates={excludedDates}
                      placeholderText="Select Return Date"
                      dateFormat="dd/MM/yyyy"
                      customInput={<CustomDateInput />}
                      popperPlacement="bottom-start"
                    />
                  </div>

                  {errors.returnDate && (
                    <span className="error">Please select return date</span>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <div className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-card">
                <div className="summary-product-image-wrapper">
                  <img
                    src={productImage}
                    alt={
                      bookingData.productName ||
                      bookingData.product?.name ||
                      "Selected rental product"
                    }
                    className="summary-product-image"
                  />
                </div>

                <h4>{bookingData.productName}</h4>

                <div className="summary-row">
                  <span>Size</span>

                  <span>{selectedSize || "-"}</span>
                </div>

                <div className="summary-row">
                  <span>Rental Days</span>

                  <span>
                    {calculatedRentalDays
                      ? `${calculatedRentalDays} Days`
                      : "-"}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Rental Price</span>
                  <span>₹{calculatedRentalPrice.toLocaleString("en-IN")}</span>
                </div>

                <div className="summary-row">
                  <span>Security Deposit</span>

                  <span>
                    ₹{(bookingData.securityDeposit || 0).toLocaleString()}
                  </span>
                </div>

                <div className="summary-total">
                  <span>Total</span>

                  <span>
                    ₹
                    {(
                      Number(calculatedRentalPrice || 0) +
                      Number(bookingData.securityDeposit || 0)
                    ).toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="submit"
                  className="confirm-booking-btn"
                  disabled={isSubmitting || isAvailabilityLoading}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting
                    ? "SAVING YOUR BOOKING..."
                    : "ENQUIRE NOW ON WHATSAPP"}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  /* =========================================================
     PORTAL
  ========================================================= */

  return createPortal(modalContent, document.body);
};

export default BookForRentModal;
