import { useState } from "react";
import moment from "moment-jalaali";
import React from "react";
const jMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const Calendar = (props) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDates, setSelectedDates] = useState(new Set());

  const generateCalendar = () => {
    const startOfMonth = currentDate.clone().startOf("jMonth");
    const endOfMonth = currentDate.clone().endOf("jMonth");

    const weeks = [];
    let currentWeek = [];
    let day = startOfMonth.clone();

    for (let i = -1; i < startOfMonth.day(); i++) {
      currentWeek.push(null);
    }

    while (day.isBefore(endOfMonth)) {
      currentWeek.push(day.clone());
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      day.add(1, "day");
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  // تغییر ماه
  const handleMonthChange = (offset) => {
    setCurrentDate(currentDate.clone().add(offset, "jMonth"));
  };

  // انتخاب/لغو انتخاب تاریخ
  const toggleDate = (date) => {
    const timestamp = date.valueOf();
    const newSelection = new Set(selectedDates);
    newSelection.has(timestamp)
      ? newSelection.delete(timestamp)
      : newSelection.add(timestamp);
    setSelectedDates(newSelection);
  };
  const handleConfirm = () => {
    const formatedDates = Array.from(selectedDates).map(timestamp => moment(timestamp).format('jYYYY/jMM/jDD'));
    props.onSelect(formatedDates);
    props.setPopup(false)
  }

  return (
    <div className="max-w-2xl mt-10 mx-auto p-4 font-sans bg-custom-white w-[257px] h-[346px] rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md  text-custom-blue">
          {jMonths[currentDate.jMonth()]} {currentDate.jYear()}
        </h2>
        <div className="space-x-6">
          <button
            onClick={() => handleMonthChange(-1)}
            className=" text-custom-blue text-sm cursor-pointer"
          >
            <img src="/icons/arrow-right.svg" alt="" />
          </button>
          <button
            onClick={() => handleMonthChange(1)}
            className="  text-custom-blue text-sm cursor-pointer"
          >
            <img src="/icons/arrow-left.svg" alt="" />
          </button>
        </div>
      </div>
      <img
        src="/icons/Rectangle 35.svg"
        alt="linear-gradient"
        className="mx-auto"
      />

      <div className="grid grid-cols-7 gap-1 ">
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
          <div key={day} className="p-3 text-center text-sm text-gray-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-[6px]">
        {generateCalendar().map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <button
              key={`${weekIndex}-${dayIndex}`}
              onClick={() => day && toggleDate(day)}
              disabled={!day}
              className={` 
                 w-[30px] h-[30px]
                 text-sm
                ${
                  day
                    ? `cursor-pointer ${
                        selectedDates.has(day.valueOf())
                          ? "bg-custom-blue text-custom-white rounded-full w-[30px] h-[30px]"
                          : day.jMonth() === currentDate.jMonth()
                          ? "bg-custom-white"
                          : "bg-gray-50 text-gray-400"
                      }`
                    : "bg-transparent"
                }
              `}
            >
              {day ? day.format("jD") : ""}
            </button>
          ))
        )}
        <div className="fixed mr-40 mt-53">
          <button
            onClick={handleConfirm}
            className="  cursor-pointer bg-custom-white shadow-sm w-[64px] h-[25px] shadow-custom-blue text-custom-blue text-xs rounded-md "
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
