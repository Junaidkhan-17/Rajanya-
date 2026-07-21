import {
  CalendarDays,
  Clock3,
  CalendarClock,
  Bookmark,
} from "lucide-react";

const BookingStats = ({ booking }) => {
  if (!booking) return null;

  const cards = [
    {
      icon: CalendarDays,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      title: "Booking ID",
      value: booking.bookingId || "-",
      subtitle: "Booking Date & Time",
      subValue: booking.bookingDate || "-",
    },
    {
      icon: Clock3,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Rental Duration",
      value: booking.rentalDuration || "-",
      subtitle: "Rent Start Date",
      subValue: booking.rentStartDate || "-",
    },
    {
      icon: CalendarClock,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Return Date",
      value: booking.returnDate || "-",
      subtitle: "Booking Type",
      subValue: booking.bookingType || "-",
    },
    {
      icon: Bookmark,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      title: "Last Updated",
      value: booking.updatedAt || "-",
      subtitle: "Booked By",
      subValue: booking.bookedBy || "-",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center`}
              >
                <Icon className={card.iconColor} size={22} />
              </div>

              <div className="flex-1">
                <p className="text-xs text-slate-400 font-medium">
                  {card.title}
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-800">
                  {card.value}
                </h3>

                <div className="mt-4">
                  <p className="text-xs text-slate-400">
                    {card.subtitle}
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {card.subValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingStats;