"use client"
import Link from "next/link"
import { lamaranData } from "../data/lamaranData"
import { statusStyle } from "../data/lamaranData"


export default function LamaranBeranda() {
  return (
    <div className="bg-[#F4F6F8] border border-[#D9D9D9] rounded-2xl p-4 w-full space-y-2">
      
      <div className="flex justify-between items-center">
        <h3 className="title-bold ">
          Lamaran Saya
        </h3>

        <Link 
          href="/lamaran"
          className="text-secondary text-sm flex items-center gap-2 hover:text-bl-08"
        >
          Semua →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 items-center gap-1 ">
        <div className="bg-bl-01 px-2 py-3 rounded-xl border-2 border-secondary text-bl-07 body-bold text-sm text-center">
          3 Diproses
        </div>
        <div className="bg-gr-03 px-2 py-3 rounded-xl border-2 border-gr-05 text-gr-05 body-bold text-sm text-center">
          1 Dipanggil
        </div>
        <div className="bg-red-02 px-2 py-3 rounded-xl border-2 border-red-04 text-red-04 body-bold text-sm text-center">
          2 Ditolak
        </div>
        
      </div>

      <div className="flex flex-col gap-2 ">
        {lamaranData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between hover:bg-gray-200 rounded-xl"
          >
            <div className="flex items-center gap-3 py-2 cursor-pointer">
              
              {/* Logo Perusahaan */}
              <div className="w-10 h-10 rounded-lg bg-green-200" />

              <div>
                <p className="font-semibold text-sm">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">
                  {item.company}
                </p>
              </div>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full ${statusStyle[item.status]}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}