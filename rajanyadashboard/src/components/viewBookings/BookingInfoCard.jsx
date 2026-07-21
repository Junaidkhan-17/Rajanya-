import { Bookmark, Clock, CalendarCheck } from "lucide-react";

const BookingInfoCards = ({ booking }) => {
  const cards = [
    {
      icon: Bookmark,
      iconBg: "bg-purple-100 text-purple-600",
      label: "Booking ID",
      value: booking.bookingId,
      subLabel: "Booking Date & Time",
      subValue: booking.bookingDateTime,
    },
    {
      icon: Clock,
      iconBg: "bg-blue-100 text-blue-600",
      label: "Rental Duration",
      value: booking.duration,
      subLabel: "Rent Start Date",
      subValue: booking.rentDate,
    },
    {
      icon: CalendarCheck,
      iconBg: "bg-green-100 text-green-600",
      label: "Return Date",
      value: booking.returnDate,
      subLabel: "Booking Type",
      subValue: booking.bookingType || "Free Book (Enquiry)",
    },
    {
      icon: Bookmark,
      iconBg: "bg-orange-100 text-orange-600",
      label: "Last Updated",
      value: booking.lastUpdated,
      subLabel: "Booked By",
      subValue: booking.bookedBy || "Website (Enquiry Form)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg}`}
            >
              <card.icon size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400">{card.label}</p>
              <p className="font-semibold text-slate-800">{card.value || "—"}</p>
            </div>
          </div>

          <p className="text-xs text-slate-400">{card.subLabel}</p>
          <p className="text-sm text-slate-600">{card.subValue || "—"}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingInfoCards;