import React from "react";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";
import { FaPeopleLine } from "react-icons/fa6";

function Contributors() {
  return (
    <div className="min-h-screen bg-[#0d1321] overflow-hidden">
      <div className="outer-container mt-5 mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl flex gap-2 sm:text-4xl text-center font-bold text-violet-400">
          Project Statistics{" "}
          <IoStatsChartOutline className="text-white/40 text-4xl" />
        </h1>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-5 mt-5 sm:mt-10">
          <div className="contributors flex justify-center items-center p-2 rounded-xl bg-[#1b2743] gap-2">
            <IoPeople className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">100</span>
              <span className="text-sm sm:text-xl text-slate-400">
                Contributors
              </span>
            </div>
          </div>
          <div className="contributions flex justify-center items-center p-2 rounded-xl bg-[#1b2743] gap-2">
            <FaArrowsRotate className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">100</span>
              <span className="text-sm sm:text-xl text-slate-400">
                Contributions
              </span>
            </div>
          </div>
          <div className="stars flex justify-center items-center p-2 rounded-xl bg-[#1b2743] gap-2">
            <FaStar className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">200</span>
              <span className="text-sm sm:text-xl text-slate-400">
                Github Stars
              </span>
            </div>
          </div>
          <div className="forks flex justify-center items-center p-2 rounded-xl bg-[#1b2743] gap-2">
            <GoRepoForked className="text-6xl sm:text-8xl" />
            <div className="flex flex-col gap-2">
              <span className="text-xl sm:text-2xl text-slate-300">2</span>
              <span className="text-sm sm:text-xl text-slate-400">Forks</span>
            </div>
          </div>
        </div>

        <div className="All-Contributors mt-16 w-full flex flex-col justify-center items-center mb-10">
          <h1 className="text-3xl flex gap-0 sm:gap-2 sm:text-5xl font-bold text-violet-500 items-center">
            Meet our Contributors{" "}
            <FaPeopleLine className="hidden text-white/40 text-6xl sm:block" />
          </h1>

          <div className="cards grid grid-cols-1 sm:grid-cols-2 sm:ml-0 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5 lg:ml-14">
            <div className="card bg-white/5 flex flex-col justify-center items-center rounded-xl gap-10 w-80 h-72">
              <img
                src=""
                alt="avatar"
                className="w-36 h-36 rounded-full object-cover border-2 border-emerald-400 shadow-md hover:border-emerald-300 transition-colors duration-300"
              />
              <div className="flex flex-col gap-2">
                <div className="info flex flex-col gap-1">
                  <span>john doe</span>
                  <span>Role: djkd</span>
                </div>
                <div className="stats flex justify-center items-center gap-4">
                  <span>100 Contributions</span>
                  <button className="bg-violet-700 py-1 px-1 rounded-sm">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contributors;
