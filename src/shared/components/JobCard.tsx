import React from "react"
import { JobCardType } from "@/feature/_user/beranda/data/jobCardData"

const JobCard = ({ job }: { job: JobCardType }) => {
  return (
    <div className="bg-bl-01 hover:bg-bl-02 rounded-2xl p-4 flex flex-col gap-4 justify-between h-full cursor-pointer">
      
      <div>
        <p className="caption-semibold text-[#757575]">
          {job.company}
        </p>

        <h3 className="title-bold text-[#252525] mt-1">
          {job.title}
        </h3>
      </div>

      <div>
        <div className="flex justify-between flex-wrap">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className={`
                px-4 py-1 rounded-full text-sm border
                ${
                  tag === "Remote"
                    ? "border-blue-500 text-blue-500"
                    : tag === "Tuli/Bisu"
                    ? "border-orange-400 text-orange-400"
                    : "border-gray-300 text-gray-500"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-blue-600 font-semibold">
          {job.salary}
        </p>

        <p className="text-gray-500 text-sm">
          {job.postedAt}
        </p>
      </div>
    </div>
  )
}

export default JobCard