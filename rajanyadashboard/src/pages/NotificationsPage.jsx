import { useMemo, useState } from "react";
import {
  Bell,
  User,
  Monitor,
  CreditCard,
  Package,
  UserPlus,
  Star,
  MessageSquare,
  FileText,
} from "lucide-react";
import { notificationsData } from "../data/notificationsData";

const iconMap = {
  User,
  Monitor,
  CreditCard,
  Package,
  UserPlus,
  Star,
  MessageSquare,
  FileText,
};

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
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function NotificationsPage() {
  const [sortBy, setSortBy] = useState("newest");
  const [filterDate, setFilterDate] = useState("");
  const [notifications, setNotifications] = useState(notificationsData);

  const sortedNotifications = useMemo(
    () =>
      [...notifications].sort((a, b) => {
        const first = new Date(a.createdAt).getTime();
        const second = new Date(b.createdAt).getTime();
        return sortBy === "oldest" ? first - second : second - first;
      }),
    [notifications, sortBy]
  );

  const filteredNotifications = useMemo(
    () =>
      filterDate
        ? sortedNotifications.filter(
            (notification) => formatDateForInput(notification.createdAt) === filterDate
          )
        : sortedNotifications,
    [filterDate, sortedNotifications]
  );

  const groupedNotifications = useMemo(
    () =>
      filteredNotifications.reduce((groups, notification) => {
        const groupName = formatDateGroup(notification.createdAt);
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(notification);
        return groups;
      }, {}),
    [filteredNotifications]
  );

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Notifications</h1>
            <p className="mt-1 text-sm text-slate-500">
              You have {notifications.length} notifications and {unreadCount} unread.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500">
              <span>Date Added</span>
              <input
                type="date"
                value={filterDate}
                onChange={(event) => setFilterDate(event.target.value)}
                className="bg-transparent text-xs text-slate-900 outline-none"
              />
            </label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-900 outline-none transition focus:border-violet-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {Object.entries(groupedNotifications).map(([groupName, items]) => (
        <div key={groupName} className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span>{groupName.toUpperCase()}</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {items.map((notification) => {
              const Icon = iconMap[notification.icon];
              return (
                <div
                  key={notification.id}
                  className={`flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50 ${
                    notification.unread ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <div className={`h-14 w-1.5 shrink-0 rounded-full ${notification.lineColor}`} />
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-3xl ${notification.iconColor}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{notification.description}</p>
                    <span className="mt-1 block text-[11px] text-slate-400">{notification.timeLabel}</span>
                    <span className="mt-1 block text-[11px] text-slate-400">
                      {new Date(notification.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${notification.unread ? "bg-rose-500" : "bg-slate-300"}`} />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredNotifications.length === 0 && (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          No notifications found for the selected date.
        </div>
      )}
    </div>
  );
}
