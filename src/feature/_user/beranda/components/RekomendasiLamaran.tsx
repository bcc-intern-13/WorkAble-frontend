import React from "react"
import JobCard from "@/shared/components/JobCard"
import { jobCardData } from "../data/jobCardData"
import { Plus } from "lucide-react"

const RekomendasiLamaran = () => {
  return (
    <div className="bg-white w-full p-4 border border-[#D9D9D9] rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="title-bold">
            Rekomendasi Untukmu
          </h2>

          <button className="text-secondary text-base font-medium flex items-center gap-2 hover:text-bl-08 cursor-pointer">
            Lihat Semua →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {jobCardData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="">
          <button className="w-full border-2 border-dashed border-blue-400 rounded-xl py-4 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 transition cursor-pointer">
            Lihat Lowongan Lainnya
            <Plus />
          </button>
        </div>
    </div>
  )
}

export default RekomendasiLamaran