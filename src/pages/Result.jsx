import React from "react";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";

function Result() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const location = useLocation();
  const { filteredData } = location.state || {};

  useEffect(() => {
    if (filteredData) {
      setCourses(filteredData);
    }
  }, [filteredData]);

  const filteredCourses = courses.filter((course) => {
    const term = searchTerm.toLowerCase();
    return (
      course.courseName?.toLowerCase().includes(term) ||
      course.courseProf?.toLowerCase().includes(term) ||
      course.major?.toLowerCase().includes(term) ||
      course.university?.toLowerCase().includes(term)
    );
  });
  return (
    <>
      <div className="bg-bg-color w-full h-screen relative ">
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
        </div>
        <div className="h-[50px] w-94 rounded-[31px] flex flex-row mt-[45px] mx-auto  justify-between bg-[#F3F3EE] shadow-slate-600 shadow-sm">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-5 border-none focus:outline-none 
          placeholder-custom-blue text-[16px] font-[500] placeholder:tracking-[0.4px] z-5"
          />
          <button className="pl-5 size-[50px] hover:cursor-pointer flex flex-row justify-center items-center">
            <img src="/icons\search-normal.svg" className="size-[20px]" />
          </button>
        </div>

        <div className="h-[655px] w-94  bg-[#F3F3EE] shadow-slate-600 shadow-md  mx-auto mt-[20px] rounded-md scale-z-200 overflow-auto">
          <table className="w-90 mx-auto ">
            <thead className="sticky top-0 bg-[#F3F3EE]">
              <tr className=" text-right flex flex-row items-center">
                <th className="py-3 px-4 text-[15px] font-[500] text-custom-blue basis-2/7">
                  نام درس
                </th>
                <th className="py-3 px-4 text-[15px] font-[500] text-custom-blue basis-2/7">
                  نام استاد
                </th>
                <th className="py-3 px-4 text-[15px] font-[500] text-custom-blue basis-2/7">
                  رشته
                </th>
                <th className="py-3 px-4 pt-4 basis-1/7">
                  <img src="/icons/dots.svg" />
                </th>
              </tr>
            </thead>
            <tbody className="*:even:bg-[#F3F3EE] *:odd:bg-bg-color **:truncate *:rounded-[4px]">
              {filteredCourses.map((course, index) => (
                <tr
                  key={index}
                  className="text-right flex flex-row items-center justify-center h-[60px]"
                >
                  <td className="py-3 px-4 text-[15px] font-[450] text-custom-blue basis-2/7">
                    {course.courseName}
                  </td>
                  <td className="py-3 px-4 text-[15px] font-[450] text-custom-blue basis-2/7">
                    {course.courseProf}
                  </td>
                  <td className="py-3 px-4 text-[15px] font-[450] text-custom-blue basis-2/7">
                    {course.major}
                  </td>
                  <td className="basis-1/7 py-2">
                    <button
                      className="shadow-slate-600 shadow-md mx-auto h-[20px] w-[37px] rounded-[5px] bg-custom-blue flex flex-row items-center justify-center border border-[#F3F2EE]"
                      onClick={() => {
                        setSelectedCourse(course); // set the clicked course
                        setShowModal(true); // show the modal
                      }}
                    >
                      <img src="/icons/wDots.svg" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <p className="text-center py-6 text-custom-blue">
                  هیچ نتیجه‌ای یافت نشد 😔
                </p>
              )}
            </tbody>
          </table>
        </div>
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 bg-black/50 h-dvh w-dvw z-50 ${
            showModal ? "" : "hidden"
          }`}
        >
          <div className="h-[504px] w-[353px] mt-52 mx-auto flex items-center justify-center rounded-[6px] bg-[#F3F3EE]">
            <div>
              <button onClick={() => setShowModal(false)} className="mt-3">
                <img src="/icons/close.svg" />
              </button>
              {showModal && (
                <div className="fixed inset-0  bg-black/50 z-50 flex items-center justify-center px-4">
                  <div className="bg-[#F3F3EE] h-[504px] w-[353px] max-w-md rounded-md overflow-y-auto max-h-[90vh] p-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="mb-2"
                    >
                      <img src="/icons/close.svg" alt="close" />
                    </button>
                    {selectedCourse && (
                      <div className="space-y-2">
                        {[
                          ["نام درس", selectedCourse.courseName],
                          ["نام استاد", selectedCourse.courseProf],
                          ["کد درس", selectedCourse.courseCode],
                          ["نام رشته", selectedCourse.major],
                          ["تاریخ", selectedCourse.date],
                          ["ساعت", selectedCourse.time],
                          ["وضعیت", selectedCourse.status],
                          ["دانشگاه", selectedCourse.university],
                        ].map(([label, value], i) => (
                          <div
                            key={i}
                            className={`flex justify-between items-center p-3 rounded ${
                              i % 2 === 0 ? "bg-[#EAE8E1]" : "bg-[#F3F3EE]"
                            }`}
                          >
                            <span className="text-sm font-bold text-custom-blue">
                              {label}
                            </span>
                            <span className="text-sm font-normal text-custom-blue">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Result;
