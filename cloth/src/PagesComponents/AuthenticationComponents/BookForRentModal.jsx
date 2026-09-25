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
    formState: { errors },
  } = useForm();

  /* =========================================================
     STATE
  ========================================================= */

  const [selectedSize, setSelectedSize] = useState("");

  const [calculatedRentalDays, setCalculatedRentalDays] = useState(null);

  const [startDate, setStartDate] = useState(null);

  const [returnDate, setReturnDate] = useState(null);

  const [excludedDates, setExcludedDates] = useState([]);

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

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!bookingData?.product?._id) {
        setExcludedDates([]);

        return;
      }

      try {
        const response = await bookingService.getBookingAvailability(
          bookingData.product._id,
        );

        console.log("BOOKING AVAILABILITY RESPONSE:", response);

        const bookings = response?.bookedDates || [];

        const blockedDates = [];

        bookings.forEach((booking) => {
          const start = new Date(booking.startDate);

          const end = new Date(booking.returnDate);

          const current = new Date(start);

          while (current <= end) {
            blockedDates.push(new Date(current));

            current.setDate(current.getDate() + 1);
          }
        });

        setExcludedDates(blockedDates);
      } catch (error) {
        console.error("Failed to fetch booking availability:", error);

        setExcludedDates([]);
      }
    };

    fetchAvailability();
  }, [bookingData]);

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
    if (!selectedSize) {
      alert("Please select a size");

      return;
    }

    if (!calculatedRentalDays) {
      alert("Please select valid rental dates");
      return;
    }

    const booking = {
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

        productImage: productImage || "",

        productUrl: bookingData.product?.slug
          ? `${window.location.origin}/products/${bookingData.product.slug}`
          : "",

        selectedSize,

        rentalDuration: calculatedRentalDays,

        rentalPrice: calculatedRentalPrice,

        securityDeposit: bookingData.securityDeposit || 0,
      },
    };

    const adminNumber = "918806431717";

    if (!matchedRentalOption) {
      alert(
        `Rental pricing for ${calculatedRentalDays} days is not configured for this product.`,
      );
      return;
    }

    try {
      await bookingService.createBooking(booking);

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

      const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
        message,
      )}`;

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
                        setStartDate(date);

                        setValue("startDate", formatLocalDate(date));

                        if (returnDate && date && returnDate < date) {
                          setReturnDate(null);

                          setValue("returnDate", "");
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

  /* =========================================================
     PORTAL
  ========================================================= */

  return createPortal(modalContent, document.body);
};

export default BookForRentModal;
