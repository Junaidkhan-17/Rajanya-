import { useState, useRef, useEffect } from "react";
import { Search, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

const statusOptions = ["All Status", "Completed", "Pending", "Cancelled"];
const methodOptions = ["All Methods", "UPI", "Card", "Cash"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const formatDate = (date) =>
  date
    ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";

const formatRange = (from, to) => {
  if (from && to) return `${formatDate(from)} - ${formatDate(to)}`;
  if (from) return formatDate(from);
  return "";
};

const isSameDay = (a, b) =>
  a && b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isBetween = (date, from, to) => {
  if (!date || !from || !to) return false;
  const t = date.getTime();
  return t > Math.min(from.getTime(), to.getTime()) && t < Math.max(from.getTime(), to.getTime());
};

const parseOneDate = (text) => {
  if (!text) return null;
  const trimmed = text.trim();

  let m = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    const [, d, mo, y] = m;
    const date = new Date(Number(y), Number(mo) - 1, Number(d));
    if (!isNaN(date.getTime())) return date;
  }

  m = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const [, y, mo, d] = m;
    const date = new Date(Number(y), Number(mo) - 1, Number(d));
    if (!isNaN(date.getTime())) return date;
  }

  const fallback = new Date(trimmed);
  if (!isNaN(fallback.getTime())) return fallback;

  return null;
};


const parseTypedRange = (text) => {
  if (!text || !text.trim()) return { from: null, to: null };
  const parts = text.split(/\s*-\s*/);

  if (parts.length >= 2) {

    const rangeMatch = text.match(/^(.*\d{4})\s*-\s*(.*\d{4})$/);
    if (rangeMatch) {
      const from = parseOneDate(rangeMatch[1]);
      const to = parseOneDate(rangeMatch[2]);
      if (from || to) return { from, to };
    }
  }

  const single = parseOneDate(text);
  return { from: single, to: null };
};

const Calendar = ({ rangeFrom, rangeTo, onSelectDay, viewDate, setViewDate }) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const today = new Date();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={goPrevMonth} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-slate-700">
          {MONTH_NAMES[month]} {year}
        </span>
        <button type="button" onClick={goNextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-[11px] font-medium text-slate-400 text-center py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const isStart = isSameDay(date, rangeFrom);
          const isEnd = isSameDay(date, rangeTo);
          const inRange = isBetween(date, rangeFrom, rangeTo);
          const isToday = isSameDay(date, today);

          let cls = "text-slate-700 hover:bg-slate-100";
          if (isStart || isEnd) cls = "bg-black text-white font-semibold";
          else if (inRange) cls = "bg-slate-200 text-slate-800";

          return (
            <button
              type="button"
              key={date.toISOString()}
              onClick={() => onSelectDay(date)}
              className={`h-8 w-8 rounded-lg text-sm transition ${cls} ${
                !isStart && !isEnd && isToday ? "border border-slate-300" : ""
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const BookingFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  method,
  setMethod,
  dateRange,
  setDateRange,
  onApply,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [rangeFrom, setRangeFrom] = useState(null);
  const [rangeTo, setRangeTo] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        const { from, to } = parseTypedRange(dateRange);
        if (from) {
          setRangeFrom(from);
          setRangeTo(to);
          setViewDate(from);
        }
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dateRange]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setDateRange(value);
    const { from, to } = parseTypedRange(value);
    if (from) {
      setRangeFrom(from);
      setRangeTo(to);
      setViewDate(from);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const { from, to } = parseTypedRange(dateRange);
      if (from) {
        setDateRange(formatRange(from, to));
        setRangeFrom(from);
        setRangeTo(to);
      }
      setShowPicker(false);
    }
    if (e.key === "Escape") setShowPicker(false);
  };


  const handleSelectDay = (date) => {
    if (!rangeFrom || (rangeFrom && rangeTo)) {
      // start a new range
      setRangeFrom(date);
      setRangeTo(null);
      setDateRange(formatDate(date));
      return;
    }

    // second click completes the range
    let from = rangeFrom;
    let to = date;
    if (to.getTime() < from.getTime()) {
      [from, to] = [to, from];
    }
    setRangeFrom(from);
    setRangeTo(to);
    setDateRange(formatRange(from, to));
    setShowPicker(false);
  };

  const clearRange = () => {
    setRangeFrom(null);
    setRangeTo(null);
    setDateRange("");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Search Customer */}
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1.5 block">
            Search Customer
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name..."
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        {/* Payment Status */}
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1.5 block">
            Payment Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1.5 block">
            Payment Method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white"
          >
            {methodOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range - typeable + calendar */}
        <div className="relative" ref={pickerRef}>
          <label className="text-xs font-medium text-slate-500 mb-1.5 block">
            Date Range
          </label>
          <div className="relative">
            <input
              type="text"
              value={dateRange}
              onChange={handleTextChange}
              onFocus={() => setShowPicker(true)}
              onKeyDown={handleKeyDown}
              placeholder="01 Aug 2025 - 18 Aug 2025"
              className="w-full h-10 pl-3 pr-9 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button
              type="button"
              onClick={() => setShowPicker((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <CalendarIcon size={16} />
            </button>
          </div>

          {showPicker && (
            <div className="absolute z-20 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-4 right-0">
              <p className="text-[11px] text-slate-400 mb-2">
                {!rangeFrom
                  ? "Click a start date"
                  : !rangeTo
                  ? "Click an end date"
                  : "Range selected"}
              </p>
              <Calendar
                rangeFrom={rangeFrom}
                rangeTo={rangeTo}
                onSelectDay={handleSelectDay}
                viewDate={viewDate}
                setViewDate={setViewDate}
              />
              <div className="flex gap-2 pt-3 mt-1 border-t border-slate-100">
                <button
                  onClick={clearRange}
                  className="flex-1 h-9 rounded-lg border border-slate-300 text-slate-600 text-sm hover:bg-slate-50"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowPicker(false)}
                  className="flex-1 h-9 rounded-lg bg-black text-white text-sm hover:bg-slate-800"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Apply Button */}
        <div className="flex items-end">
          <button
            onClick={onApply}
            className="w-full h-10 rounded-lg bg-black text-white text-sm hover:bg-slate-800 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;