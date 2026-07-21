import { useState, useRef, useEffect } from "react";
import { Search, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const formatDate = (date) =>
  date
    ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";

const isSameDay = (a, b) =>
  a && b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// Tries to parse common typed formats: "16 Aug 2025", "16/08/2025", "2025-08-16"
const parseTypedDate = (text) => {
  if (!text || !text.trim()) return null;
  const trimmed = text.trim();

  // dd/mm/yyyy or dd-mm-yyyy
  let m = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    const [, d, mo, y] = m;
    const date = new Date(Number(y), Number(mo) - 1, Number(d));
    if (!isNaN(date.getTime())) return date;
  }

  // yyyy-mm-dd
  m = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const [, y, mo, d] = m;
    const date = new Date(Number(y), Number(mo) - 1, Number(d));
    if (!isNaN(date.getTime())) return date;
  }

  // fallback: let JS try to parse "16 Aug 2025" style strings
  const fallback = new Date(trimmed);
  if (!isNaN(fallback.getTime())) return fallback;

  return null;
};

const Calendar = ({ selectedDate, onSelect, viewDate, setViewDate }) => {
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
          const selected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);
          return (
            <button
              type="button"
              key={date.toISOString()}
              onClick={() => onSelect(date)}
              className={`h-8 w-8 rounded-lg text-sm transition
                ${selected ? "bg-black text-white font-semibold" : "text-slate-700 hover:bg-slate-100"}
                ${!selected && isToday ? "border border-slate-300" : ""}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PaymentFilters = ({
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        // on close, try to sync whatever was typed
        const parsed = parseTypedDate(dateRange);
        if (parsed) {
          setSelectedDate(parsed);
          setViewDate(parsed);
        }
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dateRange]);

  // typing directly into the field
  const handleTextChange = (e) => {
    const value = e.target.value;
    setDateRange(value);
    const parsed = parseTypedDate(value);
    if (parsed) {
      setSelectedDate(parsed);
      setViewDate(parsed);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const parsed = parseTypedDate(dateRange);
      if (parsed) {
        setDateRange(formatDate(parsed));
        setSelectedDate(parsed);
        setViewDate(parsed);
      }
      setShowPicker(false);
    }
    if (e.key === "Escape") {
      setShowPicker(false);
    }
  };

  // picking from calendar grid
  const handleSelect = (date) => {
    setSelectedDate(date);
    setDateRange(formatDate(date));
    setShowPicker(false);
  };

  const clearDate = () => {
    setSelectedDate(null);
    setDateRange("");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-end">

        {/* Search */}
        <div>
          <label className="text-xs font-semibold text-slate-500 mb-2 block">
            Search Customer
          </label>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name..."
              className="w-full h-11 rounded-xl border border-slate-300 pl-10 pr-4 outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        {/* Payment Status */}
        <div>
          <label className="text-xs font-semibold text-slate-500 mb-2 block">
            Payment Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-11 rounded-xl border border-slate-300 px-3 outline-none"
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="text-xs font-semibold text-slate-500 mb-2 block">
            Payment Method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full h-11 rounded-xl border border-slate-300 px-3 outline-none"
          >
            <option>All Methods</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Net Banking</option>
            <option>Wallet</option>
          </select>
        </div>

        {/* Date - typeable + calendar */}
        <div className="relative" ref={pickerRef}>
          <label className="text-xs font-semibold text-slate-500 mb-2 block">
            Date
          </label>
          <div className="relative">
            <input
              type="text"
              value={dateRange}
              onChange={handleTextChange}
              onFocus={() => setShowPicker(true)}
              onKeyDown={handleKeyDown}
              placeholder="dd/mm/yyyy"
              className="w-full h-11 rounded-xl border border-slate-300 pl-4 pr-10 outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button
              type="button"
              onClick={() => setShowPicker((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <CalendarDays size={18} />
            </button>
          </div>

          {showPicker && (
            <div className="absolute z-20 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-4">
              <Calendar
                selectedDate={selectedDate}
                onSelect={handleSelect}
                viewDate={viewDate}
                setViewDate={setViewDate}
              />
              <div className="flex gap-2 pt-3 mt-1 border-t border-slate-100">
                <button
                  onClick={clearDate}
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
            className="w-full h-11 rounded-xl bg-black text-white hover:bg-slate-800 transition"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentFilters;