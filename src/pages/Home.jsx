import { useEffect, useState } from "react";
import Select from "../components/Select";
import SelectWindow from "../components/SelectWindow";
import { useNavigate } from "react-router-dom";
import React from "react";
import Calendar from "../components/Calender";
import axios from "axios";
import Loading from "../components/Loading";

function Home({ fadeIn }) {
  const icons = {
    uni: "/icons/hugeicons_university.svg",
    major: "/icons/ph_graduation-cap-light.svg",
    course: "/icons/emojione-monotone_orange-book.svg",
    professor: "/icons/hugeicons_teacher.svg",
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    uni: [],
    major: [],
    course: [],
    professor: [],
    date: []
  });
  const [data, setData] = useState({
    uni: [],
    major: [],
    course: [],
    professor: [],
  });
  const [filteredData, setFilteredData] = useState([]);
  const names = {
    uni: "نام دانشگاه",
    major: "نام رشته",
    course: "نام درس",
    professor: "نام استاد",
  };

  const updateUrlAndFetch = async (newSelected) => {
    const queryParams = new URLSearchParams();
    queryParams.set('university', newSelected.uni.join(','));
    queryParams.set('courseName', newSelected.course.join(','));
    queryParams.set('courseProf', newSelected.professor.join(','));
    queryParams.set('major', newSelected.major.join(','));
    queryParams.set('date', newSelected.date.join(','));

    try {
      setIsLoading(true);
      const response = await axios.get(`/api/home?${queryParams.toString()}`);
      const newData = response.data || [];
      setFilteredData(newData);

      // Update available options based on filtered data
      if (newSelected.uni.length > 0) {
        // If university is selected, filter courses and professors
        setData(prev => ({
          ...prev,
          course: [...new Set(newData.map(item => item.courseName))],
          professor: [...new Set(newData.map(item => item.courseProf))]
        }));
      }
      if (newSelected.uni.length > 0 && newSelected.course.length > 0) {
        // If both university and course are selected, filter professors
        setData(prev => ({
          ...prev,
          professor: [...new Set(newData.map(item => item.courseProf))]
        }));
      }
      if (newSelected.uni.length === 0) {
        // If no university selected, reset all filters
        setData(prev => ({
          ...prev,
          course: [...new Set(response.data?.map(item => item.courseName))],
          professor: [...new Set(response.data?.map(item => item.courseProf))]
        }));
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setFilteredData([]);
      setIsLoading(false);
    }
  };

  const handleSelect = (type, value) => {
    const newSelected = { ...selectedItems, [type]: value };
    
    // Clear dependent fields when parent field changes
    if (type === 'uni') {
      newSelected.course = [];
      newSelected.professor = [];
    } else if (type === 'course') {
      newSelected.professor = [];
    }
    
    setSelectedItems(newSelected);
    updateUrlAndFetch(newSelected);
  };

  const handleSearch = () => {
    navigate("/result", { state: { filteredData } });
  };

  useEffect(() => {
    axios
      .get("/api/home")
      .then((response) => {
        const fetchedData = response.data;
        setData({
          uni: [...new Set(fetchedData?.map((item) => item.university))],
          major: [...new Set(fetchedData?.map((item) => item.major))],
          course: [...new Set(fetchedData?.map((item) => item.courseName))],
          professor: [...new Set(fetchedData?.map((item) => item.courseProf))],
        });
      })
      .catch((err) => {
        console.error("Data not fetched", err);
      });
  }, []);

  const closePopup = (event) => {
    if (event.target === event.currentTarget) {
      setPopupType(null);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div
    className={`bg-bg-color w-full h-screen transition-opacity duration-400 ${
      fadeIn ? "opacity-100" : "opacity-0"
    }`}
    >
      <div className="absolute">
        <img
          src="/icons/Vector 12.svg"
          alt=""
          className="h-[115.18px] w-[132.75px] opacity-5 relative top-2"
        />
        <img
          src="/icons/Vector 9.svg"
          alt=""
          className="h-[115.18px] w-[132.75px] opacity-5 relative right-60 top-20 "
        />
        <img
          src="/icons/Vector 10.svg"
          alt=""
          className="h-[115.18px] w-[132.75px] opacity-5 relative top-100 right-15"
        />
        <img
          src="/icons/Vector 11.svg"
          alt=""
          className="h-[115.18px] w-[132.75px] opacity-5 relative top-115 right-70"
        />
      </div>

      <div>
        <div className="flex space-x-2 mr-6 pt-16">
          <img
            src="/icons/class-yar.svg"
            alt="class-yar icon"
            className="w-[42px] h-[38px]"
            />
          <h2 className="text-custom-blue text-2xl font-bold">کلاس یار</h2>
        </div>
        <p className="text-custom-blue text-lg font-bold w-[320px] mx-auto mt-10">
          فیلد های مورد نظر را برای فیلتر کردن انتخاب کنید:
        </p>
      </div>
      <img
        src="/icons/Rectangle 35.svg"
        alt="linear-gradient"
        className="mx-auto mt-10"
        />
      <div>
        {Object.keys(data).map((key) => (
          <Select
          key={key}
          icon={icons[key]}
          name={
            selectedItems[key].length > 0
              ? selectedItems[key].join(", ")  // show selected value(s)
              : names[key]                     // fallback to default label
          }
          onClick={() => setPopupType(key)}
        />
        ))}
        <Select
          icon="/icons/clarity_date-line.svg"
          name={
            selectedItems.date.length > 0
              ? selectedItems.date.join(", ")
              : "تاریخ"
          }
          onClick={() => setShowCalendar(!showCalendar)}
        />
        {showCalendar && (
          <div
            className="fixed inset-0 flex items-center justify-center"
            onClick={(e) => {
              // Check if the click is on the backdrop, not inside the calendar itself
              if (e.target === e.currentTarget) {
                setShowCalendar(false);
              }
            }}
          >
            {/* <Calendar setPopup={() => setShowCalendar(false)} /> */}
            <Calendar 
              setPopup = {() => setShowCalendar(false)}
              onSelect= {(dates) => setSelectedItems(prev => ({...prev, date:dates}))}
            />
          </div>
        )}
      </div>

      {popupType && (
        <div
          onClick={closePopup}
          className="fixed inset-0 flex justify-center items-center"
        >
          <div className="bg-custom-white rounded-lg shadow-lg w-[283px] h-[463px]">
            <SelectWindow
              name={data[popupType]}
              selectedValue={selectedItems[popupType]}
              onSelect={(value) => handleSelect(popupType, value)}
              setPopup={() => setPopupType(null)}
            />
          </div>
        </div>
      )}

      <img
        src="/icons/Rectangle 35.svg"
        alt="linear-gradient"
        className="mx-auto mt-10"
      />
      <div className="flex justify-center">
        <button
          className="bg-custom-white text-custom-blue w-[161px] h-[44px] mt-15 shadow-sm shadow-custom-blue border border-custom-blue rounded-md font-bold"
          onClick={handleSearch}
          aria-label="Search for results"
        >
          جستجو
        </button>
      </div>
    </div>
  );
}

export default Home;
