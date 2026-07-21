import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CreditCard,
  FileText,
  Monitor,
  Package,
  Star,
  User,
  UserPlus,
  MessageSquare,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Priya Sharma placed a new rent booking",
    description: "Booking Id: RB-001257 for 'Bridal Lehenga'",
    timeLabel: "2 minutes ago · 11:20 AM",
    createdAt: "2025-05-13T11:20:00.000Z",
    icon: "User",
    iconColor: "bg-rose-100 text-rose-600",
    lineColor: "bg-rose-500",
    unread: true,
  },
  {
    id: 2,
    title: "AI Try-On completed successfully",
    description: "For Rahul Verma on 'Sherwani Premium'",
    timeLabel: "15 minutes ago · 11:00 AM",
    createdAt: "2025-05-13T11:00:00.000Z",
    icon: "Monitor",
    iconColor: "bg-violet-100 text-violet-600",
    lineColor: "bg-violet-500",
    unread: true,
  },
  {
    id: 3,
    title: "Payment received successfully",
    description: "Amount ₹99 received from Ankita Singh",
    timeLabel: "32 minutes ago · 10:50 AM",
    createdAt: "2025-05-13T10:50:00.000Z",
    icon: "CreditCard",
    iconColor: "bg-cyan-100 text-cyan-600",
    lineColor: "bg-cyan-500",
    unread: true,
  },
  {
    id: 4,
    title: "Product stock is running low",
    description: "'Bridal Lehenga Red' stock is below 9 pieces",
    timeLabel: "45 minutes ago · 10:37 AM",
    createdAt: "2025-05-13T10:37:00.000Z",
    icon: "Package",
    iconColor: "bg-orange-100 text-orange-600",
    lineColor: "bg-orange-500",
    unread: true,
  },
  {
    id: 5,
    title: "New user registered on the platform",
    description: "Name: Karan Mehta",
    timeLabel: "Yesterday, 08:15 PM",
    createdAt: "2025-05-12T20:15:00.000Z",
    icon: "UserPlus",
    iconColor: "bg-emerald-100 text-emerald-600",
    lineColor: "bg-emerald-500",
    unread: false,
  },
  {
    id: 6,
    title: "New review received",
    description: "5 star review for 'Bridal Lehenga' by Neha Patel",
    timeLabel: "Yesterday, 10:45 PM",
    createdAt: "2025-05-12T22:45:00.000Z",
    icon: "Star",
    iconColor: "bg-yellow-100 text-yellow-600",
    lineColor: "bg-yellow-500",
    unread: false,
  },
  {
    id: 7,
    title: "New support ticket received",
    description: "Ticket ID: TK-1258 from Ritesh Kumar",
    timeLabel: "12 May 2025, 05:30 PM",
    createdAt: "2025-05-12T17:30:00.000Z",
    icon: "MessageSquare",
    iconColor: "bg-fuchsia-100 text-fuchsia-600",
    lineColor: "bg-fuchsia-500",
    unread: false,
  },
  {
    id: 8,
    title: "Monthly report is ready",
    description: "April 2025 monthly sales report generated",
    timeLabel: "12 May 2025, 05:15 PM",
    createdAt: "2025-05-12T17:15:00.000Z",
    icon: "FileText",
    iconColor: "bg-slate-100 text-slate-600",
    lineColor: "bg-slate-400",
    unread: false,
  },
];

const formatDateGroup = (createdAt) => {
  const date = new Date(createdAt);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateForInput = (createdAt) => {
  const date = new Date(createdAt);
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
};

export default function NotificationsDropdown() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [sortBy, setSortBy] = useState("newest");
  const [filterDate, setFilterDate] = useState("");

  const notificationsRef = useRef(null);

  const sortedNotifications = [...notifications].sort((a, b) => {
    const first = new Date(a.createdAt).getTime();
    const second = new Date(b.createdAt).getTime();
    return sortBy === "oldest" ? first - second : second - first;
  });

  const filteredNotifications = filterDate
    ? sortedNotifications.filter(
        (item) => formatDateForInput(item.createdAt) === filterDate
      )
    : sortedNotifications;

  const groupedNotifications = filteredNotifications.reduce((groups, item) => {
    const key = formatDateGroup(item.createdAt);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <div className="relative" ref={notificationsRef}>
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-lg hover:bg-slate-100 transition"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {showNotifications && (
      <div
  className="
    fixed
    top-20
    right-4
    left-4
    sm:left-auto
    sm:w-[430px]
    md:w-[500px]
    max-w-[520px]
    bg-white
    border
    border-slate-200
    rounded-3xl
    shadow-2xl
    z-[9999]
    overflow-hidden
  "
>

          <div className="px-4 sm:px-6 py-5 border-b bg-slate-50">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-lg font-semibold">
                  Notification
                </p>

                <p className="text-xs text-slate-500">
                  You have {notifications.length} recent updates
                </p>

              </div>

              <button
                onClick={() =>
                  setNotifications((current) =>
                    current.map((item) => ({
                      ...item,
                      unread: false,
                    }))
                  )
                }
                className="
                  w-full
                  sm:w-auto
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  hover:bg-slate-100
                "
              >
                Mark All as Read
              </button>

            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <label className="
                flex
                items-center
                justify-between
                gap-2
                w-full
                sm:w-auto
                rounded-full
                border
                border-slate-200
                bg-white
                px-4
                py-2
                text-xs
              ">

                <span>Date Added</span>

                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="bg-transparent outline-none"
                />

              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  w-full
                  sm:w-auto
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-xs
                "
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>

            </div>

          </div>

          <div className="max-h-[65vh] sm:max-h-[520px] overflow-y-auto bg-white">
                        {Object.entries(groupedNotifications).map(([groupName, items]) => (
              <div key={groupName}>
                <div className="px-4 sm:px-5 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-slate-200" />
                    <span>{groupName.toUpperCase()}</span>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
                </div>

                {items.map((notification) => {
                  const Icon = {
                    User,
                    Monitor,
                    CreditCard,
                    Package,
                    UserPlus,
                    Star,
                    MessageSquare,
                    FileText,
                  }[notification.icon];

                  return (
                    <div
                      key={notification.id}
                      className={`
                        flex
                        items-start
                        gap-3
                        sm:gap-4
                        px-4
                        sm:px-5
                        py-4
                        border-b
                        border-slate-100
                        transition
                        hover:bg-slate-50
                        ${
                          notification.unread
                            ? "bg-slate-50"
                            : "bg-white"
                        }
                      `}
                    >
                      {/* Left Color Bar */}
                      <div
                        className={`h-12 sm:h-14 w-1.5 shrink-0 rounded-full ${notification.lineColor}`}
                      />

                      {/* Icon */}
                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          sm:h-12
                          sm:w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          sm:rounded-3xl
                          ${notification.iconColor}
                        `}
                      >
                        <Icon size={18} />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 break-words leading-5">
                          {notification.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 break-words leading-5">
                          {notification.description}
                        </p>

                        <span className="mt-1 block text-[11px] text-slate-400">
                          {notification.timeLabel}
                        </span>

                        <span className="mt-1 block text-[11px] text-slate-400">
                          {new Date(notification.createdAt).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>

                      {/* Unread Dot */}
                      <span
                        className={`
                          mt-2
                          h-2.5
                          w-2.5
                          shrink-0
                          rounded-full
                          ${
                            notification.unread
                              ? "bg-rose-500"
                              : "bg-slate-300"
                          }
                        `}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-5 py-4 bg-slate-50 text-center">
            <button
              onClick={() => setShowNotifications(false)}
              className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}