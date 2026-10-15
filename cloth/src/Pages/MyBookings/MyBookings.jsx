import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Package,
  RefreshCw,
  ShoppingBag,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import bookingService from "../../services/bookingService";
import { useAuth } from "../../contexts/AuthContext";

import "./MyBookings.css";

const formatCurrency = (amount) => {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatStatus = (status) => {
  if (!status) return "Pending";

  return String(status)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const getStatusClass = (status) => {
  const normalizedStatus = String(status || "pending").toLowerCase();

  if (
    ["confirmed", "paid", "delivered", "returned", "completed"].includes(
      normalizedStatus
    )
  ) {
    return "my-bookings-status-success";
  }

  if (
    ["cancelled", "rejected", "failed"].includes(normalizedStatus)
  ) {
    return "my-bookings-status-danger";
  }

  if (
    ["dispatched", "rental_active", "return_requested"].includes(
      normalizedStatus
    )
  ) {
    return "my-bookings-status-info";
  }

  return "my-bookings-status-pending";
};

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await bookingService.getMyBookings();

      const bookingList = Array.isArray(response?.bookings)
        ? response.bookings
        : [];

      setBookings(bookingList);
    } catch (err) {
      console.error("Failed to fetch customer bookings:", err);

      setError(
        err?.response?.data?.message ||
          "We could not load your bookings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    fetchBookings();
  }, [user, fetchBookings]);

  const handleRetry = () => {
    fetchBookings();
  };

  return (
    <main className="my-bookings-page">
      <section className="my-bookings-hero">
        <div className="container">
          <nav
            className="my-bookings-breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">My Bookings</span>
          </nav>

          <div className="my-bookings-heading-row">
            <div className="my-bookings-heading-content">
              <span className="my-bookings-eyebrow">
                YOUR RAJANYA EXPERIENCE
              </span>

              <h1>My Bookings</h1>

              <p>
                Keep track of your luxury rental orders, delivery dates,
                and booking details in one place.
              </p>
            </div>

            <div className="my-bookings-count">
              <ShoppingBag size={20} aria-hidden="true" />

              <span>
                {bookings.length}{" "}
                {bookings.length === 1 ? "Booking" : "Bookings"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="my-bookings-content">
        <div className="container">
          {!user ? (
            <div className="my-bookings-state">
              <div className="my-bookings-state-icon">
                <ShoppingBag size={30} aria-hidden="true" />
              </div>

              <h2>Login to view your bookings</h2>

              <p>
                Sign in to your Rajanya account to see your rental orders.
              </p>

              <button
                type="button"
                className="my-bookings-primary-button"
                onClick={() => navigate("/")}
              >
                Return to Home
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          ) : loading ? (
            <div
              className="my-bookings-state"
              role="status"
              aria-live="polite"
            >
              <div className="my-bookings-loader" aria-hidden="true" />
              <h2>Loading your bookings</h2>
              <p>Please wait while we retrieve your rental orders.</p>
            </div>
          ) : error ? (
            <div className="my-bookings-state" role="alert">
              <div className="my-bookings-state-icon my-bookings-error-icon">
                <AlertCircle size={30} aria-hidden="true" />
              </div>

              <h2>Unable to load bookings</h2>
              <p>{error}</p>

              <button
                type="button"
                className="my-bookings-primary-button"
                onClick={handleRetry}
              >
                <RefreshCw size={17} aria-hidden="true" />
                Try Again
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="my-bookings-state">
              <div className="my-bookings-state-icon">
                <Package size={30} aria-hidden="true" />
              </div>

              <h2>No bookings yet</h2>

              <p>
                Your rental bookings will appear here after you successfully
                book a product.
              </p>

              <button
                type="button"
                className="my-bookings-primary-button"
                onClick={() => navigate("/all-products")}
              >
                Explore Collection
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="my-bookings-list">
              <div className="my-bookings-list-heading">
                <div className="my-bookings-list-heading-content">
                  <h2>Your Rental Orders</h2>

                  <p>
                    All rental bookings associated with your account.
                  </p>
                </div>

                <button
                  type="button"
                  className="my-bookings-refresh-button"
                  onClick={handleRetry}
                  aria-label="Refresh bookings"
                >
                  <RefreshCw size={16} aria-hidden="true" />
                  <span>Refresh</span>
                </button>
              </div>

              {bookings.map((booking) => {
                const product = booking.product || {};
                const rental = booking.rental || {};
                const pricing = booking.pricing || {};

                const productImage = product.productImage;
                const productName =
                  product.productName || "Luxury Rental Product";

                const rentalAmount = Number(pricing.rentalAmount || 0);
                const securityDeposit = Number(
                  pricing.securityDeposit || 0
                );

                const bookingTotal =
                  pricing.totalAmount != null &&
                  Number.isFinite(Number(pricing.totalAmount))
                    ? Number(pricing.totalAmount)
                    : rentalAmount + securityDeposit;

                return (
                  <article
                    className="my-booking-card"
                    key={booking._id || booking.bookingId}
                  >
                    <header className="my-booking-card-header">
                      <div className="my-booking-id">
                        <span className="my-booking-label">
                          BOOKING ID
                        </span>

                        <strong>
                          {booking.bookingId || booking._id}
                        </strong>
                      </div>

                      <div className="my-booking-status-group">
                        <span
                          className={`my-bookings-status ${getStatusClass(
                            booking.bookingStatus
                          )}`}
                        >
                          {formatStatus(booking.bookingStatus)}
                        </span>

                        <span
                          className={`my-bookings-status ${getStatusClass(
                            booking.paymentStatus
                          )}`}
                        >
                          Payment: {formatStatus(booking.paymentStatus)}
                        </span>
                      </div>
                    </header>

                    <div className="my-booking-card-body">
                      <div className="my-booking-product">
                        <div className="my-booking-product-image">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={productName}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <Package
                              size={30}
                              aria-label="Product image unavailable"
                            />
                          )}
                        </div>

                        <div className="my-booking-product-info">
                          <span className="my-booking-category">
                            {product.productCategory ||
                              "Luxury Collection"}
                          </span>

                          <h3>{productName}</h3>

                          {product.productBrand && (
                            <p>{product.productBrand}</p>
                          )}

                          <div className="my-booking-product-meta">
                            <span>
                              Size: {product.selectedSize || "N/A"}
                            </span>

                            <span>
                              Duration:{" "}
                              {product.rentalDuration
                                ? `${product.rentalDuration} days`
                                : "N/A"}
                            </span>
                          </div>

                          {product.productSlug && (
                            <Link
                              className="my-booking-view-product"
                              to={`/products/${product.productSlug}`}
                            >
                              View Product
                              <ArrowRight
                                size={14}
                                aria-hidden="true"
                              />
                            </Link>
                          )}
                        </div>
                      </div>

                      <div className="my-booking-rental-details">
                        <div className="my-booking-detail">
                          <CalendarDays
                            size={18}
                            aria-hidden="true"
                          />

                          <div>
                            <span>Rental Start</span>
                            <strong>
                              {formatDate(rental.startDate)}
                            </strong>
                          </div>
                        </div>

                        <div className="my-booking-detail">
                          <Clock3 size={18} aria-hidden="true" />

                          <div>
                            <span>Return Date</span>
                            <strong>
                              {formatDate(rental.returnDate)}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="my-booking-pricing">
                        <div>
                          <span>Rental Amount</span>
                          <strong>
                            {formatCurrency(rentalAmount)}
                          </strong>
                        </div>

                        <div>
                          <span>Security Deposit</span>
                          <strong>
                            {formatCurrency(securityDeposit)}
                          </strong>
                        </div>

                        <div className="my-booking-total">
                          <span>Total Amount</span>
                          <strong>
                            {formatCurrency(bookingTotal)}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <footer className="my-booking-card-footer">
                      <span>
                        Booked on {formatDate(booking.createdAt)}
                      </span>

                      <span className="my-booking-footer-note">
                        <Package size={15} aria-hidden="true" />
                        Rental order details
                      </span>
                    </footer>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyBookings;